import React from "react";
import {useNavigate} from "react-router-dom";
import "./ProjectMenu.css";
import "../../App.css";
import MenuButton from "../Button/MenuButton.tsx";

const projectNavigation = [
    {
        title: "All projects",
        href: "/project/all"
    },
    {
        title: "Archived projects",
        href: "/project/archived"
    }
]

const ProjectMenu: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>

                <div className="ProjectMenu__container">
                    {projectNavigation.map((item) => (
                        <>
                            <div key={item.title} className="ProjectMenu__item" role={"button"} onClick={() => navigate(item.href)}>
                                <div className="ProjectMenu__cta" >
                                    <MenuButton title={item.title}/>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
        </>
    )}

export default ProjectMenu