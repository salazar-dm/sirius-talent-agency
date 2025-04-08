import React from "react";
import "./PerformerAttributes.css";
import "../../App.css";
import {CommonProps} from "../../props/Common.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {PerformerAttributesLabelMapping} from "../../types/PerformerAttributesLabelMapping.tsx";

interface PerformerAttributesProps extends CommonProps {
    data: any,
    children?: {label: string, value: string}[]
}

const PerformerAttributes: React.FC<PerformerAttributesProps> = ({data, children= transformProfileData(data)}) => {
    if (!children) return null

    return (
        <>
            {children.map((item) => (
            <div className="PerformerAttributes__wrapper">
                <div className="Grid_grid__container PerformerAttributes__grid-custom-cols">

                        <>
                            <div className="Grid_grid__item"
                            style={columnsStyle(1, 8, 1, 3, 1, 3, 1, 3)}>
                                <p className="PerformerAttributes__label">{item.label}</p>
                            </div>
                            <div className="Grid_grid__item"
                            style={columnsStyle(1, 8, 3, 8, 4, 8, 3, 8)}>
                                <p className="PerformerAttributes__value">{item.value}</p>
                            </div>
                        </>

                </div>
            </div>
            ))}
        </>
    )
}

const transformProfileData = (profile: any): PerformerAttributesProps["children"] => {
    const profileAttributes: PerformerAttributesProps["children"] = [];

    for (const key in profile) {
        if (profile.hasOwnProperty(key)) {
            if (!PerformerAttributesLabelMapping.hasOwnProperty(key)) {
                continue
            }

            const label = PerformerAttributesLabelMapping[key as keyof typeof PerformerAttributesLabelMapping] || key;
            let value = profile[key];

            if (typeof value === "boolean") {
                value = value ? "Yes" : "No";
            } else if (typeof value === "number") {
                value = value.toString();
            }

            profileAttributes.push({label, value});
        }
    }

    return profileAttributes;
}

export default PerformerAttributes