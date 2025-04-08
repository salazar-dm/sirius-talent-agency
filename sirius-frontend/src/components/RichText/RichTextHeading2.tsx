import React from "react";
import "./RichText.css";
import "../../App.css";

interface RichTextHeading2Props {
    text: string
}

export const RichTextHeading2: React.FC<RichTextHeading2Props> = ({text}) => {

    return (
        <h2>
            {text}
        </h2>
    )
}