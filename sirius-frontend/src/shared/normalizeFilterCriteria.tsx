import {PerformerFilterCriteria} from "../types/FilterCriteria.tsx";

export function normalizePerformerFilterCriteria(criteria: PerformerFilterCriteria): { [key: string]: any } {
    const normalizedCriteria: { [key: string]: any } = {};

    function normalizeKey(key: string): string {
        if (key === "dateOfBirth") {
            return "Age";
        } else {
            return key
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/^./, (match) => match.toUpperCase());
        }
    }

    for (const key in criteria) {
        if (criteria.hasOwnProperty(key)) {
            const normalizedKey = normalizeKey(key);
            normalizedCriteria[normalizedKey] = criteria[key];
        }
    }

    return normalizedCriteria;
}