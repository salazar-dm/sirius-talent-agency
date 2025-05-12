import React, {useEffect, useState} from "react";
import "./ProjectBreadcrumbMenu.css";
import "../../App.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export const ProjectBreadcrumbMenu: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [projectName, setProjectName] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectName = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/project/read/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProjectName(response.data.name);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch project name", error);
            }
        };

        if (id) {
            fetchProjectName();
        }
    }, [id]);

    return (
        <div className="BreadcrumbMenu__container">
            <span className="BreadcrumbMenu__previous" role={"button"} onClick={() => navigate(-1)}>Projects</span>
            <span className="BreadcrumbMenu__separator">{' > '}</span>
            <span className="BreadcrumbMenu__current">{projectName || "..."}</span>
        </div>
    );
};