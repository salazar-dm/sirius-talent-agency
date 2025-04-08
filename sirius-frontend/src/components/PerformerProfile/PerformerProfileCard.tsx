import React, {useEffect} from "react";
import "./PerformerProfileCard.css";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import PerformerProfileCardDetails from "./PerformerProfileCardDetails.tsx";

interface PerformerProfileCardProps {
    performer: PerformerType
    isSticky: boolean
}

export const PerformerProfileCard: React.FC<PerformerProfileCardProps> = ({performer, isSticky}) => {
    React.useEffect(() => {
        console.log(performer.userActivated)
    })

    return (
        <>
            <div className={`PerformerProfileCard__container ${isSticky ? "PerformerProfileCard__container--sticky" : ""}`}>
                <div className="PerformerProfileCard__image-container">
                    {performer.userActivated && <img src={performer.profile.keyName} alt={performer.profile.firstName + " " + performer.profile.lastName}/>}
                </div>
                <PerformerProfileCardDetails performer={performer}/>
            </div>
        </>
    )
}