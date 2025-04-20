import React from "react";
import "./RichText.css";
import "../../App.css";

interface RichTextParagraphProps {
    children: React.ReactNode
}

export const RichTextParagraphUpdated: React.FC<RichTextParagraphProps> = ({children}) => {
    return (
        <p>{children}</p>
    )
}