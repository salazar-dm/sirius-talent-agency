import React from "react";
import './PageProgressControls.css';
import DesktopNavigationHiddenSandwichButton from "../Header/DesktopNavigationHiddenSandwichButton.tsx";

export const PageProgressControls: React.FC = () => {
    return (
        <>
            <div className="PageProgressControls__wrapper">
                <div className="PageProgressControls__left"></div>
                <div className="PageProgressControls__right">
                    <DesktopNavigationHiddenSandwichButton/>
                </div>
            </div>
        </>
    )
}