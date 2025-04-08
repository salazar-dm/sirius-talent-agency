import React from "react";
import "./AddNewProduction.css";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";

const AddNewProduction: React.FC = () => {
    return (
        <div>
            <div className="AddNewProduction__container">
                <div className="Grid_grid__container">
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 2, 17, 2, 17)}>
                        <div className="AddNewProduction__add-new-production">
                            <h3 className="AddNewProduction__title">Add new</h3>
                            <div className="Grid_grid__container">
                                <div className="Grid_grid__item"
                                     style={columnsStyle(1, 9, 1, 9, 1, 13, 1, 13)}>
                                    <a href="/casting/create" className="AddNewProduction__button">
                                        <div className="AddNewProduction__subtitle">Book the new day</div>
                                        <div className="AddNewProduction__icon">
                                            <div className="AddNewProduction__icon-slide">
                                                <ArrowSvg/>
                                                <ArrowSvg/>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewProduction