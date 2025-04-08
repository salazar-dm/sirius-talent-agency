import React from "react";
import "../../App.css";
import "./PerformerExplorerHeaderContainer.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface PerformerExplorerHeaderContainerProps {
    children?: React.ReactNode
}

export const PerformerExplorerHeaderContainer: React.FC<PerformerExplorerHeaderContainerProps> = ({children}) => {
    return (
        <div className="PerformerExplorerHeaderContainer__container">
            <div className="Grid_grid__container">
                <div className="Grid_grid__item"
                style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                    <div className="PerformerExplorerHeaderContainer__performer-explorer-header">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}