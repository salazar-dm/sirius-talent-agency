import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {ProjectDayMenu} from "../../components/ProjectMenu/ProjectDayMenu.tsx";
import {ProjectDayActionModal} from "../../components/ProjectDayAction/ProjectDayActionModal.tsx";
import {actionTemplates} from "../../templates/actionTemplates.ts";
import {ProjectDayAction} from "../../types/ProjectDayActions.ts";
import axios from "axios";
import {ProjectDayType} from "../../types/ProjectDayType.ts";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.tsx";
import {useFetchPerformerListByListIds} from "../../hooks/useFetchPerformerListByListIds.tsx";
import {PerformerType} from "../../types/PerformerType.tsx";

const ProjectDay: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { dayId } = useParams<{ dayId: string }>();
    const navigate = useNavigate();

    const [openAction, setOpenAction] = useState<ProjectDayAction | null>(null);
    const [projectDay, setProjectDay] = useState<ProjectDayType | null>(null);
    const [performersByRole, setPerformersByRole] = useState<Record<string, PerformerType[]>>({});

    useEffect(() => {
        const container = document.querySelector(".ProjectDay__container");
        if (!container) return;

        if (openAction) {
            container.classList.add("no-display");
        } else {
            container.classList.remove("no-display");
        }

        return () => container.classList.remove("no-display");
    }, [openAction]);

    useEffect(() => {
        if (!id || !dayId) return;

        axios.get(`${import.meta.env.VITE_API_URL}/api/project/${id}/day/${dayId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log(res.data);
            setProjectDay(res.data);
        }).catch(() => {
            setProjectDay(null);
        });
    }, [id, dayId]);

    useEffect(() => {
        if (!projectDay) return;

        const roleMap: Record<string, string[]> = {};
        const allIds = new Set<string>();

        projectDay.roles.forEach(role => {
            const ids = role.availablePerformers || [];
            roleMap[role.name] = ids;
            ids.forEach(id => allIds.add(id));
        });

        const allIdList = Array.from(allIds);

        useFetchPerformerListByListIds(allIdList).then(res => {
            const allPerformers = res.data;

            const grouped: Record<string, PerformerType[]> = {};

            for (const roleName in roleMap) {
                grouped[roleName] = allPerformers.filter(p => roleMap[roleName].includes(p.id));
            }

            setPerformersByRole(grouped);
        });
    }, [projectDay]);

    if (!projectDay) {
        return <LoadingOverlay/>
    }


    return (
        <>
            {openAction && (
                <ProjectDayActionModal
                    title={actionTemplates[openAction].title}
                    onClose={() => setOpenAction(null)}
                >
                    {React.createElement(actionTemplates[openAction].render)}
                </ProjectDayActionModal>
            )}
            <div className="ProjectDay__container">
                <div className="Grid_grid__container Grid_grid__container__margin" style={{ minHeight: "80vh" }}>
                    <ProjectDayMenu setOpenAction={setOpenAction} />
                    <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 7, 16, 7, 16)}>
                        <h3>Available Performers</h3>
                        {Object.entries(performersByRole).map(([roleName, performers]) => (
                            <div key={roleName} style={{ marginBottom: "1rem" }}>
                                <h3>{roleName}</h3>
                                <ul>
                                    {performers.map(p => (
                                        <li key={p.id}>{p.profile.firstName} {p.profile.lastName}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};


export default ProjectDay