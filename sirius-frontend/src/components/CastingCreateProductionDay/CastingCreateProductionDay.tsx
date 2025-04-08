import React from "react";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import {ProductionDayType} from "../../types/ProductionDayType.tsx";
import {CastingCreateProductionDayContainer} from "./CastingCreateProductionDayContainer.tsx";
import ProductionDayDetails from "../ProductionDayDetails/ProductionDayDetails.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import {DateObject} from "react-multi-date-picker";

interface CastingCreateProductionDayProps {
    productionDay: Partial<ProductionDayType>
    performerList?: PerformerType[]
    onConfirm: Function
    dates: DateObject[]
}

const CastingCreateProductionDay: React.FC<CastingCreateProductionDayProps> = ({productionDay, performerList, onConfirm, dates}) => {

    return (
        <CastingCreateProductionDayContainer>
            <ProductionDayDetails
                productionDay={productionDay}
                performerList={performerList}
                dates={dates}
            />
            <PrimaryButton
                onClick={() => onConfirm()}
                text="Confirm"
            />
        </CastingCreateProductionDayContainer>
    )
}

export default CastingCreateProductionDay