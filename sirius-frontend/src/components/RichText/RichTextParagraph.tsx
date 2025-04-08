import React from "react";
import "./RichText.css";
import "../../App.css";

interface RichTextParagraphProps {
    text: string
}

export const RichTextParagraph: React.FC<RichTextParagraphProps> = ({text}) => {

    return (
        <p>
            {text}
        </p>
    )
}