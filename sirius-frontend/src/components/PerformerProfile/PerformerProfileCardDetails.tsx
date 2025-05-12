import React from "react";
import "./PerformerProfileCardDetails.css";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import {calculateAge} from "../../shared/calculateAge.tsx";
import {LocalUserType} from "../../types/LocalUserType.tsx";

interface PerformerProfileCardDetailsProps {
    performer: LocalUserType
    onUpdateClick?: () => void
}

const PerformerProfileCardDetails: React.FC<PerformerProfileCardDetailsProps> = ({performer, onUpdateClick}) => {
    const id = performer.id

    const rowDetailsData = [
        {label: "Email", value: performer.email},
        {label: "Phone", value: performer.tel},
        {label: "Age", value: calculateAge(performer.profile.dateOfBirth)},
    ]

    return (
        <>
            <div className="Performer__profile-card-details-container">
                <div>
                    <h3 className="Performer__full-name">{performer.profile.firstName} {performer.profile.lastName}</h3>
                    <p className="Performer__union-status">{performer.profile.unionStatus}</p>
                </div>
                <div className="Performer__row-details-container">
                    <div className="Performer__row-details">
                        <p className="Performer__label">Email</p>
                        <p className="Performer__value">{performer.email}</p>
                    </div>
                    <div className="Performer__row-details">
                        <p className="Performer__label">Phone</p>
                        <p className="Performer__value">{performer.tel}</p>
                    </div>
                    <div className="Performer__row-details">
                        <p className="Performer__label">Age</p>
                        <p className="Performer__value">{calculateAge(performer.profile.dateOfBirth) === 0 ? "0" : calculateAge(performer.profile.dateOfBirth)}</p>
                    </div>
                </div>
                <div className="Performer__row-details">
                    <div className="Performer__buttons-container">
                        <div className="Performer__row-item-with-divider">
                            <div className="Performer__button" role="button" onClick={onUpdateClick}>
                                            <span className="">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"
                                                     viewBox="0 0 20 21" fill="none">
                                                    <path d="M10 11.5L5 6.5L15 6.5L10 11.5Z" fill="#DDF1EE"></path>
                                                    <path d="M2 15L18 15" stroke="#DDF1EE" strokeWidth="2"></path>
                                                </svg>
                                            </span>
                                <span className="Performer__button-text">Update</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerformerProfileCardDetails