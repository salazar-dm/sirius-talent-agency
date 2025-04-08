import React, {useEffect, useState} from "react";
import './ScrollTracker.css';
import "../../App.css";

interface ScrollTrackerProps {
    hideMobile: boolean
    innerBarScaleY?: number
    innerBarScaleFinalPixels?: number
    containerOpacityFinalPixels?: number
}

const ScrollTracker: React.FC<ScrollTrackerProps> = ({hideMobile,
                                                         innerBarScaleY = 6,
                                                         innerBarScaleFinalPixels = 700,
                                                         containerOpacityFinalPixels = 500
                                                     }) => {
    const [containerStyle, setContainerStyle] = useState({opacity: 1});
    const [innerBarStyle, setInnerBarStyle] = useState({transform: `scaleY(1)`});

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > innerBarScaleFinalPixels) {
            setContainerStyle({opacity: Math.max(0, 1 - (currentScroll - innerBarScaleFinalPixels) / containerOpacityFinalPixels)});
        } else {
            setInnerBarStyle({transform: `scaleY(${Math.min(innerBarScaleY, 1 + (innerBarScaleY - 1) * (currentScroll / innerBarScaleFinalPixels))})`});
        }
    }

    return (
        <>
            <div className={`ScrollTracker__container ${hideMobile ? "ScrollTracker__container--hide-mobile" : ""}`}
            style={containerStyle}>
                <div className="ScrollTracker__scroll-tracker"></div>
                <div className="ScrollTracker__scroll-tracker-inner-bar"
                     style={innerBarStyle}></div>
                <span className="ScrollTracker__scroll-tracker-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="26" viewBox="0 0 10 26" fill="none">
                        <path d="M5 24L5 0" stroke="white" strokeWidth="2"></path>
                        <path d="M5 26L0 21H10L5 26Z" fill="white"></path>
                    </svg>
                </span>
            </div>

        </>
    )
}

export default ScrollTracker;