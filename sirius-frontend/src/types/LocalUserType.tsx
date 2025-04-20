import ProductionDayType from "./ProductionDayType.tsx";
import {PerformerProfileType} from "./PerformerProfileType.tsx";

export type LocalUserType = {
    id: string;
    tel: string;
    email: string;
    emailVerified: boolean;
    testPassed: boolean;
    userActivated: boolean;
    submissionPending: boolean;
    profile: PerformerProfileType;
    productionDays: ProductionDayType[];
};