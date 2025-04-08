import React from "react";
import "../../App.css";
import "./ProductionDayDetailsCardContainer.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";


interface ProductionDayDetailsCardContainerProps {
    children: React.ReactNode
}

export const ProductionDayDetailsCardContainer: React.FC<ProductionDayDetailsCardContainerProps> = ({children}) => {
    return (
        <div className="ProductionDayDetailsCardContainer__container">
            <div className="ProductionDayDetailsCardContainer__scrollable">
                {children}
            </div>
        </div>
    )
}