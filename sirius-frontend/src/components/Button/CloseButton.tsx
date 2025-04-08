import React from "react";
import "./CloseButton.css";
import {CloseSvg} from "../../assets/CloseSvg.tsx";

interface CloseProps {
    onClick: () => void
}

export const CloseButton: React.FC<CloseProps> = ({onClick}) => {
    return (
        <>
            <button className="CloseButton__container" onClick={() => onClick()}>
                <span className="CloseButton__text">Close</span>
                <span className="CloseButton__icon"><CloseSvg/></span>
            </button>
        </>
    )
}