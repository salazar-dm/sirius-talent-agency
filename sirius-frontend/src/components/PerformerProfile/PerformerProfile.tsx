import React from "react";
import "./PerformerProfileContainer.css";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {PerformerProfileContainer} from "./PerformerProfileContainer.tsx";
import {PerformerProfileCard} from "./PerformerProfileCard.tsx";
import {PerformerProfileDetails} from "./PerformerProfileDetails.tsx";

interface PerformerProfileProps {
    performer: PerformerType
}

const PerformerProfile: React.FC<PerformerProfileProps> = ({performer}) => {
    return (
        <PerformerProfileContainer>
            <div className="Grid_grid__item"
                 style={columnsStyle(2, 9, 2, 9, 2, 7, 2, 7)}>
                <PerformerProfileCard performer={performer} isSticky={true}/>
            </div>
            <div className="Grid_grid__item"
            style={columnsStyle(2, 9, 2, 9, 8, 16, 8, 16)}>
                <PerformerProfileDetails performer={performer}/>
            </div>
        </PerformerProfileContainer>
    )
}

export default PerformerProfile