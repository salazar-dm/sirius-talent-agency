import React from "react";
import "./HeaderBanner.css";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import Button from "../Button/Button.tsx";
import "../../App.css";
import HomePageWipeAnimation from "./HomePageWipeAnimation.tsx";
import ScrollTracker from "./ScrollTracker.tsx";

interface HeaderBannerProps {
    image: string
    imageAlt: string
    eyebrow: string
    title: string
    description: string
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({image, imageAlt, eyebrow, title, description}) => {
    return (
        <>
            <div className="HeaderBanner__content-wrapper">
                <ScrollTracker hideMobile={true}/>
                <div className="Grid_grid__container Grid_grid__container__margin HeaderBanner__grid-container">
                    <HomePageWipeAnimation/>
                    <div className="Grid_grid__item"
                    style={columnsStyle(1, 9, 1, 9, 2, 9, 2, 9)}>
                        <div className="HeaderBanner__image-container">
                            <img src={image} alt={imageAlt} className="HeaderBanner__image"/>
                        </div>
                    </div>
                    <div className="Grid_grid__item"
                    style={columnsStyle(1, 9, 1, 9, 10, 15, 10, 15)}>
                        <div className="HeaderBanner__content">
                            <div className="Grid_grid__container Grid_grid__custom-cols">
                                <div className="Grid_grid__item"
                                     style={columnsStyle(1, 6, 1, 5, 1, 7, 1, 7)}>
                                    <div className="HeaderBanner__content-col-1">
                                        <p className="HeaderBanner__eyebrow">{eyebrow}</p>
                                        <h1 className="HeaderBanner__title">{title}</h1>
                                    </div>
                                </div>
                                <div className="Grid_grid__item"
                                     style={columnsStyle(1, 8, 6, 9, 2, 9, 2, 5)}>
                                    <div className="HeaderBanner__content-col-2">
                                        <p className="HeaderBanner__description">{description}</p>
                                        <div className="HeaderBanner__button-container">
                                            <Button buttonStyle={"primary"} buttonLink={"/about-us"} buttonText={"Learn more"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderBanner