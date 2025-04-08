import React, {ReactNode} from "react";
import "./SignpostPromoText.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";

interface SignpostPromoTextProps {
    eyebrow?: string
    title: string
    text: string
    button?: {
        text: string
        link: string
    }
}

const SignpostPromoText: React.FC<SignpostPromoTextProps> = ({eyebrow, title, text, button}) => {
    return (
        <>
            <div className="Grid_grid__item"
                 style={columnsStyle(1, 9, 1, 9, 2, 6, 2, 6)}>
                <div className="SignpostPromoText__container">
                    <span className="SignpostPromoText__eyebrow">{eyebrow}</span>
                    <h3 className="SignpostPromoText__title">{title}</h3>
                    <p className="SignpostPromoText__text">{text}</p>
                    <div className="SignpostPromoText__button-container">
                        {button &&
                            <PrimaryButton text={button.text} href={button.link}/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignpostPromoText