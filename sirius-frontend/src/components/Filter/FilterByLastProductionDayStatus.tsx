import ProductionType from "../../types/ProductionDayType.tsx";

export const FilterByLastProductionDayStatus = (productionList: ProductionType[], statusList: string[]) => {
    if (productionList.length === 0 || statusList.length === 0) { return }

    productionList.filter((production: ProductionType) => {
        return statusList.includes(production[0].status)
    })

    return productionList
}