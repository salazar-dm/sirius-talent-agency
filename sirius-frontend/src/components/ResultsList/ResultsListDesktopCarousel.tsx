import React, {useEffect} from "react";
import "./ResultsListDesktopCarousel.css";
import "../../App.css";
import {CommonProps} from "../../props/Common.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import ResultsListCarouselControls from "./ResultsListCarouselControls.tsx";
import {highlightColors} from "../../assets/HighlightColors.tsx";

interface ResultsListDesktopCarouselProps extends CommonProps {
    props: {
        category: string
        title: string
        description: string
        imageSrc: string
        imageAlt: string
    }[]
    intervalTime?: number
}

const ResultsListDesktopCarousel: React.FC<ResultsListDesktopCarouselProps> = ({ props, intervalTime = 7500}) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const leftCarouselImages: {imageSrc: string, imageAlt: string}[] = props.map((item) => ({imageSrc: item.imageSrc, imageAlt: item.imageAlt}));
    const rightCarouselImages: {imageSrc: string, imageAlt: string}[] = moveLastToFirst(leftCarouselImages);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % props.length);
        }, intervalTime);

        return () => {
            clearInterval(intervalId);
        }
    }, [intervalTime, currentIndex, props.length]);

    const onNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % props.length);
    }

    const onPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + props.length) % props.length);
    }

    return (
        <>
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item"
                     style={columnsStyle(1, 9, 1, 9, 2, 7, 2, 7)}>
                    <div className="ResultsListCarouselLeft__image-container">
                        {leftCarouselImages.map((item, index) => (
                            <>
                                {index === currentIndex && (
                                    <img key={item.imageAlt} src={item.imageSrc} alt={item.imageAlt || 'Carousel Image'}
                                         className="ResultsListCarouselLeft__image"/>
                                )}
                            </>
                        ))}
                    </div>
                </div>
                <div className="Grid_grid__item"
                     style={columnsStyle(1, 9, 1, 9, 9, 17, 9, 17)}>
                    <div className="Grid_grid__container ResultsListCarouselRight__custom-grid">
                        <div className="Grid_grid__item"
                             style={columnsStyle(1, 9, 1, 9, 5, 7, 5, 7)}>
                            <div className="ResultsListCarouselRight__image-container">
                                {rightCarouselImages.map((item, index) => (
                                    <>
                                        {index === currentIndex && (
                                            <img src={item.imageSrc} alt="Carousel Image"
                                                 className="ResultsListCarouselRight__image"/>
                                        )}
                                    </>
                                ))}
                                <ResultsListCarouselControls onNext={onNext} onPrevious={onPrevious}
                                                             currentIndex={currentIndex} props={props}/>
                            </div>
                        </div>
                        <div className="Grid_grid__item"
                             style={columnsStyle(1, 9, 1, 9, 7, 8, 7, 8)}>
                            {props.map((item, index) => (
                                <>
                                    {index === currentIndex && (
                                        <h2 className="ResultsListCarouselRight__description">{item.description}</h2>
                                    )}

                                </>
                            ))}
                        </div>
                        <div className="Grid_grid__item"
                             style={columnsStyle(1, 9, 1, 9, 1, 7, 1, 7)}>
                            <div className="ResultsListCarouselRight__heading-container">
                                {props.map((item, index) => (
                                    <>
                                        {index === currentIndex && (
                                            <>
                                                        <span className="ResultsListCarouselRight__category">
                                                            <p className="ResultsListCarouselRight__category-tag"
                                                               style={{borderLeft: `4px solid ${highlightColors[currentIndex]}`}}>{item.category}</p>
                                                        </span>
                                                <h2 className="ResultsListCarouselRight__title">{item.title}</h2>
                                            </>
                                        )}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function moveLastToFirst(arr: { imageSrc: string, imageAlt: string }[]): { imageSrc: string, imageAlt: string }[] {
    if (arr.length <= 1) return arr;

    const copiedArr = [...arr];

    const lastElement = copiedArr.pop();
    if (lastElement !== undefined) {
        copiedArr.unshift(lastElement);
    }

    return copiedArr;
}

export default ResultsListDesktopCarousel

