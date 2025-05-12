import React from "react";
import "./PerformerProfileDetails.css";
import "../../App.css";
import {PerformerProfileType} from "../../types/PerformerProfileType";
import {transformProfileData} from "../PerformerAttributes/PerformerAttributes.tsx";

interface PerformerProfileDetailsProps {
    profile: PerformerProfileType;
}

export const PerformerProfileDetails: React.FC<PerformerProfileDetailsProps> = ({profile}) => {
    const attributes = transformProfileData(profile);

    if (!attributes) return null;

    return (
        <div className="PerformerProfileDetails__container">
            {attributes.map((item, index) => (
                <div key={index} className="PerformerProfileDetails__inline-block half-width">
                    <span className="PerformerProfileDetails__label">{item.label}</span>
                    <span className="PerformerProfileDetails__value">{item.value ?? "N/A"}</span>
                </div>
            ))}
        </div>
    );
};
