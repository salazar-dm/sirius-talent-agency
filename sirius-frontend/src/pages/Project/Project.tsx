import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Uplink from "../../components/Uplink/Uplink.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import ProjectList from "../../components/ProjectList/ProjectList.tsx";
import ProjectMenu from "../../components/ProjectMenu/ProjectMenu.tsx";
import {ProjectBreadcrumbMenu} from "../../components/ProjectMenu/ProjectBreadcrumbMenu.tsx";
import SecondaryButton from "../../components/Button/SecondaryButton.tsx";
import {ProjectTitleNavigation} from "../../components/ProjectMenu/ProjectTitleNavigation.tsx";
import {fetchProjectDays} from "../../fetch/fetchProjectDays.ts";
import {ProjectDayType} from "../../types/ProjectDayType.ts";
import {ProjectDayList} from "../../components/ProjectDayList/ProjectDayList.tsx";

export const Project: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = React.useState<ProjectDayType | null>(null);

    const [projectDays, setProjectDays] = React.useState<ProjectDayType[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || !id) return;

        const loadDays = async () => {
            const days = await fetchProjectDays(id, token);
            setProjectDays(days);
        };

        loadDays();
    }, [id]);

    useEffect(() => {
        if (!selectedDay) return;
        navigate(`/project/${id}/day/${selectedDay.id}`);
    }, [selectedDay]);


    return (
        <>
            <div className="Grid_grid__container Grid_grid__container__margin" style={{minHeight: "80vh"}}>
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 6, 2, 6)}>
                    <ProjectMenu/>
                </div>
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 9, 7, 7, 16, 7, 16)}>
                    <div className="Grid_grid__container">
                        <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 1, 17, 1, 17)}>
                            <ProjectTitleNavigation/>
                        </div>
                        <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 1, 17, 1, 17)}>
                            <ProjectDayList projectDays={projectDays} onClick={(day) => setSelectedDay(day)}/>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}