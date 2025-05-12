import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {ProjectDayMenu} from "../../components/ProjectMenu/ProjectDayMenu.tsx";

const ProjectDay: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { dayId } = useParams<{ dayId: string }>();
    const navigate = useNavigate();


    return (
        <>
            <div className="Grid_grid__container Grid_grid__container__margin" style={{minHeight: "80vh"}}>
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 6, 2, 6)}>
                    <ProjectDayMenu/>
                </div>
            </div>
        </>
    )
}

export default ProjectDay