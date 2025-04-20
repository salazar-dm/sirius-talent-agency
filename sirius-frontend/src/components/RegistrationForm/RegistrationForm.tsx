import React, {ChangeEvent, useState} from "react";
import "./RegistrationForm.css";
import {useNavigate} from "react-router-dom";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {FormSelect} from "../Form/FormSelect.tsx";
import {CustomModal} from "../Modal/CustomModal.tsx";
import LicenseAgreement from "../../pages/LicenseAgreement.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";

//TODO: hide password and make it optionally visible

const RegistrationForm: React.FC = () => {
    const [tel, setTel] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [role, setRole] = useState<string>('Performer');

    const [isLicenseAgreementOpen, setIsLicenseAgreementOpen] = useState<boolean>(false);

    const formatPhoneNumber = (value: string): string => {
        let input = value.replace(/\D/g, '');

        switch (input.length) {
            case 0:
                return `${input}`;
            case 1:
                return `${input}`;
            case 2:
                return `${input[0]}-${input[1]}`;
            case 3:
                return `${input[0]}-${input.slice(1, 3)}`;
            case 4:
                return `${input.slice(0, 1)}-${input.slice(1, 4)}`;
            case 5:
                return `${input.slice(0, 1)}-${input.slice(1, 4)}-${input.slice(4, 5)}`;
            case 6:
                return `${input.slice(0, 1)}-${input.slice(1, 4)}-${input.slice(4, 6)}`;
            case 7:
                return `${input.slice(0, 1)}-${input.slice(1, 4)}-${input.slice(4, 7)}`;
            case 8:
                return `${input.slice(0, 1)}-${input.slice(1, 4)}-${input.slice(4, 7)}-${input.slice(7, 8)}`;
            case 9:
                return `${input.slice(0, 1)}-${input.slice(1, 4)}-${input.slice(4, 7)}-${input.slice(7, 9)}`;
            case 10:
                return `${input.slice(0, 1)}-${input.slice(1, 4)}-${input.slice(4, 7)}-${input.slice(7, 10)}`;
            default:
                return `${input.slice(0, 1)}-${input.slice(1, 4)}-${input.slice(4, 7)}-${input.slice(7, 11)}`;
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTel(formatPhoneNumber(value));
    };

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const registrationBody = {
            tel,
            email,
            password,
            role
        };

        try {
            const response = await fetch('https://sirius-talent-agency.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(registrationBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();

            if (text === '') {
                console.log('Received empty response body');
            } else {
                console.warn('Unexpected response body:', text);
            }

            setError(null);
            navigate('/verification', { replace: true });
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Error occurred during form submission');
        } finally {
            setLoading(false);
        }
    };

        return (
            <>
                {isLicenseAgreementOpen && (
                    <CustomModal
                        isOpen={isLicenseAgreementOpen}
                        onClose={() => setIsLicenseAgreementOpen(false)}>
                        <LicenseAgreement/>
                    </CustomModal>
                )}
                <div className="RegistrationForm__wrapper">
                    <div className="Grid_grid__container RegistrationForm__grid"
                         style={numberOfColumnsStyle(16)}>
                        <div className="Grid_grid__item RegistrationForm__item"
                             style={columnsStyle(1, 9, 1, 9, 1, 18, 1, 18)}>
                            <div className="RegistrationForm__container">
                                <div className="RegistrationForm__body">
                                    Already have an account? Sign in <a href="/login">here</a>.
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="RegistrationForm__input-tel">
                                        <input
                                            id="phone-number"
                                            type="tel"
                                            value={tel}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                            pattern="\d{1}-\d{3}-\d{3}-\d{4}"
                                            required
                                        />
                                    </div>
                                    <div className="RegistrationForm__input-email">
                                        <input
                                            id="email"
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div className="RegistrationForm__input-password">
                                        <input
                                            type="text"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            required
                                        />
                                    </div>

                                    <div className="RegistrationForm__input-role RegistrationForm__select-input">
                                        <FormSelect
                                            select={{
                                                id: 'role-select',
                                                required: true,
                                                defaultValue: role,
                                                options: [
                                                    { label: 'Performer', value: 'Performer' },
                                                ],
                                                onChange: (value) => setRole(value),
                                            }}
                                        />
                                    </div>
                                    <div className={"RegistrationForm__body"}>By submitting this form, I agree to the <a onClick={() => setIsLicenseAgreementOpen(true)}>terms of use</a>.</div>
                                    <button className="PrimaryButton_button" type="submit" disabled={loading}>
                                        <span className="PrimaryButton_text">Submit</span>
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
                                    {
                                        error && <p style={{color: 'red'}}>{error}</p>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </>
        );
}

export default RegistrationForm;