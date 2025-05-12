import React from "react";
import "../../App.css";
import "./ProjectList.css";
import { columnsStyle } from "../../shared/columnsStyle";
import { ProjectType } from "../../types/ProjectType";

interface ProjectListProps {
    projectList: ProjectType[];
    onProjectClick: (selectedProject: ProjectType) => void;
    children?: React.ReactNode;
}

const ProjectList: React.FC<ProjectListProps> = ({ projectList, onProjectClick, children }) => {
    return (
        <div className="ProjectGrid__project-grid">
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                    {children}
                    <div className="ProjectGrid__wrapper">
                        <div className="ProjectGrid__container">
                                {projectList.map((project: ProjectType, index: number) => (
                                    <button
                                        key={index}
                                        className={`ProjectGrid__button`}
                                        onClick={() => onProjectClick(project)}>
                                        <h3 className="ProjectList__title">{project.name}</h3>
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
