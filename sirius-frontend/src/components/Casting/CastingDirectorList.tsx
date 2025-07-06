import React from "react";

import "../../App.css";
import "./CastingDirectorList.css"
import { columnsStyle } from "../../shared/columnsStyle";
import { CastingType } from "../../types/CastingType";
import SecondaryButton from "../Button/SecondaryButton.tsx";
import {useNavigate} from "react-router-dom";

interface CastingDirectorListProps {
    castingDirectors: CastingType[];
    onDirectorClick: (selectedDirector: CastingType) => void;
    children?: React.ReactNode;
}

const CastingDirectorList: React.FC<CastingDirectorListProps> = ({ castingDirectors, onDirectorClick, children }) => {
    const navigate = useNavigate();

    return (
        <div className="CastingGrid__project-grid">
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                    {children}
                    <div className="Grid_grid__container UserList__heading-container">
                        <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 1, 6, 1, 6)}>
                            <h2 className="UserList__heading">List of users</h2>
                        </div>
                        <div className="Grid_grid__item UserList__controls-container CastingDirectorList__controls-container" style={columnsStyle(1, 9, 1, 9, 14, 17, 14, 17)}>
                            <SecondaryButton text="Add new" onClick={() => navigate("/admin/casting-directors/create")}/>
                        </div>
                    </div>
                    <div className="CastingGrid__wrapper">
                        <div className="CastingGrid__container">
                            {castingDirectors.map((director, index) => (
                                <button
                                    key={index}
                                    className="CastingGrid__button"
                                    onClick={() => onDirectorClick(director)}>
                                    <h3 className="ProjectList__title">{director.email}</h3>
                                    <p className="ProjectList__subtitle">{director.tel}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CastingDirectorList;
