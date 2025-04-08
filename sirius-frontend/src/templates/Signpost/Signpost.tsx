import React from 'react';
import "C:/Users/traxler/training/sirius/src/App.css";
import "./Signpost.css"
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";

interface SignpostProps {
    itemLeft?: React.ReactNode;
    itemRight?: React.ReactNode;
    eyebrowItemLeft?: string;
    eyebrowItemRight?: string;
    titleItemLeft?: string;
    titleItemRight?: string;
    bodyItemLeft?: string;
    bodyItemRight?: string;
}


const Signpost: React.FC<SignpostProps> = ({ itemLeft, itemRight, eyebrowItemLeft, eyebrowItemRight, titleItemLeft, titleItemRight, bodyItemLeft, bodyItemRight }) => {
    const defaultLeft = (
        <>
            <div className="Signpost_signpost__left-container-default">
                <div className="Signpost_signpost__left-inner-container">
                    <p className="Signpost_signpost__left-eyebrow">{eyebrowItemLeft===undefined ? 'Lorem ipsum' : eyebrowItemLeft}</p>
                    <h3 className="Signpost_signpost__left-title">{titleItemLeft===undefined ? 'Lorem ipsum' : titleItemLeft}</h3>
                    <p className="Signpost_signpost__left-body">{bodyItemLeft===undefined ? 'Lorem ipsum dolor sit amet consectetur adipiscing elit sapien aenean sodales...' : bodyItemLeft}</p>
                </div>
            </div>

        </>
    )

    const defaultRight = (
        <>

        </>
    )

    return (
        <div className="Signpost_signpost">
            <div className="Grid_grid__container Grid_grid__container__margin"
            style={numberOfColumnsStyle(16)}>
                <div className="Grid_grid__item"
                style={columnsStyle(1, 9, 1, 9, 2, 8, 2, 8)}>
                    {itemLeft===undefined ? defaultLeft : itemLeft}
                </div>
                <div className="Grid_grid__item"
                style={columnsStyle(1, 9, 1, 9, 9, 16, 9, 15)}>
                    {itemRight===undefined ? defaultRight : itemRight}
                </div>
            </div>
        </div>
    );
};

export default Signpost;