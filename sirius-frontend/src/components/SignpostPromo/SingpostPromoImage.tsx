import React from "react";
import "./SignpostPromoImage.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface SignpostPromoImageProps {
    image: string
}

export const SignpostPromoImage: React.FC<SignpostPromoImageProps> = ({image}) => {

    return (
        <>
            <div className="Grid_grid__item"
            style={columnsStyle(1, 9, 1, 9, 7, 17, 7, 17)}>
                <div className="SignpostPromoImage__container">
                    <img className="SignpostPromoImage__image" src={image} alt=""/>
                </div>
            </div>
        </>
    )
}