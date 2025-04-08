import ProductionDayType from "./ProductionDayType.tsx";
import {PerformerProfileType} from "./PerformerProfileType.tsx";

export type LocalUserType = {
    id: string;
    tel: string;
    email: string;
    emailVerified: boolean;
    userActivated: boolean;
    submissionPending: boolean;
    performerProfile: PerformerProfileType;
    productionDays: ProductionDayType[];
};