import React from "react";
import "./Uplink.css";
import "../../App.css";
import {UplinkSvg} from "../../assets/UplinkSvg.tsx";

interface UplinkProps {
    onClick?: () => void
    href?: string
    title: string
}

const Uplink: React.FC<UplinkProps> = ({onClick, href, title}) => {
    return (
        <>
            <div className="Uplink__uplink">
                <span className="Uplink__icon">
                    <UplinkSvg/>
                </span>
                {href && (<a href={href} title={title}>{title}</a>)}
                {onClick && (<button onClick={onClick}>{title}</button>)}
            </div>
        </>
    )
}

export default Uplink