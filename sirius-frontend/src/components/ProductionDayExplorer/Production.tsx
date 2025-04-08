import React from "react";
import "./Production.css";
import "../../App.css";
import ProductionType from "../../types/ProductionDayType.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {ProductionDayDetailsType, useProductionDayListDetails} from "../../hooks/useProductionDayListDetails.tsx";
import Uplink from "../Uplink/Uplink.tsx";

interface ProductionProps {
    selectedProduction: ProductionType
    onBack: () => void
    triggerComponentChange: boolean
}

const Production: React.FC<ProductionProps> = ({selectedProduction, onBack, triggerComponentChange}) => {
    if (selectedProduction.length === 0) {
        return null
    }

    const productionDayDetailsList = useProductionDayListDetails(selectedProduction);

    return (
        <>
            <div className="Production__container">
                <div className={`Production__production ${triggerComponentChange && "Production__production--wipe"}`}>
                    <div className="Grid_grid__container Production__custom-grid">
                        <div className="Grid_grid__item"
                        style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                            <div className="Production__uplink-container">
                                <Uplink onClick={onBack} title="All productions"/>
                            </div>
                        </div>
                        {productionDayDetailsList.map((details: ProductionDayDetailsType, index: number) => {
                            return (
                                <div key={index} className="Grid_grid__item"
                                style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                                    <a href={details.href} className="Production__link">
                                        <div className="Production__title-container">
                                            <span className="Production__title">{details.production}</span>
                                            <span className="Production__date">{details.date}</span>
                                            <span className={`Production__status ${details.status.replace(" ", "")}`}>{details.status}</span>
                                        </div>
                                        {details.dayMsg}
                                    </a>
                                </div>
                            )

                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Production