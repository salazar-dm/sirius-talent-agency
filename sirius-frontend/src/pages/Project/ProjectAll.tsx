import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProjectType } from "../../types/ProjectType.tsx";
import {useNavigate} from "react-router-dom";
import ProjectList from "../../components/ProjectList/ProjectList.tsx";

const ProjectAll: React.FC = () => {
    const [projectList, setProjectList] = useState<ProjectType[]>([]);
    const navigate = useNavigate();

    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/project/read/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProjectList(response.data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            navigate(`/project/${selectedProject.id}`)
        }
    }, [selectedProject]);

    return (
        <ProjectList projectList={projectList} onProjectClick={(project: ProjectType) => setSelectedProject(project)} />
    );
};

export default ProjectAll;
