import React from "react";
import "./PrimaryButton.css";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";

interface PrimaryButtonProps {
    text: string,
    href?: string
    onClick?: () => void
    type?: "submit"
    icon?: React.ReactNode
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({text, href, onClick, type, icon}) => {

    return (
        <>
            {href &&
                <a href={href} className="PrimaryButton__primary-button">
                    <span className="PrimaryButton__text">{text}</span>
                    <span className="PrimaryButton__icon">
                            {icon ? icon : <ArrowSvg/>}
                    </span>
                </a>
            }

            {onClick &&
                <button className="PrimaryButton__primary-button" onClick={onClick}>
                    <span className="PrimaryButton__text">{text}</span>
                    <span className="PrimaryButton__icon">
                            {icon ? icon : <ArrowSvg/>}
                    </span>
                </button>
            }

            {type &&
                <button className="PrimaryButton__primary-button" type={type}>
                    <span className="PrimaryButton__text">{text}</span>
                    <span className="PrimaryButton__icon">
                            {icon ? icon : <ArrowSvg/>}
                    </span>
                </button>
            }
        </>
    )
}

export default PrimaryButton