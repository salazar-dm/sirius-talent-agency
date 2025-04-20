import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "C:/Users/traxler/training/sirius/src/App.css";
import "C:/Users/traxler/training/sirius/src/components/Button/Button.css"
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import "./LoginForm.css"
import Modal from "../Modal/Modal.tsx";
import {CustomModal} from "../Modal/CustomModal.tsx";
import ErrorModal from "../Modal/ErrorModal.tsx";

const LoginForm: React.FC = () => {


    const [tel, setTel] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const loginBody = {
            tel,
            password
        };

        try {
            const response = await fetch('https://sirius-talent-agency.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(loginBody),
            });

            const result = await response.text();

            if (response.ok) {
                console.log('Login successful:', result);
                setError(null);
                try {
                    localStorage.setItem('token', result);
                } catch (error) {
                    console.error('Error saving token to localStorage:', error);
                }

                const redirectUrl = localStorage.getItem('redirectUrl');
                if (redirectUrl) {
                    localStorage.removeItem('redirectUrl');
                    navigate(redirectUrl, {replace: true});
                } else {
                    navigate('/performer', {replace: true});
                }
            } else {
                console.error('Login failed: ', result);
                setError(result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && <ErrorModal title="Error" message={error} onClose={() => setError(null)}/>}
            <div className="LoginForm__wrapper">
                <div className="Grid_grid__container LoginForm__grid"
                     style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item LoginForm__item"
                         style={columnsStyle(1, 9, 1, 9, 1, 18, 1, 18)}>
                        <div className="LoginForm__container">
                            <p className="LoginForm__sign-up">
                                Do not have an account yet? <a href="/registration">Sign up</a> now with no registration fee.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="LoginForm__input-tel">
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
                                <div className="LoginForm__input-password">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <button className="PrimaryButton_button" type="submit" disabled={loading}>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;

/**/