import React from "react";
import "./HeaderDetailWrapper.css";

interface HeaderDetailWrapperProps {
    children: React.ReactNode
}

const HeaderDetailWrapper: React.FC<HeaderDetailWrapperProps> = ({children}) => {
    return (
        <div className="HeaderDetailWrapper__header-detail-wrapper">
            {children}
        </div>
    )
}

export default HeaderDetailWrapper