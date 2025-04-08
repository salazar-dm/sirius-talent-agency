import React from "react";
import "../../App.css";
import "./FilterDropdownLine.css";
import {CheckSvg} from "../../assets/CheckSvg.tsx";

interface FilterDropdownLineProps {
    text: string
    isLineSelected: boolean
    onCriteriaClick: (criteria: string) => void
}

const FilterDropdownLine: React.FC<FilterDropdownLineProps> = ({text, isLineSelected, onCriteriaClick}) => {
    const handleClick = () => {
        onCriteriaClick(text)
    }

    return (
        <>
            <div className="Filter__dropdown-line" onClick={handleClick} role="button">
                <span className="Filter__dropdown-line-checkbox">{isLineSelected ? <CheckSvg/> : null}</span>
                <span className="Filter__dropdown-line-text">{text}</span>
            </div>
        </>
    )
}

export default FilterDropdownLine