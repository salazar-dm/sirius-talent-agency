import React, {useEffect, useState} from "react";
import "./CreateProjectForm.css";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {emptyProject, ProjectType} from "../../types/ProjectType.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const CreateProjectForm: React.FC = () => {
    const { castingId } = useParams<{ castingId: string }>();
    const [project, setProject] = useState<ProjectType>(emptyProject);
    const navigate = useNavigate();

    useEffect(() => {
        if (castingId) {
            setProject(prev => ({ ...prev, castingId }));
        }
    }, [castingId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { id, ...projectData } = project;

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/project/create/${castingId}`, projectData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            localStorage.setItem("token", response.data.token);

            const createdProjectId = response.data.id;
            navigate(`/project/${createdProjectId}`);
        } catch (err) {
            console.error("Failed to create project:", err);
        }
    };

    return (
        <>
            <div className="Grid_grid__container Grid_grid__item">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 7, 11, 7, 11)}>
                    <div className="CreateProjectForm__container">
                        <h3 className="CreateProjectForm__title">Create a new project</h3>
                        <form onSubmit={handleSubmit}>
                            <p>
                                <input
                                    placeholder={"Project name"}
                                    type="text"
                                    value={project.name}
                                    onChange={(e) => setProject({...project, name: e.target.value})}
                                />
                            </p>

                            <PrimaryButton text="Create" type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProjectForm