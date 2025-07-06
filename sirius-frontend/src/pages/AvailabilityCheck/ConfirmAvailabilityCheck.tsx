import React, {useEffect, useState} from "react"
import "./ConfirmAvailabilityCheck.css"
import axios from "axios";
import {useParams} from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

export const ConfirmAvailabilityCheck = () => {
    const [response, setResponse] = useState<string | null>(null);

    const params = useParams<{
        projectDayId: string;
        roleName: string;
        performerId: string;
    }>();

    const { projectDayId, roleName, performerId } = params;

    const confirmAvailability = async (projectDayId: string, roleName: string, performerId: string) => {
        const encodedRole = encodeURIComponent(roleName);
        const url = `${import.meta.env.VITE_API_URL}/api/public/availability/confirm/${projectDayId}/${encodedRole}/${performerId}`;

        try {
            const res = await axios.get(url);
            setResponse(res.data);
        } catch (error: any) {
            setResponse(error.response?.data || "Error confirming availability");
        }
    };

    useEffect(() => {
        if (projectDayId && roleName && performerId && !response) {
            confirmAvailability(projectDayId, roleName, performerId);
        }
    }, [projectDayId, roleName, performerId]);

    if (!response) return <LoadingOverlay />;

    return (
        <>
            <div className="VerificationRequest__verification-request">
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item"
                     style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                    <h1 className="VerificationRequest__title">{response}</h1>
                </div>
            </div>
            </div>
        </>


    );
};