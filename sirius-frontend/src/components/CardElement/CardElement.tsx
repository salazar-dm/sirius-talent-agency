import React, {ReactNode} from "react";
import "./CardElement.css";
import "../../App.css";
import {CommonProps} from "../../props/Common.tsx";

interface CardElementProps extends CommonProps {
    title: string
    children: ReactNode[]
    dividerTop?: boolean
    dividerBottom?: boolean
}

const CardElement: React.FC<CardElementProps> = ({title, children, dividerTop = true, dividerBottom = true}) => {
    return (
        <>
            <div className="CardElement__container">
                {dividerTop && <div className="CardElement__divider"/>}
                <h2 className="CardElement__title">{title}</h2>
                {children.map((item) => (
                    <div className="CardElement__item">{item}</div>
                ))}
                {dividerBottom && <div className="CardElement__divider"/>}
            </div>
        </>
    )
}

export default CardElement