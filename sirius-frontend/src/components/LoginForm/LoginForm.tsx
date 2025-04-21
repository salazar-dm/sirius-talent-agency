import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import "./LoginForm.css"
import Modal from "../Modal/Modal.tsx";
import {CustomModal} from "../Modal/CustomModal.tsx";
import ErrorModal from "../Modal/ErrorModal.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import FormPasswordInput from "../Form/FormPasswordInput.tsx";

const LoginForm: React.FC = () => {


    const [tel, setTel] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const formatPhoneNumber = (value: string): string => {
        const digits = value.replace(/\D/g, "");

        const normalized = digits.startsWith("1") ? digits : `1${digits}`;

        const sliced = normalized.slice(0, 11);

        const part1 = sliced.slice(0, 1);   // 1
        const part2 = sliced.slice(1, 4);   // XXX
        const part3 = sliced.slice(4, 7);   // XXX
        const part4 = sliced.slice(7, 11);  // XXXX

        let result = part1;
        if (part2) result += `-${part2}`;
        if (part3) result += `-${part3}`;
        if (part4) result += `-${part4}`;

        return result;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (!value.startsWith("1")) return;

        setTel(formatPhoneNumber(value));
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (tel === "") {
            setTel("1-");
            setTimeout(() => {
                e.target.setSelectionRange(2, 2);
            }, 0);
        } else if (e.target.selectionStart !== null && e.target.selectionStart < 2) {
            e.target.setSelectionRange(2, 2);
        }
    };

    const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (input.selectionStart !== null && input.selectionStart < 2) {
            input.setSelectionRange(2, 2);
        }
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
                                        onFocus={handleFocus}
                                        onSelect={handleSelect}
                                        placeholder="Phone number"
                                        pattern="\d{1}-\d{3}-\d{3}-\d{4}"
                                        required
                                    />
                                </div>
                                <div className="LoginForm__input-password">
                                    <FormPasswordInput value={password} onChange={(value) => setPassword(value)}/>
                                </div>
                                <PrimaryButton text="Submit" type="submit"/>
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