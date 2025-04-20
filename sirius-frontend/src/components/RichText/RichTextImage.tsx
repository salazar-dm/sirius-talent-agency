import React from "react";
import "./RichText.css";
import "../../App.css";

interface RichTextImageProps {
    children: React.ReactNode
}

export const RichTextImage: React.FC<RichTextImageProps> = ({children}) => {
    return (
        {children}
    )
}