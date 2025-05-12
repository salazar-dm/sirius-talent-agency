import React from "react";
import "./NextButton.css";

interface NextButtonProps {
    onClick: () => void
}

export const NextButton: React.FC<NextButtonProps> = ({onClick}) => {
    return (
        <button className="NextButton__button" onClick={onClick}>
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 10L16.5 10" stroke="currentColor" strokeWidth="2"></path>
                <path d="M12 5.5L16.5 10L12 14.5" stroke="currentColor" strokeWidth="2"></path>
            </svg>
        </button>
    );
}