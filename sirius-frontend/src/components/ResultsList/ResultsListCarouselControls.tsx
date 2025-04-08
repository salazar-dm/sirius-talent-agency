import React from "react";
import "./ResultsListCarouselControls.css";
import "../../App.css";
import {CommonProps} from "../../props/Common.tsx";
import {NextSvg} from "../../assets/NextSvg.tsx";
import {PrevSvg} from "../../assets/PrevSvg.tsx";

interface ResultsListCarouselControlsProps extends CommonProps {
    onNext: (currentIndex: number) => void
    onPrevious: (currentIndex: number) => void
    currentIndex: number
    props: any[]
}

const ResultsListCarouselControls: React.FC<ResultsListCarouselControlsProps> = ({onNext, onPrevious, currentIndex, props}) => {

    return (
        <>
            <div className="ResultsListCarouselControls__container">
                <div className="ResultsListCarouselControls__primary-controls">
                    <button className="ResultsListCarouselControls__previous" onClick={() => onPrevious}>
                        <span className="ResultsListCarouselControls__previous-icon">
                            <PrevSvg/>
                        </span>
                    </button>
                    <button className="ResultsListCarouselControls__next" onClick={() => onNext}>
                        <span className="ResultsListCarouselControls__next-icon">
                            <NextSvg/>
                        </span>
                    </button>
                </div>
                <div className="ResultsListCarouselControls__secondary-controls">
                    <div className="ResultsListCarouselControls__duration">
                        {props.map((item, index) => (
                            <div key={item.title}>
                                <span className={`ResultsListCarouselControls__duration-dash ${currentIndex === index ? "ResultsListCarouselControls__duration-dash--active" : ""}`}></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultsListCarouselControls