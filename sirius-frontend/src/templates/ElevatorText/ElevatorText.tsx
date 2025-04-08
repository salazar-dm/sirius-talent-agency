import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./ElevatorText.css";
import Button from "../../components/Button/Button.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import "../../App.css";
import PrimaryButton from "../../components/Button/PrimaryButton.tsx";

interface ElevatorTextProps {
    text: string,
    buttonLink: string,
    buttonText: string
}

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const ElevatorText : React.FC<ElevatorTextProps> = ({text, buttonLink, buttonText}) => {

    useLayoutEffect(() => {
        const tl = gsap.timeline();

        tl.to(".ElevatorText__text",
            {
                backgroundPositionX: "0%",
                scrollTrigger: {
                    trigger: ".ElevatorText__text",
                    start: "top 60%",
                    end: "bottom 40%",
                    scrub: true,
                }
            }
        )
    }, []);

    return (
        <>
            <div className="ElevatorText__wrapper">
                <div className="Grid_grid__container Grid_grid__container__margin"
                     style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 2, 5, 2, 5)}>
                        <p className="ElevatorText__eyebrow">Our expertise</p>
                    </div>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 5, 15, 5, 15)}>
                        <div className="ElevatorText__container">
                            <h3 className="ElevatorText__text">{text}</h3>
                            <div className="ElevatorText__cta-container">
                                <PrimaryButton href={buttonLink} text={buttonText}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ElevatorText

