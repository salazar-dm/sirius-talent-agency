import React, {ReactNode} from "react";
import "./ProductionListNavigation.css";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface ProductionListNavigationProps {
    children: ReactNode
}

const ProductionListNavigation: React.FC<ProductionListNavigationProps> = ({children}) => {

    return (
        <>
            <div className="ProductionListNavigation__container">
                <div className="Grid_grid__container">
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 3, 8, 3, 8)}>
                        <h3 className="ProductionListNavigation__title">Production explorer</h3>
                    </div>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductionListNavigation