import {RoleFiltersType} from "./RoleFiltersType.ts";

export interface ProjectRoleType {
    name: string;
    quota: number;
    filters?: RoleFiltersType;
    forAvailabilityCheck: string[];
    availablePerformers: string[];
    confirmedPerformers: string[];
}