import React from "react";
import "./HeaderDetail.css";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";

interface HeaderDetailProps {
    form?: React.ReactNode;
    monogram?: React.ReactNode;
    title: string;
    body?: string;
}

const HeaderDetail : React.FC<HeaderDetailProps> = ({ form, monogram, title, body}) => {


    return (
        <>
            <div className="HeaderDetail__header-detail">
                <div className="Grid_grid__container Grid_grid__container__margin"
                style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 3, 9, 3, 9)}>
                        <div className="HeaderDetail__content-wrapper">
                            <h1 className="HeaderDetail__title">{title}</h1>
                            {body && <p className="HeaderDetail__body">{body}</p>}
                            {form}
                        </div>
                    </div>
                    <div className="Grid_grid__item Grid_grid__bleed-direction-right"
                         style={columnsStyle(1, 9, 1, 9, 10, 15, 10, 15)}>
                        <div className="HeaderDetail__svg-wrapper">
                            {monogram}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderDetail