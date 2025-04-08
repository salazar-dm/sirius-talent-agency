import {PerformerType} from "../types/PerformerType.tsx";
import {calculateAge} from "../shared/calculateAge.tsx";

export const useGetPerformerMinMax = (performerList: PerformerType[]) => {
    const performerMin: {[key: string]: number} = {};
    const performerMax: {[key: string]: number} = {};

    Object.entries(performerList[0].profile).forEach(([key]) => {
        if (typeof performerList[0].profile[key] === "number") {
            performerMin[key] = Infinity;
            performerMax[key] = -Infinity;
        } else if (key === "dateOfBirth") {
            performerMin[key] = Infinity;
            performerMax[key] = -Infinity;
        }
    })

    performerList.forEach((performer) => {
        Object.entries(performer.profile).forEach(([key, value]) => {
            if (typeof value === "number") {
                performerMin[key] = Math.min(performerMin[key], value);
                performerMax[key] = Math.max(performerMax[key], value);
            } else if (typeof value === "string" && key === "dateOfBirth") {
                performerMin[key] = Math.min(performerMin[key], calculateAge(value));
                performerMax[key] = Math.max(performerMax[key], calculateAge(value));
            }
        })
    })

    return [performerMin, performerMax]
}