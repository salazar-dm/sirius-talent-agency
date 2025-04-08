import React from "react";
import "./FilterDropdown.css";
import "../../App.css";

interface FilterDropdownProps {
    children: React.ReactNode
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({children}) => {

    return (
        <>
            <div className="Filter__dropdown-scrollable">
                {children}
            </div>
        </>
    )
}

export default FilterDropdown

