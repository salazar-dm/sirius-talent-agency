import React from "react";
import "../../App.css";
import "./ProductionDayDetail.css";

interface ProductionDayDetailProps {
    key: string
    label: string
    value: string | number | boolean
    className?: string
}

const ProductionDayDetail: React.FC<ProductionDayDetailProps> = ({key, label, value, className}) => {
    return (
        <div key={key} className={`ProductionDayDetail__container ${className}`}>
            <h4 className="ProductionDayDetail__label">{label}</h4>
            <p className="ProductionDayDetail__value">{value}</p>
        </div>
    )
}

export default ProductionDayDetail