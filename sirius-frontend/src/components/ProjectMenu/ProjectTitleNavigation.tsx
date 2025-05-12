import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./ProjectTitleNavigation.css";
import "../../App.css";
import {ProjectBreadcrumbMenu} from "./ProjectBreadcrumbMenu.tsx";
import SecondaryButton from "../Button/SecondaryButton.tsx";

export const ProjectTitleNavigation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    return (
        <div className="ProjectTitleNavigation__container">
            <ProjectBreadcrumbMenu/>
            <SecondaryButton text="Add new days" onClick={() => navigate(`/project/${id}/new-days`)}/>
        </div>
    )
}