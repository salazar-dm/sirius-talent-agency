import React from "react";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface CastingCreateProductionDayContainerProps {
    children: React.ReactNode
}

export const CastingCreateProductionDayContainer: React.FC<CastingCreateProductionDayContainerProps> = ({children}) => {
    return (
        <div className="CastingCreateProductionDay__container">
            <div className="Grid_grid__container">
                <div className="Grid_grid__item"
                style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                    {children}
                </div>
            </div>
        </div>
    )
}