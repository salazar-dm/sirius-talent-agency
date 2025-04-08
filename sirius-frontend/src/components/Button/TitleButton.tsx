import React from "react";
import './TitleButton.css'
import "../../App.css";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";

interface TitleButtonProps {
    title: string;
    onClick?: () => void;
    href?: string;
}

const TitleButton: React.FC<TitleButtonProps> = ({title, onClick, href}) => {
    return (
        <>
            {href && (
                <a href={href} className="TitleButton__title-button">
                    <div className="TitleButton__title">{title}</div>
                    <div className="TitleButton__icon">
                        <div className="TitleButton__icon-slide">
                            <ArrowSvg/>
                            <ArrowSvg/>
                        </div>
                    </div>
                </a>
            )}
            {onClick && (
                <button className="TitleButton__title-button" onClick={onClick}>
                    <div className="TitleButton__title">{title}</div>
                    <div className="TitleButton__icon">
                        <div className="TitleButton__icon-slide">
                            <ArrowSvg/>
                            <ArrowSvg/>
                        </div>
                    </div>
                </button>
            )}
        </>
    )
}

export default TitleButton