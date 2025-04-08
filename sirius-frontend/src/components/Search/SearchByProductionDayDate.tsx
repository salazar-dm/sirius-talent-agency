import {ProductionDayType} from "../../types/ProductionDayType.tsx";
import {convertDate} from "../../shared/convertDate.tsx";

export const SearchByProductionDayDate = (input: ProductionDayType[], event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredProductionDayList = input.filter((day: ProductionDayType) =>
        convertDate(day.date).toLowerCase().includes(searchTerm)
    )

    if (filteredProductionDayList.length === 0) {
        return []
    }

    return filteredProductionDayList
}