import {PerformerType} from "../types/PerformerType.tsx";
import {PerformerFilterCriteria} from "../types/FilterCriteria.tsx";
import {calculateAge} from "../shared/calculateAge.tsx";

export function usePerformerFilter(performerList: PerformerType[], criteria: PerformerFilterCriteria): PerformerType[] {
    return performerList.filter((performer) => {
        return Object.keys(criteria).every((key) => {
            const filterValue = criteria[key]
            const performerValue = performer.profile[key]

            console.log("Key: ", key, "Filter: ", filterValue, "Performer: ", performerValue)

            if (filterValue && typeof filterValue === "string" && typeof performerValue === "string") {
                return performerValue.toLowerCase().includes(filterValue.toLowerCase())
            }

            if (filterValue && typeof filterValue === "boolean" && typeof performerValue === "boolean") {
                return filterValue === performerValue
            }

            if (
                filterValue &&
                typeof filterValue === "object" &&
                ("min" in filterValue || "max" in filterValue) &&
                typeof performerValue === "number"
            ) {
                if ("min" in filterValue && "max" in filterValue && filterValue.min && filterValue.max) {
                    return filterValue.min <= performerValue && filterValue.max >= performerValue;
                }
                if ("min" in filterValue && filterValue.min) {
                    return performerValue >= filterValue.min;
                }
                if ("max" in filterValue && filterValue.max) {
                    return performerValue <= filterValue.max;
                }
            }

            if (filterValue && typeof filterValue === "object" && Array.isArray(filterValue) && typeof performerValue === "string") {
                return filterValue.includes(performerValue)
            }

            if (filterValue) {
                console.log("Custom triggered")
                return customFilters(performerValue, filterValue, key)
            }
        })
    })
}

function customFilters(performerValue: any, filterValue: any, key: string): boolean {
    if (key === "dateOfBirth" &&
        typeof filterValue === "object" &&
        ("min" in filterValue || "max" in filterValue) &&
        performerValue) {
        const age = calculateAge(performerValue)

        if ("min" in filterValue && "max" in filterValue && filterValue.min && filterValue.max) {
            return filterValue.min <= age && filterValue.max >= age;
        }
        if ("min" in filterValue && filterValue.min) {
            return age >= filterValue.min;
        }
        if ("max" in filterValue && filterValue.max) {
            return age <= filterValue.max;
        }
    }

    return false;
}