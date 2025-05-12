import {DateObject} from "react-multi-date-picker";

export interface ProjectDayCallType {
    title: string;
    filmingDate: DateObject | string;
    reportTo: string;
    parking: string;
    shuttles?: string;
    healthAndSafety?: string;
    rate?: string;
    callSheet: {
       call: string;
       name: string;
       union: string;
       role: string;
    }[];
    wardrobeNotes: string;
    hairNotes: string;
    makeupNotes: string;
    accounting?: string;
    additionalNotes?: string;
}

export const emptyProjectDayCall: ProjectDayCallType = {
    title: "",
    filmingDate: "",
    reportTo: "",
    parking: "",
    shuttles: "",
    healthAndSafety: "",
    rate: "",
    callSheet: [],
    wardrobeNotes: "",
    hairNotes: "",
    makeupNotes: "",
    accounting: "",
    additionalNotes: ""
};
