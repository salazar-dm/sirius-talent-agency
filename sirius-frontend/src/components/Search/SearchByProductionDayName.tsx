import ProductionType, {ProductionDayType} from "../../types/ProductionDayType.tsx";
import React from "react";

export const SearchByProductionDayName = (input: ProductionType[], event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredProductionList = input.map((production: ProductionType) =>
        production.filter((day: ProductionDayType) =>
            day.production.toLowerCase().startsWith(searchTerm)
        )
    )

    if (filteredProductionList.length === 0) {
        return []
    }

    return filteredProductionList
}