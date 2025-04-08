import React from 'react';
import './PageProgressContainer.css';
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import ContentBlockWrapper from "../ContentBlockWrapper/ContentBlockWrapper.tsx";

interface PageProgressContainerProps {
    isOpen: boolean
    children: React.ReactNode
}

export const PageProgressContainer: React.FC<PageProgressContainerProps> = ({isOpen, children}) => {
    return (
        <>
            <div className={`PageProgressContainer__page-progress-container ${isOpen ? "PageProgressContainer__page-progress-container--open" : ""}`}>
                    <div className="Grid_grid__container Grid_grid__container__margin PageProgressContainer__grid-container">
                        <div className="Grid_grid__item PageProgressContainer__grid-item"
                        style={columnsStyle(1, 9, 1, 9, 2, 17, 2, 17)}>
                            {children}
                        </div>
                    </div>
            </div>
        </>
    )
}