import React from "react";
import "./ResultsListDesktopCarousel.css";
import "./ResultsListMobileCarousel.css";
import "../../App.css";
import {CommonProps} from "../../props/Common.tsx";
import ResultsListDesktopCarousel from "./ResultsListDesktopCarousel.tsx";
import ResultsListMobileCarousel from "./ResultsListMobileCarousel.tsx";

interface ResultsListCarouselLeftProps extends CommonProps {
    isDesktop: boolean
    props: {
        category: string
        title: string
        description: string
        imageSrc: string
        imageAlt: string
    }[]
    intervalTime?: number
}

const ResultsListCarousel: React.FC<ResultsListCarouselLeftProps> = ({isDesktop, props, intervalTime = 7500}) => {

    return (
        <>
            {isDesktop ? (
                <ResultsListDesktopCarousel props={props} intervalTime={intervalTime}/>
            ) : (
                <ResultsListMobileCarousel props={props} intervalTime={intervalTime}/>
            )}
        </>
    )
}

export default ResultsListCarousel