import {PerformerType} from "../types/PerformerType.tsx";

type PerformerCount = {
    union: number
    nonUnion: number
}

export const countPerformersByUnionStatus = (performerList: PerformerType[]): PerformerCount => {
    const unionPerformers = performerList.filter((performer) => performer.profile.unionStatus.startsWith("ACTRA")).length;
    return {
        union: unionPerformers,
        nonUnion: performerList.length - unionPerformers
    };
}