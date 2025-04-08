import React from "react";
import "./SandwichButton.css";
import "../../App.css";

interface SandwichButtonProps {
    onClick: () => void
}

export const SandwichButton: React.FC<SandwichButtonProps> = ({onClick}) => {
    return (
        <div className="SandwichButton" onClick={onClick}>
            <div className="SandwichButton__line"></div>
            <div className="SandwichButton__line"></div>
            <div className="SandwichButton__line"></div>
        </div>
    )
}