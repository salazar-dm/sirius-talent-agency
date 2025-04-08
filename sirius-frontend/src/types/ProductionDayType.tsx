import {PerformerType} from "./PerformerType.tsx";

export type RoleType = {
    name: string;
    available: number;
    max: number;
    isSSE: boolean;
}

export type ParticipantType = {
    id: string;
    role: string;
    unionStatus: string;
    draftCallTime: string | null;
    finalCallTime: string | null;
    commissionPaid: boolean;
}

export type ProductionDayType = {
    id: string;
    production: string;
    date: [number, number, number];
    clientId: string;
    roles: RoleType[];
    participants: ParticipantType[];
    availableParticipants: ParticipantType[];
    confirmedParticipants: ParticipantType[];
    invoiceRequestedParticipants: ParticipantType[];
    unionStatus: string;
    location: string;
    exterior: string;
    selfDriveOnly: boolean;
    newFacesOnly: boolean;
    notes: string;
    status: string;
};

type ProductionType = ProductionDayType[];

export default ProductionType;