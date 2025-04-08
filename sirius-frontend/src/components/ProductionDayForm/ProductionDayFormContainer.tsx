import React from "react";
import "./ProductionDayFormContainer.css";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface ProductionDayFormContainerProps {
    children: React.ReactNode;
}

export const ProductionDayFormContainer: React.FC<ProductionDayFormContainerProps> = ({children}) => {
    return (
        <div className="ProductionDayForm__production-day-form">
            <div className="Grid_grid__container">
                <div className="Grid_grid__item"
                     style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                    <div className="ProductionDayForm__content-wrapper">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}