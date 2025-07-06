// src/components/ProjectDayActions/SendAvailabilityCheckForm.tsx
import React, { useState, useEffect } from "react";
import "./SendAvailabilityCheckForm.css";
import HeaderHub from "../HeaderHub/HeaderHub.tsx";
import ModeSelector from "../ModeSelector/ModeSelector.tsx";
import RichText from "../RichText/RichText.tsx";
import {SendAvailabilityCheckFilters} from "../SendAvailabilityCheckForm/SendAvailabilityCheckFilters.tsx";
import useFetchPerformerList from "../../hooks/useFetchPerformerList.tsx";
import {emptyProjectDay, ProjectDayType} from "../../types/ProjectDayType.ts";
import {ProjectDayRolesEditor} from "../ProjectDayRolesEditor/ProjectDayRolesEditor.tsx";
import {ProjectRoleType} from "../../types/ProjectRoleType.ts";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {AvailabilityEmailEditor} from "../AvailabilityEmailEditor/AvailabilityEmailEditor.tsx";
import {SendAvailabilityCheckPerformerList} from "../SendAvailabilityCheckForm/SendAvailabilityCheckPerformerList.tsx";
import role from "../ProductionDayForm/Role.tsx";
import {useParams} from "react-router-dom";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.tsx";
import axios from "axios";
import SecondaryButton from "../Button/SecondaryButton.tsx";
import {sendAvailabilityCheck} from "../../fetch/sendAvailabilityCheck.ts";

export const SendAvailabilityCheckForm: React.FC = () => {
    const {id: projectId, dayId} = useParams();

    const [phase, setPhase] = useState(1);
    const [mode, setMode] = useState("");
    const [projectDay, setProjectDay] = useState<ProjectDayType | null>(null);
    const [roles, setRoles] = useState<ProjectRoleType[]>([]);
    const [currentRoleIndex, setCurrentRoleIndex] = useState<number>(0);

    const performers = useFetchPerformerList()

    const onNextPhase = () => {
        setPhase((prevPhase) => prevPhase + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const onModeSelect = (mode: string) => {
        setMode(mode);
        onNextPhase();
    }

    const handleSaveFromFilters = (performerIds: string[]) => {
        if (currentRoleIndex === null) return;

        const updatedRoles = [...roles];
        updatedRoles[currentRoleIndex] = {
            ...updatedRoles[currentRoleIndex],
            forAvailabilityCheck: performerIds
        };
        setRoles(updatedRoles);

        if (currentRoleIndex < roles.length - 1) {
            setCurrentRoleIndex(prev => prev + 1);
        } else {
            setPhase(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const onSendAvailability = async () => {
        if (!projectDay) return;

        const projectDayToSend = {
            ...projectDay,
            roles: roles
        };

        await axios.put(`${import.meta.env.VITE_API_URL}/api/project/${projectId}/day/${dayId}`, projectDayToSend, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        try {
            await sendAvailabilityCheck(projectDayToSend);
            console.log("Availability check sent");
        } catch (e) {
            console.error("Failed to send availability check", e);
        }
    };

    useEffect(() => {
        console.log(roles)
    }, [roles]);


    useEffect(() => {
        if (!projectId || !dayId) return;

        axios.get(`${import.meta.env.VITE_API_URL}/api/project/${projectId}/day/${dayId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log(res.data);
            setProjectDay(res.data);
        }).catch(() => {
            setProjectDay(null);
        });
    }, [projectId, dayId]);

    if (!projectDay) {
        return <LoadingOverlay/>
    }

    return (
        <>
            {phase === 1 && (
                <>
                    <HeaderHub
                        title="Booking mode"
                        text="On this step you can select whether you want to book automatically or manually"/>
                    <ModeSelector
                        onModeClick={onModeSelect}
                        modeList={[
                            {
                                title: "Automatic",
                                description:
                                    <RichText>
                                        <ul>
                                            <li>select the performers in minutes</li>
                                            <li>get the availability quickly</li>
                                            <li>perfect for crowd scene days</li>
                                        </ul>
                                        <p>Read about the <a href="/casting/booking-mode">automatic selection process</a></p>
                                    </RichText>,
                            },
                            {
                                title: "Hand-picked",
                                description: "I want to book manually.",
                            },
                        ]}
                    />
                </>
            )}
            {
                phase === 2 && (
                    <>
                        <ProjectDayRolesEditor roles={roles} setRoles={setRoles} />
                        <div className="Grid_grid__container Grid_grid__container__margin">
                            <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 4, 2, 4)}>
                                <PrimaryButton text={"Save"} onClick={onNextPhase} />
                            </div>
                        </div>

                    </>
                )
            }

            {
                phase === 3 && mode === "Automatic" && (
                    <>
                        <HeaderHub
                        title="Performer Selector"
                        text={"Please select the filters for performers to send the availability check to"}
                        />
                        <SendAvailabilityCheckFilters roleName={roles[currentRoleIndex].name} onSave={handleSaveFromFilters} />
                    </>
                )
            }
            {
                phase === 3 && mode === "Hand-picked" && (
                    <>
                        <HeaderHub
                            title="Performer Selector"
                            text={"Please select the filters for performers to send the availability check to"}
                        />
                        <SendAvailabilityCheckPerformerList roleName={roles[currentRoleIndex].name} onSave={handleSaveFromFilters} />
                    </>
                )
            }
            {
                phase === 4 && (
                    <>
                        <PrimaryButton text="Send availability check" onClick={onSendAvailability} />
                    </>
                )
            }
        </>
    );
};
