import React from "react";
import "./Signpost.css"
import "../../App.css"
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface SignpostProps {
    title: string
    eyebrow?: string
    text: string
    children: React.ReactNode
    uplink?: React.ReactNode
}

const Signpost : React.FC<SignpostProps> = ({title, eyebrow, text, children, uplink}) => {

    return (
        <>
            <div className="Signpost__container">
                <div className="Grid_grid__container">
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 2, 8, 2, 8)}>
                        <div className="Signpost__signpost">
                            <div className="Signpost__inner-container">
                                {uplink ? uplink : null}
                                {eyebrow ? <p className="Signpost__eyebrow">{eyebrow}</p> : null}
                                <h3 className="Signpost__title">{title}</h3>
                                <p className="Signpost__text">{text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="Grid_grid__item"
                        style={columnsStyle(1, 9, 1, 9, 9, 16, 9, 16)}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signpost