import React from "react";
import "./FormInput.css";
import "../../App.css";

interface FormInputProps {
    label?: string;
    input: {
        type: string;
        id: string;
        name: string;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        regexp?: string;
        placeholder?: string;
        required?: boolean;
    };
    errorMessage?: string;
    className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({label, input, errorMessage, className}) => {

    return (
        <div className={`FormInput__input-container ${className || ''}`}>
            {label && (
                <label htmlFor={input.id} className="FormInput__input-label">
                    {label}
                </label>
            )}
            <input
                type={input.type}
                id={input.id}
                name={input.name}
                value={input.value}
                onChange={input.onChange}
                className="FormInput__input"
                placeholder={input.placeholder}
                required={input.required}
            />
            {errorMessage && <span className="FormInput__error-message">{errorMessage}</span>}
        </div>
    );
};