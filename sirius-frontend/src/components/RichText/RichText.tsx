import React, {ReactNode} from "react";
import "./RichText.css";
import "../../App.css";

interface RichTextProps {
    children: ReactNode
}

const RichText: React.FC<RichTextProps> = ({children}) => {

    return (
        <>
            <div className="RichText__container">
                {children}
            </div>
        </>
    )
}

export default RichText