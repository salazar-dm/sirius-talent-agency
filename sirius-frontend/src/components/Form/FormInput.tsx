import React from "react";
import "./FormInput.css";
import "../../App.css";

interface BaseInputProps {
    id: string;
    name: string;
    value: string;
    placeholder?: string;
    required?: boolean;
}

interface TextInputProps extends BaseInputProps {
    type: string;
    as?: "input";
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextAreaProps extends BaseInputProps {
    as: "textarea";
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

type InputProps = TextInputProps | TextAreaProps;

interface FormInputProps {
    label?: string;
    input: InputProps;
    errorMessage?: string;
    className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, input, errorMessage, className }) => {
    return (
        <div className={`FormInput__input-container ${className || ''}`}>
            {label && (
                <label htmlFor={input.id} className="FormInput__input-label">
                    {label}
                </label>
            )}
            {input.as === "textarea" ? (
                <textarea
                    id={input.id}
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange}
                    className="FormInput__input"
                    placeholder={input.placeholder}
                    required={input.required}
                    rows={4}
                />
            ) : (
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
            )}
            {errorMessage && <span className="FormInput__error-message">{errorMessage}</span>}
        </div>
    );
};
