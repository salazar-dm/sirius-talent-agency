import React, {ReactNode} from "react";
import "./RichText.css";
import "../../App.css";

interface RichTextListProps {
    children: ReactNode
}

const RichTextList: React.FC<RichTextListProps> = ({children}) => {
    return (
        <>
            <ul>
                {children}
            </ul>
        </>
    )
}

export default RichTextList;