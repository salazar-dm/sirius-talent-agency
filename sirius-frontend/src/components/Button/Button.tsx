import React from "react";
import "./Button.css";

interface ButtonProps {
    buttonStyle: string
    buttonLink?: string
    buttonText: string
    buttonOnClick?: () => void
    className?: string
}

const Button : React.FC<ButtonProps> = ({buttonStyle, buttonLink, buttonText, buttonOnClick, className}) => {
    if (buttonStyle === "primary") {
        return (
            <>
                <a href={buttonLink} className="PrimaryButton_button" onClick={buttonOnClick}>
                    <span className="PrimaryButton_text">{buttonText}</span>
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
                </a>
            </>
        );
    } else if (buttonStyle === "primaryTextOnClick") {
        return (
            <>
                <button className="PrimaryButton_button" onClick={buttonOnClick}>
                    <span className="PrimaryButton_text">{buttonText}</span>
                </button>
            </>
        );
    } else if (buttonStyle === "secondaryTextOnClick") {
        return (
            <>
                <button className={`SecondaryButton_button ${className}`} onClick={buttonOnClick}>
                    <span className="SecondaryButton_text">{buttonText}</span>
                </button>
            </>
        );
    } else if (buttonStyle === "submit") {
        return (
            <>
                <button type="submit" className="PrimaryButton_button">
                    <span className="PrimaryButton_text">{buttonText}</span>
                </button>
            </>
        );
    }
};

export default Button;