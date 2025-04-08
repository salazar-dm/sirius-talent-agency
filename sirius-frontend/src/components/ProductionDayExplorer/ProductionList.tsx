import React, {useEffect} from "react";
import "../../App.css";
import "./ProductionList.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import ProductionType from "../../types/ProductionDayType.tsx";
import {useProductionDayListDetails} from "../../hooks/useProductionDayListDetails.tsx";

interface ProductionListProps {
    productionList: ProductionType[]
    onProductionListClick: (selectedProduction: ProductionType) => void
    triggerComponentChange: boolean
    children?: React.ReactNode
}

const ProductionList: React.FC<ProductionListProps> = ({productionList, onProductionListClick, triggerComponentChange, children}) => {

    const handleClick = (selectedProduction: ProductionType) => {
        onProductionListClick(selectedProduction);
    }

    useEffect(() => {
        console.log("modifiedProductionList ", productionList)
    }, []);

    return (
        <>
            <div className="ProductionDayGrid__production-day-grid">
                <div className="Grid_grid__container">
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                        {children}
                        <div className="ProductionDayGrid__wrapper">
                            <div className={`ProductionDayGrid__container ${triggerComponentChange && "ProductionDayGrid__container--wipe"}`}>
                                <div className="Grid_grid__container">
                                    {productionList.map((production: ProductionType, index: number) => {
                                        if (!production[0]) { return null }

                                        const productionDayDetails = useProductionDayListDetails(production)[0];

                                        const mobileDynamicGrid = 4 * (index % 2)
                                        const desktopDynamicGrid = 4 * (index % 4)

                                        return (
                                            <div className="Grid_grid__item"
                                            style={columnsStyle(1 + mobileDynamicGrid, 5 + mobileDynamicGrid, 1 + mobileDynamicGrid, 5 + mobileDynamicGrid,
                                                                1 + desktopDynamicGrid, 5 + desktopDynamicGrid, 1 + desktopDynamicGrid, 5 + desktopDynamicGrid)}>
                                                <button key={index} className={`ProductionDayGrid__button ${mobileDynamicGrid === 1 ? "mobile--last" : ""} ${desktopDynamicGrid === 3 ? "desktop--last" : ""}`}
                                                        onClick={() => handleClick(production)}>
                                                    <h3 className="ProductionList__title">{productionDayDetails.production}</h3>
                                                    <span className={`ProductionList__status ${productionDayDetails.status.replace(" ", "")}`}>{productionDayDetails.status}</span>
                                                    <span className="ProductionList__date">{productionDayDetails.date}</span>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductionList;