import React from "react";
import "./PerformerProfileDetails.css";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";

interface PerformerProfileDetailsProps {
    performer: PerformerType
}

export const PerformerProfileDetails: React.FC<PerformerProfileDetailsProps> = ({performer}) => {
    const profileDetails = [
        {label: "City", value: performer.profile.city},
        {label: "Self Drive", value: performer.profile.selfDrive ? "Yes" : "No"},
        {label: "Gender", value: performer.profile.gender},
        {label: "Ethnicity", value: performer.profile.ethnicity},
        {label: "Height", value: performer.profile.sizeHeight},
        {label: "Weight", value: performer.profile.sizeWeight},
        {label: "Chest", value: performer.profile.sizeChest},
        {label: "Waist", value: performer.profile.sizeWaist},
        {label: "Hips", value: performer.profile.sizeHips},
        {label: "Shoe", value: performer.profile.sizeShoe},
        {label: "Inseam", value: performer.profile.sizeInseam},
        {label: "Sleeve", value: performer.profile.sizeSleeve},
        {label: "Neck", value: performer.profile.sizeNeck},
        {label: "Hat", value: performer.profile.sizeHat},
    ]

    return (
        <>
            <div className="PerformerProfileDetails__container">
                {profileDetails.map((item) => (
                    <>
                        <div key={item.label} className="PerformerProfileDetails__inline-block half-width">
                            <span className="PerformerProfileDetails__label">{item.label}</span>
                            <span className="PerformerProfileDetails__value">{item.value}</span>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}