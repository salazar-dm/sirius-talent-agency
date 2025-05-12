import {DateObject} from "react-multi-date-picker";

export interface ProjectDayFittingType {
    title: string;
    shootDates: DateObject[];
    fittingDate: DateObject | string;
    rate?: string;
    fittingTime: {
        call: string;
        name: string;
        union: string;
        role: string;
    }[];
    reportTo: string;
    notes?: string;
    wardrobeNotes: string;
    hairNotes?: string;
    makeupNotes?: string;
    additionalNotes?: string;
}

export const emptyProjectDayFitting: ProjectDayFittingType = {
    title: "",
    shootDates: [],
    fittingDate: "",
    rate: "",
    fittingTime: [],
    reportTo: "",
    notes: "",
    wardrobeNotes: "",
    hairNotes: "",
    makeupNotes: "",
    additionalNotes: ""
};