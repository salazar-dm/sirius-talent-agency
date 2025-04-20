import React, { useEffect, useState } from "react";
import "./PageProgress.css";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {ShareSvg} from "../../assets/ShareSvg.tsx";

interface ProgressBarProps {
    targetRef: React.RefObject<HTMLElement>;
    title: string
}

const PageProgress: React.FC<ProgressBarProps> = ({ targetRef , title}) => {
    const [progress, setProgress] = useState(0);
    const [isProgressBarOpen, setIsProgressBarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const target = targetRef.current;
            if (!target) return;

            const rect = target.getBoundingClientRect();
            const triggerOffset = 140;

            setIsProgressBarOpen(rect.top <= 2 * triggerOffset);

            const start = triggerOffset;
            const end = -rect.height;

            const scrolled = Math.min(0, rect.top - start);
            const percentage = (-scrolled / (start - end)) * 100;

            const clamped = Math.max(0, Math.min(100, percentage));
            setProgress(clamped);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [targetRef]);

    const handleShare = () => {
        window.print();
    };







    return (
        <>
            <div className={`PageProgress__content-wrapper ${!isProgressBarOpen ? "PageProgress__content-wrapper--hidden" : ""}`}>
                <div className={`Grid_grid__container Grid_grid__container__margin PageProgress__content-wrapper__grid ${!isProgressBarOpen ? "PageProgress__content-wrapper__grid--hidden" : ""}`}>
                    <div className="Grid_grid__item PageProgress__content-wrapper__grid-item" style={columnsStyle(1, 16, 1, 16, 2, 17, 2, 17)}>
                        <div className="PageProgress__controls-wrapper">
                            <div className="PageProgress__controls-wrapper__left">
                                <div className="PageProgress__controls-wrapper-selection">
                                    <div className="PageProgress__select-filter-heading">
                                        <div className="PageProgress__select-filter-title">
                                            <span className="PageProgress__label">On this page</span>
                                            <span className="PageProgress__title">{title}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="PageProgress__controls-wrapper__right">
                                <div className="PageProgress__share-container" role="button" onClick={handleShare} aria-label="Share">
                                    <span className="PageProgress__share-icon"><ShareSvg/></span>
                                    <div className="PageProgress__share-label">
                                        <div className="PageProgress__share-label__left">
                                            <span className="PageProgress__share-label-text">Share</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="PageProgress__progress-bar-container">
                            <div className="PageProgress__progress-bar" style={{width: `${progress}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageProgress;
