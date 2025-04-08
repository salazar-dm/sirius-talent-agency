import React from "react";
import "../../App.css";
import "./RoleSelector.css";
import {RoleType} from "../../types/ProductionDayType.tsx";
import SecondaryButton from "../Button/SecondaryButton.tsx";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";

interface RoleSelectorProps {
    roles: RoleType[]
    selectedRole: RoleType
    onSelect: Function
}

const RoleSelector: React.FC<RoleSelectorProps> = ({roles, selectedRole, onSelect}) => {

    return (
        <div className="RoleSelector__container">
            {roles.map((role) => (
                <>
                    <button key={role.name}
                            className={`RoleSelector__button ${role.name === selectedRole.name ? "RoleSelector__button--active" : ""}`}
                            onClick={() => onSelect(role)}>
                        <span className="RoleSelector__button-text">{role.name}</span>
                    </button>
                </>
            ))}
        </div>
    )
}

export default RoleSelector