import React, {ReactNode} from "react";
import './ModeSelector.css'
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import TitleButton from "../Button/TitleButton.tsx";

interface ModeSelectorProps {
    modeList: {title: string, icon?: ReactNode, description: ReactNode | string}[];
    onModeClick: (mode: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({modeList, onModeClick}) => {

    return (
        <>
            <div className="ModeSelector__mode-selector">
                <div className="Grid_grid__container">
                    <div className="Grid_grid__item"
                    style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                        <div className="ModeSelector__container">
                            {modeList.map((mode) => (
                                    <div key={mode.title} className="ModeSelector__item">
                                        <div className="ModeSelector__icon">{mode.icon}</div>
                                        <div className="ModeSelector__title">
                                            <TitleButton title={mode.title} onClick={() => onModeClick(mode.title)}/>
                                        </div>
                                        <div className="ModeSelector__description">{mode.description}</div>
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModeSelector