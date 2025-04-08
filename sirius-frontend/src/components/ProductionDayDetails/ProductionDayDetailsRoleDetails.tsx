import React from "react";
import "../../App.css";
import "./ProductionDayDetailsRoleDetails.css";
import {RoleType} from "../../types/ProductionDayType.tsx";

interface ProductionDayDetailsRoleDetailsProps {
    children?: React.ReactNode
}

const ProductionDayDetailsRoleDetails: React.FC<ProductionDayDetailsRoleDetailsProps> = ({children}) => {

    return (
        <>
            <div className="ProductionDayDetailsRoleDetails__container">
                {children}
            </div>
        </>
    )
}

export default ProductionDayDetailsRoleDetails
