import React from "react";
import "./PerformerExplorerPerformerList.css";
import "../../App.css";

interface PerformerExplorerPerformerListProps {
    children: React.ReactNode,
    columns?: number
}

export const PerformerExplorerPerformerList: React.FC<PerformerExplorerPerformerListProps> = ({children, columns}) => {
    return (
        <div className="PerformerExplorerPerformerList__container PerformerExplorerPerformerList__scrollable" style={{'--columns': `${columns}`} as React.CSSProperties}>
                {children}
        </div>
    )
}