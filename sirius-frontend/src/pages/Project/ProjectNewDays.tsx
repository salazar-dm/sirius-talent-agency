import React from "react";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {CreateProjectDayForm} from "../../components/CustomForms/CreateProjectDayForm.tsx";
import Uplink from "../../components/Uplink/Uplink.tsx";
import {useNavigate, useParams} from "react-router-dom";

export const ProjectNewDays: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 16, 2, 16)}>
                    <Uplink title={"Back to Project"} onClick={() => navigate(`/project/${id}`)}/>

                </div>
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 3, 15, 3, 15)}>
                    <CreateProjectDayForm/>
                </div>
            </div>
        </>
    )
}