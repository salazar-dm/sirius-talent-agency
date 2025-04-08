import React from "react";
import "./SignpostMenuContainer.css";

interface SignpostMenuContainerProps {
    children: React.ReactNode
}

export const SignpostMenuContainer: React.FC<SignpostMenuContainerProps> = ({children}) => {
    return (
        <div className="SignpostMenuContainer__container">
            <div className="Grid_grid__container">
                {children}
            </div>
        </div>
    )
}