import {ProductionDayType} from "../../types/ProductionDayType.tsx";

export const FilterByProductionDayStatus = (productionList: ProductionDayType[], statusList: string[]) => {
    if (productionList.length === 0 || statusList.length === 0) { return }

    productionList.filter((production: ProductionDayType) => {
        return statusList.includes(production.status)
    })
}