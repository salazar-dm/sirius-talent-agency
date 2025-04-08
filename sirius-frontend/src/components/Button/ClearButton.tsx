import React from "react";
import "./ClearButton.css";
import "../../App.css";

interface ClearButtonProps {
    text: string
    onClick: () => void
}

export const ClearButton: React.FC<ClearButtonProps> = ({text, onClick}) => {


    return (
        <>
            <button className="ClearButton__button" onClick={onClick}>
                <span className="ClearButton__text">{text}</span>
            </button>
        </>
    )
}