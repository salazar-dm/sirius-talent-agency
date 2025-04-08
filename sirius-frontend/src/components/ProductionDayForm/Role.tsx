import React from "react";
import {RoleType} from "../../types/ProductionDayType.tsx";
import "./Role.css";
import "../../App.css";
import {CloseSvg} from "../../assets/CloseSvg.tsx";

interface RoleProps {
    role: RoleType;
    index: number;
    onDelete: (role: RoleType) => void;
}

const Role: React.FC<RoleProps> = ({role, index, onDelete}) => {

    return (
        <div key={index} className="Role__container">
            <div className="Role__title">
                <div className="Role__name">{role.name}:</div>
                <div className="Role__max">{role.max}</div>
            </div>
            <button className="Role__delete-button" onClick={() => onDelete(role)}>
                <CloseSvg/>
            </button>
        </div>
    )
}

export default Role;