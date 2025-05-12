import React from "react";
import {ProjectDayType} from "../../types/ProjectDayType.ts";
import {formatToMonthDay} from "../../shared/formatToMonthDay.ts";
import "./ProjectDayList.css";
import {FolderSvg} from "../../assets/FolderSvg.tsx";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";

interface ProjectDayListProps {
    projectDays: ProjectDayType[];
    onClick: (day: ProjectDayType) => void;
}

export const ProjectDayList: React.FC<ProjectDayListProps> = ({projectDays, onClick}) => {
    return (
        <>
            {projectDays.map((day) => (
                <>
                    <div className="ProjectDayList__item" onClick={() => onClick(day)}>
                        <div className="ProjectDayList__item-title">
                            {day.dates.map(d => formatToMonthDay(d)).join(", ")}
                        </div>
                        <div className="MenuButton__body-link">
                            <a>
                                <span className="MenuButton__body-link-icon">
                                    <span className="MenuButton__body-link-icon-slide">
                                        <ArrowSvg/><ArrowSvg/>
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>
                </>
            ))}
        </>
    )
}