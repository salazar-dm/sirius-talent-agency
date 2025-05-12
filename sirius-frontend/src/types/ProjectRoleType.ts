import {RoleFiltersType} from "./RoleFiltersType.ts";

export interface ProjectRoleType {
    name: string;
    quota: number;
    filters?: RoleFiltersType;
    availablePerformers: string[];
    confirmedPerformers: string[];
}