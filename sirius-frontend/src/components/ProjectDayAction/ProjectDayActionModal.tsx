import React, {useEffect} from "react";
import "../../App.css"
import "./ProjectDayActionModal.css"
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import Uplink from "../Uplink/Uplink.tsx";
import {useNavigate} from "react-router-dom";

interface ProjectDayActionModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode
}

export const ProjectDayActionModal: React.FC<ProjectDayActionModalProps> = ({title, onClose, children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const el = document.querySelector(".ProductionDay__container");
        if (el) el.classList.add("no-display");
        return () => {
            if (el) el.classList.remove("no-display");
        };
    }, []);


    return (
        <>
            <div className="ProjectDayActionModal__container">
                <div className="Grid_grid__container Grid_grid__container__margin">
                    <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 16, 2, 16)}>
                        <div className="ProjectDayActionModal__menu">
                            <Uplink onClick={onClose} title={"Project day"}/>
                        </div>
                    </div>
                </div>
                <div className="ProjectDayActionModal__body">
                    {children}
                </div>
            </div>
        </>
    )
}