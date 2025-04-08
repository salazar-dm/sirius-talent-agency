import React from "react";
import "./ResultsListDesktopCarousel.css";
import "./ResultsListMobileCarousel.css";
import "../../App.css";
import {CommonProps} from "../../props/Common.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import ResultsListCarouselControls from "./ResultsListCarouselControls.tsx";
import {highlightColors} from "../../assets/HighlightColors.tsx";

interface ResultsListMobileCarouselProps extends CommonProps {
    props: {
        category: string
        title: string
        description: string
        imageSrc: string
        imageAlt: string
    }[]
    intervalTime?: number
}

const ResultsListMobileCarousel: React.FC<ResultsListMobileCarouselProps> = ({props, intervalTime = 7500}) => {
    return (
        <>
            <div className="MobileCarousel__container">
                {props.map((item, index) => (
                    <>
                        <div className="MobileCarousel__item">
                            <div className="MobileCarousel__image-container">
                                <img src={item.imageSrc} alt={item.imageAlt || 'Carousel Image'} className="MobileCarousel__image"/>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default ResultsListMobileCarousel