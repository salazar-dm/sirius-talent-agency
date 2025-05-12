import React from "react";
import "./PerformerProfileContainer.css";

interface PerformerProfileContainerProps {
    children: React.ReactNode
}

export const PerformerProfileContainer: React.FC<PerformerProfileContainerProps> = ({children}) => {
    return (
        <>
            <div className="PerformerProfile__container">
                <div className="Grid_grid__container Grid_grid__container__margin">
                    {children}
                </div>
            </div>
        </>
    )
}