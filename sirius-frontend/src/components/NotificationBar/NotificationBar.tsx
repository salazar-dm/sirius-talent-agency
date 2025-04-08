import React from "react";
import "./NotificationBar.css";
import "../../App.css";

type NotificationBarProps = {
    children: {title: string, text: string}
}

const NotificationBar: React.FC<NotificationBarProps> = ({children}) => {
    return (
        <>
            <div className="NotificationBar__notification-bar">
                <span className="NotificationBar__title">{children.title}</span>
                <div className="NotificationBar__text">{children.text}</div>
            </div>
        </>
    )
}

export default NotificationBar