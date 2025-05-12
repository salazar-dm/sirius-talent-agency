import React from "react";


interface ProjectDayActionModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode
}

export const ProjectDayActionModal: React.FC<ProjectDayActionModalProps> = ({title, onClose, children}) => {

    return (
        <>
                <div className="ProjectDayActionModal__body">
                    {children}
                </div>
        </>
    )
}