import React from "react";
import "./PerformerExplorerContainer.css";
import "../../App.css";

interface PerformerExplorerContainerProps {
    children: React.ReactNode
}

export const PerformerExplorerContainer: React.FC<PerformerExplorerContainerProps> = ({children}) => {
    return (
        <div className="PerformerExplorerContainer__container">
            <div className="Grid_grid__container">
                {children}
            </div>
        </div>
    )
}