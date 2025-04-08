import React, {useEffect} from "react";
import "./SignpostPromoAnimatedImage.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {MonogramSmall} from "../../assets/MonogramSmall.tsx";

interface SignpostPromoAnimatedImageProps {
    image: string
}

export const SignpostPromoAnimatedImage: React.FC<SignpostPromoAnimatedImageProps> = ({image}) => {
    return (
        <>
            <div className="Grid_grid__item"
            style={columnsStyle(1, 9, 1, 9, 7, 17, 7, 17)}>
                <div className="SignpostPromoAnimatedImage__wrapper">
                    <div className="SignpostPromoAnimatedImage__wipe">
                        <span className="SignpostPromoAnimatedImage__wipe-block"></span>
                        <div className="SignpostPromoAnimatedImage__image-container">
                            <img className="SignpostPromoAnimatedImage__image" src={image}/>
                        </div>
                    </div>
                    <div className="SignpostPromoAnimatedImage__monogram-wrapper">
                        <MonogramSmall/>
                    </div>
                </div>
            </div>
        </>
    )
}