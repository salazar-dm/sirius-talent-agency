import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "./PaymentDetail.css";
import axios from 'axios';
import "../../../components/Button/Button.css";
import PaymentSummary from "./PaymentSummary.tsx";
import "../../../App.css";
import Modal from "../../../components/Modal/Modal.tsx";
import {DateObject} from 'react-multi-date-picker';
import "react-multi-date-picker/styles/colors/green.css"
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

interface PaymentBody {
    production: string;
    dates: string[];
    amount: number;
    rate: number;
}

interface PaymentIntentResponse {
    id: string;
    clientSecret: string;
    status: string;
    dates: string[];
}

const PaymentDetail: React.FC = () => {
    const [paymentBody, setPaymentBody] = useState<PaymentBody>({
        production: '',
        dates: [],
        amount: 0,
        rate: 10,
    });

    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalActionText, setModalActionText] = useState('');
    const [modalAction, setModalAction] = useState<(() => void) | null>(null);

    const stripe = useStripe();
    const elements = useElements();

    const validateForm = () => {
        const errors: string[] = [];

        if (!paymentBody.production) {
            errors.push('ProductionName');
        }

        console.log(paymentBody.dates.length === 0);
        if (paymentBody.dates.length === 0) {
            errors.push('Dates');
            console.log(errors);
        }

        if (paymentBody.amount <= 0) {
            errors.push('Amount');
        }

        if (paymentBody.rate <= 0) {
            errors.push('Rate');
        }

        setErrorMessages(errors);
        return errors.length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "amount") {
            setPaymentBody(prevState => ({
                ...prevState,
                amount: parseFloat(value),
            }));
        } else {
            setPaymentBody(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleDatesChange = (newDates: DateObject[]) => {
        const formattedDates = newDates.map(date => date.format("YYYY-MM-DD"));
        setPaymentBody({
            ...paymentBody,
            dates: formattedDates
        });
        console.log(paymentBody);
    };

    const handleFormSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsFormSubmitted(true);
    }

    const handleCreatePaymentIntent = async () => {

        setLoading(true);
        setPaymentStatus(null);
        setErrorMessages([]); // Reset error messages before new payment attempt

        try {
            const response = await axios.post<PaymentIntentResponse>(
                'https://sirius-talent-agency.onrender.com/api/performer/stripe/create-payment-intent',
                paymentBody,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            const { clientSecret } = response.data;
            handleConfirmPayment(clientSecret);  // Proceed to confirm payment
        } catch (error) {
            console.error('Error creating payment intent:', error);
            setPaymentStatus('Payment intent creation failed.');
            setErrorMessages(['An error occurred while creating the payment intent. Please try again.']);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmPayment = async (clientSecret: string) => {
        if (!stripe || !elements) {
            return;
        }

        let confirmParams: any = {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Customer',
                },
            },
        };

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, confirmParams);

        if (error) {
            setPaymentStatus(`Payment failed: ${error.message}`);
            setErrorMessages([error.message]);
            openModal('Payment Failed', 'Something went wrong. Please try again.');
        } else if (paymentIntent?.status === 'succeeded') {
            setPaymentStatus('SUCCESS');
            openModal('Successful payment', 'Your payment has been successfully processed. ' +
                'If you would like to receive the printable copy of invoice by email, please click the button below.');
        } else {
            setPaymentStatus('Payment pending');
        }

        setLoading(false);
    };

    const openModal = (title: string, message: string, actionText?: string, action?: () => void) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalActionText(actionText || '');
        setModalAction(action || null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!stripe || !elements) {
        return <div>Loading Stripe...</div>;
    }

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalTitle}
                message={modalMessage}
                onAction={modalAction}
                actionText={modalActionText}
            />
            {!isFormSubmitted ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="PaymentDetail__container">
                        <p className="PaymentDetail__field">
                            <label>Production Name</label>
                            <input
                                className={`${errorMessages.some(msg => msg.includes("ProductionName")) && "invalid"}`}
                                type="text"
                                name="production"
                                value={paymentBody.production}
                                onChange={handleInputChange}
                                required
                            />
                        </p>

                        <p className="PaymentDetail__field">
                            <label>Work Dates</label>
                            <DatePicker
                                multiple
                                sort
                                value = {paymentBody.dates.map(date => new DateObject(date))}
                                onChange={handleDatesChange}
                                className={`green ${errorMessages.some(msg => msg.includes("Dates")) && "invalid"}`}
                                plugins={[
                                    <DatePanel />
                                ]}
                            />
                        </p>

                        <p className="PaymentDetail__field half-width half-size-margin-right">
                            <label>Gross Pay</label>
                            <input
                                className={`${errorMessages.some(msg => msg.includes("Amount")) && "invalid"}`}
                                type="number"
                                name="amount"
                                value={paymentBody.amount}
                                onChange={handleInputChange}
                                min="0"
                                required
                            />
                        </p>

                        <p className="PaymentDetail__field half-width half-size-margin-left">
                            <label>Commission Rate</label>
                            <select
                                name="rate"
                                value={paymentBody.rate}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="10">Non-Union (10%)</option>
                                <option value="10">AABP (10%)</option>
                                <option value="15">ACTRA Apprentice (15%)</option>
                                <option value="10">ACTRA Full (10%)</option>
                                <option value="15">Actor / SSE / Upgrade (15%)</option>
                            </select>
                        </p>

                        <div>
                            <button className="PrimaryButton_button"
                                    onClick={handleFormSubmit}
                                    disabled={loading || !stripe || !elements}>
                                <span className="PrimaryButton_text">Submit</span>
                                <span className="PrimaryButton_icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g clipPath="url(#clip0_840_451)">
                                        <path d="M20 10L15 15L15 5L20 10Z" fill="currentColor"></path>
                                        <path d="M0 10L17 10" stroke="currentColor" strokeWidth="2"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_840_451">
                                            <rect width="20" height="20" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="PaymentDetail__container">
                    <PaymentSummary paymentBody={paymentBody}/>
                    <div className="PaymentDetail__card-element-wrapper">
                        <div className="PaymentDetail__title">Pay by card</div>
                        <CardElement
                            options={{
                                hidePostalCode: true,
                                style: {
                                    base: {
                                        color: '#00342b',
                                        fontFamily: 'PPNeueMontrealAOS, Arial, sans-serif',
                                        fontSize: '18px',
                                        fontWeight: '500',
                                        '::placeholder': {
                                            color: '#00342b',
                                        }
                                    },
                                },
                            }}
                        />
                    </div>
                    <div>
                        <button className="PrimaryButton_button"
                                onClick={handleCreatePaymentIntent}
                                disabled={loading || !stripe || !elements}>
                            <span className="PrimaryButton_text">Pay now</span>
                            <span className="PrimaryButton_icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <g clipPath="url(#clip0_840_451)">
                                        <path d="M20 10L15 15L15 5L20 10Z" fill="currentColor"></path>
                                        <path d="M0 10L17 10" stroke="currentColor" strokeWidth="2"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_840_451">
                                            <rect width="20" height="20" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            )}

        </>
    );
};

export default PaymentDetail;
