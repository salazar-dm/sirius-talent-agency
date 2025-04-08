import React from "react";
import "./FormGuide.css";
import "../../App.css";
import {QuestionMarkSvg} from "../../assets/QuestionMarkSvg.tsx";

interface FormGuideProps {
    text: string
}

export const FormGuide: React.FC<FormGuideProps> = ({text}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div className="FormGuide__container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <QuestionMarkSvg/>
            {isHovered && <div className="FormGuide__text">{text}</div>}
        </div>
    )
}