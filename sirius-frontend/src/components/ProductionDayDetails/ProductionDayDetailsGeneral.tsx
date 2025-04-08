import React from "react";
import "../../App.css";
import "./ProductionDayDetailsGeneral.css";
import {ProductionDayType} from "../../types/ProductionDayType.tsx";
import {DateObject} from "react-multi-date-picker";
import {convertDate} from "../../shared/convertDate.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import ProductionDayDetailsRoleDetails from "./ProductionDayDetailsRoleDetails.tsx";
import ProductionDayDetail from "../ProductionDay/ProductionDayDetail.tsx";
import {normalizeCamelCase} from "../../shared/normalizeCamelCase.tsx";

interface ProductionDayDetailsGeneralProps {
    productionDay: Partial<ProductionDayType>
    dates?: DateObject[]
}

const ProductionDayDetailsGeneral: React.FC<ProductionDayDetailsGeneralProps> = ({productionDay, dates}) => {
    const normalizeDates = (dates: DateObject[]) =>
        dates.map((date) => convertDate([date.year, date.month.index + 1, date.day])).join(", ");

    const normalizeBoolean = (value: boolean) => (value ? "Yes" : "No");

    const generalDetails = {
        production: productionDay.production || "",
        dates: dates ? normalizeDates(dates) : (productionDay.date ? convertDate(productionDay.date) : ""),
        union: productionDay.unionStatus || "",
        location: productionDay.location || "",
        exterior: productionDay.exterior || "",
        selfDriveOnly: productionDay.selfDriveOnly !== undefined ? normalizeBoolean(productionDay.selfDriveOnly) : "",
        notes: productionDay.notes || "",
    };

    return (
        <>
            <div className="ProductionDayDetailsGeneral__container">
                {Object.entries(generalDetails).map(([key, value]) => (
                    <ProductionDayDetail key={key} label={normalizeCamelCase(key)} value={value} className={key === "notes" ? "full-width" : "half-width"}/>
                ))}
            </div>
        </>
    )
}

export default ProductionDayDetailsGeneral