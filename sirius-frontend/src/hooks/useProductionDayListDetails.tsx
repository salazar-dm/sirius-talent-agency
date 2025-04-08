import {ReactNode} from "react";
import {ParticipantType, ProductionDayType, RoleType} from "../types/ProductionDayType.tsx";
import {convertDate} from "../shared/convertDate.tsx";

export type ProductionDayDetailsType = {
    production: string;
    date: string;
    status: string;
    href: string;
    roles: RoleType[];
    dayMsg: ReactNode | null;
    participants: ParticipantType[];
    availableParticipants: ParticipantType[];
    confirmedParticipants: ParticipantType[];
    invoiceRequestedParticipants: ParticipantType[];
    unionStatus: string;
    notes: string;
}

export const useProductionDayListDetails = (selectedProduction: ProductionDayType[]): ProductionDayDetailsType[] => {

    return selectedProduction.map((day) => {
        const dayName = day.production;
        const dayDate = convertDate(day.date);
        const dayStatus = day.status;
        const dayRoles = day.roles;
        const dayHref = `/casting/production-days/${day.id}`;

        let dayMsg: ReactNode | null = null;

        if (dayStatus === "Availability Check") {
            dayMsg = dayRoles.map((role) => (

                <span key={role.name} className="ProductionDayDetails__message">{role.name}: {role.available} / {role.max}</span>
            ));
        }

        const participants = day.participants;
        const availableParticipants = day.availableParticipants;
        const confirmedParticipants = day.confirmedParticipants;
        const invoiceRequestedParticipants = day.invoiceRequestedParticipants;
        const unionStatus = day.unionStatus;
        const notes = day.notes;

        return {
            production: dayName,
            date: dayDate,
            status: dayStatus,
            href: dayHref,
            roles: dayRoles,
            dayMsg: dayMsg,
            participants: participants,
            availableParticipants: availableParticipants,
            confirmedParticipants: confirmedParticipants,
            invoiceRequestedParticipants: invoiceRequestedParticipants,
            unionStatus: unionStatus,
            notes: notes,
        };
    });
};