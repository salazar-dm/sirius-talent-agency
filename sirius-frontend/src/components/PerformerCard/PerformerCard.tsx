import React, {useEffect} from "react";
import "./PerformerCard.css";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import {calculateAge} from "../../shared/calculateAge.tsx";
import {ModalSvg} from "../../assets/ModalSvg.tsx";

interface PerformerCardProps {
    performer: PerformerType
    onClick: Function
    isPerformerSelected: boolean
    onOpenProfileModal: Function
}

const PerformerCard: React.FC<PerformerCardProps> = ({performer, onClick, isPerformerSelected, onOpenProfileModal}) => {
    const profile = performer.profile
    console.log(performer.profile)

    return (
        <div className="PerformerCard__container">
            <div className="PerformerCard__image-container" role="button" onClick={() => onClick(performer)} aria-label={"Select performer"}>
                <img
                    className="PerformerCard__image"
                    src={performer.profile.keyName}
                    alt={"Image of performer: " + performer.profile.firstName + " " + performer.profile.lastName}
                />
            </div>
            <div
                className={`PerformerCard__details-container ${isPerformerSelected ? "PerformerCard__details-container--selected" : ""}`}>
                <div className="PerformerCard__row-details-container">
                    <div className="PerformerCard__row-details">
                        <p className="PerformerCard__label">Name</p>
                        <p className="PerformerCard__value">{profile.firstName} {profile.lastName}</p>
                    </div>
                    <div className="PerformerCard__row-details">
                        <p className="PerformerCard__label">Union</p>
                        <p className="PerformerCard__value">{profile.unionStatus}</p>
                    </div>
                    <div className="PerformerCard__row-details">
                        <p className="PerformerCard__label">Age</p>
                        <p className="PerformerCard__value">{calculateAge(profile.dateOfBirth) === 0 ? "" : calculateAge(profile.dateOfBirth)}</p>
                    </div>
                </div>
                <div className="PerformerCard__modal-button" onClick={() => onOpenProfileModal(performer)}
                     role={"button"}>
                    <span className="PerformerCard__modal-icon"><ModalSvg/></span>
                    <span className="PerformerCard__modal-text">Profile</span>
                </div>
            </div>
        </div>
    )
}

export default PerformerCard