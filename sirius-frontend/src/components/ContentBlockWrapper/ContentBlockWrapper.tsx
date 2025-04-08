import "../../App.css";
import "./ContentBlockWrapper.css";
import React from "react";

interface ContentBlockWrapperProps {
    children: React.ReactNode | React.ReactNode[]
}

const ContentBlockWrapper: React.FC<ContentBlockWrapperProps> = ({children}) => {
    if (!children) throw new Error("ContentBlockWrapper must have children")

    return (
        <div className="ContentBlockWrapper__wrapper Grid_grid__container__margin">
            {children}
        </div>
    );
}

export default ContentBlockWrapper