import React from 'react';
import "./PaymentSummary.css";

interface PaymentBody {
    production: string;
    dates: string[];
    amount: number;
    rate: number;
}

interface PaymentSummaryProps {
    paymentBody: PaymentBody;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ paymentBody }) => {
    // Ensure that amount is a valid number
    let amount = paymentBody.amount;

    // Check if amount is NaN or not a number
    if (isNaN(amount) || typeof amount !== 'number') {
        console.warn("Invalid amount value:", amount);
        amount = 0; // Default to 0 if it's invalid
    }

    // Calculate commission and HST
    const commission = amount * (paymentBody.rate / 100);
    const hst = commission * 0.13; // 13% HST
    const total = commission + hst;

    return (
        <>
            <div className="PaymentDetail__payment-summary-content-wrapper">
                <h2 className="PaymentDetail__title">Payment summary</h2>

                <div className="PaymentDetail__payment-summary-container">
                    <div className="PaymentDetail__payment-summary-item">
                        <div className="PaymentDetail__item-title">Production:</div>
                        <p className="PaymentDetail__item-body">{paymentBody.production}</p>
                    </div>
                    <div className="PaymentDetail__payment-summary-item">
                        <div className="PaymentDetail__item-title">Date:</div>
                        <p className="PaymentDetail__item-body">{paymentBody.date}</p>
                    </div>
                </div>

                <div className="PaymentDetail__payment-summary-container">
                    <div className="PaymentDetail__payment-summary-item">
                        <div className="PaymentDetail__item-title">Commission ({paymentBody.rate}%):</div>
                        <p className="PaymentDetail__item-body">${commission.toFixed(2)}</p>
                    </div>
                    <div className="PaymentDetail__payment-summary-item">
                        <div className="PaymentDetail__item-title">HST (13%):</div>
                        <p className="PaymentDetail__item-body">${hst.toFixed(2)}</p>
                    </div>
                    <div className="PaymentDetail__payment-summary-item highlight">
                        <div className="PaymentDetail__item-title">Total:</div>
                        <p className="PaymentDetail__item-body">${total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentSummary;