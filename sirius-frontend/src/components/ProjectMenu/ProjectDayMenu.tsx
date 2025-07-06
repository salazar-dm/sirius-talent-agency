import React, {useEffect, useRef, useState} from "react";
import "./ProjectDayMenu.css";
import "../../App.css";
import {ProjectDayAction} from "../../types/ProjectDayActions.ts";
import {columnsStyle} from "../../shared/columnsStyle.tsx";


interface ProjectDayMenuProps {
    setOpenAction: (action: ProjectDayAction | null) => void;
}

export const ProjectDayMenu: React.FC<ProjectDayMenuProps> = ({ setOpenAction }) => {
    const [projectDayNavigation, setProjectDayNavigation] = useState(projectDayNavigationDefault);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleItemClick = (action: ProjectDayAction) => setOpenAction(action);

    const toggleSection = (index: number) => {
        setProjectDayNavigation(prev =>
            prev.map((section, i) =>
                i === index ? { ...section, isOpen: !section.isOpen } : section
            )
        );
    };

    useEffect(() => {
        projectDayNavigation.forEach((section, index) => {
            const ref = sectionRefs.current[index];
            if (ref) ref.style.height = section.isOpen ? `${ref.scrollHeight}px` : "0px";
        });
    }, [projectDayNavigation]);

    return (

            <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 6, 2, 6)}>
                <div className="ProjectDayMenu__container">
                    {projectDayNavigation.map((section, index) => (
                        <div key={index} className="ProjectDayMenu__section">
                            <div
                                className="ProjectDayMenu__item-title"
                                onClick={() => toggleSection(index)}
                            >
                                {section.title}
                            </div>
                            <div
                                ref={el => sectionRefs.current[index] = el}
                                className={`ProjectDayMenu__item-list ${section.isOpen ? "ProjectDayMenu__item-list--open" : ""}`}
                                style={{ overflow: "hidden", transition: "height 0.4s ease", background: "white" }}
                            >
                                {section.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="ProjectDayMenu__item"
                                        onClick={() => handleItemClick(item.action)}
                                    >
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
};


interface ProjectDayMenuItem {
    label: string;
    action: ProjectDayAction;
}

interface ProjectDayMenuSection {
    title: string;
    isOpen: boolean;
    items: ProjectDayMenuItem[];
}

const projectDayNavigationDefault: ProjectDayMenuSection[] = [
    {
        title: "Manage Talent",
        isOpen: true,
        items: [
            {label: "Send Availability Check", action: "sendAvailabilityCheck"},
            {label: "Confirm Performers", action: "confirmPerformers"},
            {label: "Blacklist Performers", action: "blacklistPerformers"},
        ],
    },
    {
        title: "Forms & Documents",
        isOpen: true,
        items: [
            {label: "Create Call Sheet", action: "createCallSheet"},
            {label: "Create Fitting Sheet", action: "createFittingSheet"},
            {label: "Export Call Sheet", action: "exportCallSheet"},
            {label: "Export Fitting Sheet", action: "exportFittingSheet"},
            {label: "Export Full Performer List", action: "exportPerformerList"},
        ],
    },
    {
        title: "Communication",
        isOpen: true,
        items: [
            { label: "Mass Email", action: "massEmail" },
            { label: "Send Draft/Final Call Time", action: "sendCallTime" },
        ],
    },
    {
        title: "Settings",
        isOpen: true,
        items: [
            { label: "Edit Production Day Info", action: "editProductionDay" },
            { label: "Archive Production Day", action: "archiveProductionDay" },
            { label: "Delete Production Day", action: "deleteProductionDay" },
        ],
    },
];