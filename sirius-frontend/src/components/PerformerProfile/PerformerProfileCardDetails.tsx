import React from "react";
import "./PerformerProfileCardDetails.css";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import {calculateAge} from "../../shared/calculateAge.tsx";

interface PerformerProfileCardDetailsProps {
    performer: PerformerType
}

const PerformerProfileCardDetails: React.FC<PerformerProfileCardDetailsProps> = ({performer}) => {
    const rowDetailsData = [
        {label: "Email", value: performer.email},
        {label: "Phone", value: performer.tel},
        {label: "Age", value: calculateAge(performer.profile.dateOfBirth)},
    ]

    return (
        <>
            <div className="PerformerProfileCardDetails__container">
                <h3 className="PerformerProfileCardDetails__full-name">{performer.profile.firstName} {performer.profile.lastName}</h3>
                <p className="PerformerProfileCardDetails__union-status">{performer.profile.unionStatus}</p>
                <div className="PerformerProfileCardDetails__row-details-container">
                    {rowDetailsData.map((row) => (
                        <div key={row.label} className="PerformerProfileCardDetails__row-details">
                            <p className="PerformerProfileCardDetails__label">{row.label}</p>
                            <p className="PerformerProfileCardDetails__value">{row.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PerformerProfileCardDetails