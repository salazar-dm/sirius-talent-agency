import React from "react";
import "./PerformerProfileContainer.css";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {PerformerProfileContainer} from "./PerformerProfileContainer.tsx";
import {PerformerProfileCard} from "./PerformerProfileCard.tsx";
import {PerformerProfileDetails} from "./PerformerProfileDetails.tsx";
import {LocalUserType} from "../../types/LocalUserType.tsx";

interface PerformerProfileProps {
    performer: LocalUserType
    onUpdateClick?: () => void
}

const PerformerProfile: React.FC<PerformerProfileProps> = ({performer, onUpdateClick}) => {
    return (
        <PerformerProfileContainer>
            <div className="Grid_grid__item"
                 style={columnsStyle(2, 9, 2, 9, 2, 7, 2, 7)}>
                <PerformerProfileCard performer={performer} isSticky={true} onUpdateClick={onUpdateClick}/>
            </div>
            <div className="Grid_grid__item"
            style={columnsStyle(2, 9, 2, 9, 8, 16, 8, 16)}>
                <PerformerProfileDetails profile={performer.profile}/>
            </div>
        </PerformerProfileContainer>
    )
}

export default PerformerProfile