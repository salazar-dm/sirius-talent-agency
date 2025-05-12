import {DateObject} from "react-multi-date-picker";
import {RoleType} from "./ProductionDayType.tsx";
import {ProjectRoleType} from "./ProjectRoleType.ts";
import {emptyProjectDayCall, ProjectDayCallType} from "./ProjectDayCallType.ts";
import {emptyProjectDayFitting, ProjectDayFittingType} from "./ProjectDayFittingType.ts";

export interface ProjectDayType {
    id?: string;
    projectId: string;
    title: string;
    dates: DateObject[];
    location: string;
    notes?: string;
    rate?: string;
    shuttle?: string;
    requiredDocuments?: string;
    call?: ProjectDayCallType;
    fitting?: ProjectDayFittingType;
    roles: ProjectRoleType[];
}

export const emptyProjectDay: ProjectDayType = {
    projectId: "",
    title: "",
    dates: [],
    location: "",
    notes: "",
    rate: "Regular BG. ACTRA full and apprentice as per IPA. AABP & non-union $17.20/hour.",
    shuttle: "Not Available",
    requiredDocuments: "",
    call: emptyProjectDayCall,
    fitting: emptyProjectDayFitting,
    roles: []
};
