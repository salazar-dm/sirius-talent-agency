import React from "react";
import "./HeaderHub.css"
import "../../App.css"
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import Spacer from "../Spacer/Spacer.tsx";

interface HeaderHubProps {
    title: string
    text?: string
    children?: React.ReactNode
    uplink?: React.ReactNode
}

const HeaderHub: React.FC<HeaderHubProps> = ({title, text, children, uplink}) => {
    const textElement = <p className="HeaderHub__text">{text}</p>

    return (
        <div className="HeaderHub__header-hub">
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item"
                     style={columnsStyle(1, 9, 1, 9, 3, 8, 3, 8)}>
                    {uplink ? uplink : null}
                    <div className="HeaderHub__title-container">
                        <h1 className="HeaderHub__title">{title}</h1>
                        {children ? <Spacer/> : null}
                        {children && text ? <p className="HeaderHub__text">{text}</p> : null}
                    </div>
                </div>
                {text ? (
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 10, 16, 10, 16)}>
                        {children ? children : <p className="HeaderHub__text">{text}</p>}
                    </div>) :
                    null
                }

            </div>
        </div>
    )
}

export default HeaderHub