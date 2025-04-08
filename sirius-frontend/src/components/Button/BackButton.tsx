import React from "react";
import "./BackButton.css";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";
import {BackSvg} from "../../assets/BackSvg.tsx";


interface BackButtonProps {
    onClick: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({onClick}) => {
    return (
        <>
            <button className="BackButton__container" onClick={onClick}>
                <span className="BackButton__icon"><BackSvg/></span>
            </button>
        </>
    )
}