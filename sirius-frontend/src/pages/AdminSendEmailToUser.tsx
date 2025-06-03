import React from "react";
import "../App.css"
import {useParams} from "react-router-dom";
import {usePerformerById} from "../hooks/usePerformerById.ts";
import {columnsStyle} from "../shared/columnsStyle.tsx";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay.tsx";
import {AdminMailSender} from "../components/AdminMailSender/AdminMailSender.tsx";

export const AdminSendEmailToUser: React.FC = () => {
    const {id} = useParams();



    if (!id) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <AdminMailSender id={id} />
        </>
    )
}