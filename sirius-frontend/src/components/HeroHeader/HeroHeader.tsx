import React from "react";
import "./HeroHeader.css";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {SiriusTalentLogo} from "../../assets/SiriusTalentLogo.tsx";

interface HeroHeaderProps {
    eyebrow?: string
    title?: string
    subtitle?: string
    imgSrc?: string
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({eyebrow, title, subtitle, imgSrc = "https://res.cloudinary.com/da7bqrpqb/image/upload/v1745092089/website-pictures/e8jhrlvltbonf6abpwpf.jpg"}) => {
    return (
        <>
            <div className="HeroHeader__content-wrapper">
                <div className="Grid_grid__container Grid_grid__container__margin">
                    <div className="Grid_grid__item Grid_grid__bleed-direction-right" style={columnsStyle(1, 9, 1, 9, 3, 17, 3, 17)}>
                        <div className="HeroHeader__hero-header">
                            <div className="HeroHeader__logo-wrapper">
                                <SiriusTalentLogo/>
                            </div>
                            <div className="HeroHeader__eyebrow">
                                <div className="HeroHeader__eyebrow-row">
                                    <div className="HeroHeader__tag">{eyebrow}</div>
                                </div>
                            </div>
                            <h1 className="HeroHeader__title">{title}</h1>
                            <p className="HeroHeader__subtitle">{subtitle}</p>
                            {imgSrc &&<div className="HeroHeader__image-container">
                                <img
                                    src={imgSrc}
                                    alt="Exterior modern building" className="HeroHeader__image"/>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}