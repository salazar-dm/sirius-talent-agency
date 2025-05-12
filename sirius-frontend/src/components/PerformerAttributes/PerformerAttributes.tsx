import React from "react";
import "./PerformerAttributes.css";
import "../../App.css";
import { CommonProps } from "../../props/Common.tsx";
import { columnsStyle } from "../../shared/columnsStyle.tsx";
import { PerformerAttributesLabelMapping } from "../../types/PerformerAttributesLabelMapping.tsx";
import {parseCmToHeight} from "../../shared/parseCmToHeight.tsx";

interface PerformerAttributesProps extends CommonProps {
    data: any;
    children?: { label: string; value: string }[];
}

const PerformerAttributes: React.FC<PerformerAttributesProps> = ({ data, children }) => {
    if (!data) return null;

    const attributes = children || transformProfileData(data);

    if (!attributes) return null;

    return (
        <>
            {attributes.map((item, index) => (
                <div key={"attr" + index} className="PerformerAttributes__wrapper">
                    <div className="Grid_grid__container PerformerAttributes__grid-custom-cols">
                        <div className="Grid_grid__item" style={columnsStyle(1, 8, 1, 3, 1, 3, 1, 3)}>
                            <p className="PerformerAttributes__label">{item.label}</p>
                        </div>
                        <div className="Grid_grid__item" style={columnsStyle(1, 8, 3, 8, 4, 8, 3, 8)}>
                            <p className="PerformerAttributes__value">{item.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export const transformProfileData = (profile: any): PerformerAttributesProps["children"] => {
    const profileAttributes: PerformerAttributesProps["children"] = [];

    const gender = profile.gender;
    const unionStatus = profile.unionStatus;

    const shouldIncludeField = (key: string): boolean => {
        if (key === "unionId") {
            return ["AABP", "ACTRA Apprentice", "ACTRA Full"].includes(unionStatus);
        }

        const femaleFields = ["sizeDress", "sizeBustCup", "sizeBustBand"];
        const maleFields = ["sizeJacket", "sizeSleeve", "sizeNeck", "sizeHat"];

        if (femaleFields.includes(key)) {
            return ["female", "non-binary-female"].includes(gender);
        }

        if (maleFields.includes(key)) {
            return ["male", "non-binary-male"].includes(gender);
        }

        return true;
    };

    const formatValue = (key: string, value: any): string => {
        if (typeof value === "boolean") {
            return value ? "Yes" : "No";
        }

        if (typeof value === "number") {
            if (key === "sizeHeight") {
                return parseCmToHeight(value);
            }
            return value.toString();
        }

        if (typeof value === "string") {
            if (value === "non-binary-female" || value === "non-binary-male") {
                return "Non Binary";
            }

            if (key === "socialInsuranceNumber") {
                const digits = value.replace(/\D/g, "").slice(0, 9);
                return digits.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
            }

            if (key === "emergencyTel" || key === "guardianTel") {
                const digits = value.toString().replace(/\D/g, "");
                const normalized = digits.length === 10 ? "1" + digits : digits; // если юзер ввёл без 1
                return normalized.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
            }

            if (key === "sizeDress") {
                return value;
            }

            return value
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }

        return String(value);
    };


    for (const key in profile) {
        if (!Object.prototype.hasOwnProperty.call(profile, key)) continue;
        if (!Object.prototype.hasOwnProperty.call(PerformerAttributesLabelMapping, key)) continue;
        if (!shouldIncludeField(key)) continue;

        const label =
            PerformerAttributesLabelMapping[key as keyof typeof PerformerAttributesLabelMapping] || key;

        const formattedValue = formatValue(key, profile[key]);

        profileAttributes.push({ label, value: formattedValue });
    }

    return profileAttributes;
};


export default PerformerAttributes;
