import React, {useEffect} from "react";
import "../../App.css";
import "./RoleData.css";

interface RoleDataProps {
    name: string
    max: number
    selectedUnionPerformers?: number
    selectedNonUnionPerformers?: number
    availablePerformers?: number
}

const RoleData: React.FC<RoleDataProps> = ({name, max, selectedUnionPerformers, selectedNonUnionPerformers, availablePerformers}) => {
    const totalPerformers = selectedUnionPerformers !== undefined && selectedNonUnionPerformers !== undefined ? selectedUnionPerformers + selectedNonUnionPerformers : undefined



    useEffect(() => {
        console.log(selectedUnionPerformers, selectedNonUnionPerformers, totalPerformers)
    }, [name]);

    return (
        <>
            <div className="RoleData__container">
                <h4 className="RoleData__title">{name}</h4>
                <div className="RoleData__list-item">
                    <div className="RoleData__label">ACTRA</div>
                    <div className="RoleData__value">{selectedUnionPerformers}</div>
                </div>
                <div className="RoleData__list-item">
                    <div className="RoleData__label">NU/AABP</div>
                    <div className="RoleData__value">{selectedNonUnionPerformers}</div>
                </div>
                <div className="RoleData__list-item">
                    <div className="RoleData__label">Total</div>
                    <div className="RoleData__value">{totalPerformers} / {max}</div>
                </div>
            </div>
        </>
    )
}

export default RoleData