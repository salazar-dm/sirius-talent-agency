import {PerformerProfileType} from "./PerformerProfileType.tsx";

export type PerformerType = {
    id: string;
    tel: string;
    email: string;
    submissionPending: boolean;
    userActivated: boolean;
    profile: PerformerProfileType;
}