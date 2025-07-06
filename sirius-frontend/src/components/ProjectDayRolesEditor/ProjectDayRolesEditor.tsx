import React, { useState } from "react";
import { ProjectRoleType } from "../../types/ProjectRoleType.ts";
import SecondaryButton from "../Button/SecondaryButton.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import "./ProjectDayRolesEditor.css"

interface ProjectDayRolesEditorProps {
    roles: ProjectRoleType[];
    setRoles: (roles: ProjectRoleType[]) => void;
}

export const ProjectDayRolesEditor: React.FC<ProjectDayRolesEditorProps> = ({ roles, setRoles }) => {
    const [newRoleName, setNewRoleName] = useState("");
    const [newQuota, setNewQuota] = useState(1);

    const handleAddRole = () => {
        if (!newRoleName.trim()) return;

        setRoles([
            ...roles,
            {
                name: newRoleName.trim(),
                quota: newQuota,
                availablePerformers: [],
                confirmedPerformers: []
            }
        ]);

        setNewRoleName("");
        setNewQuota(1);
    };

    return (
        <div className={"ProjectDayRolesEditor__container"}>
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 16, 2, 16)}>
                    {roles.map((role, index) => (
                        <div key={index} className={"ProjectDayRolesEditor__added-role-list"}>
                            <h3>{role.name}: {role.quota}</h3>
                        </div>
                    ))}

                    <div className={"ProjectDayRolesEditor__role-list"}>
                        <div>
                            <input
                            type="text"
                            placeholder="Role name"
                            value={newRoleName}
                            onChange={e => setNewRoleName(e.target.value)}
                        /></div>

                        <div>
                        <input
                            type="number"
                            min={1}
                            placeholder="Quota"
                            value={newQuota}
                            onChange={e => setNewQuota(parseInt(e.target.value))}
                        />
                        </div>

                    </div>
                    <SecondaryButton text="Add role" onClick={handleAddRole} />
                </div>
            </div>

        </div>
    );
};
