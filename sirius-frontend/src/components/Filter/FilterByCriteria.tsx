import React, {useEffect} from "react";
import "./FilterByCriteria.css";
import "../../App.css";
import { PerformerFilterCriteria } from "../../types/FilterCriteria";
import {DropdownSvg} from "../../assets/DropdownSvg.tsx";
import {
    PerformerExplorerFilterContext,
    usePerformerExplorerFilterContext
} from "../../context/PerformerExplorerFilterContext.tsx";
import {InputRange} from "../CustomInputs/InputRange.tsx";
import {InputSelectMultiple} from "../CustomInputs/InputSelectMultiple.tsx";

interface FilterByRangeProps {
    criteriaKey: string,
    title: string
    id?: string
    borders?: {min: number, max: number}
    options?: string[]
    onClear?: () => void
}

export const FilterByCriteria: React.FC<FilterByRangeProps> = ({criteriaKey, title, id, borders, options, onClear}) => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [filterCriteria, onFilterChange]: [PerformerFilterCriteria, (filterCriteria: PerformerFilterCriteria) => void] = usePerformerExplorerFilterContext();

    useEffect(() => {
        console.log("FilterByCriteria: ", filterCriteria)
    }, [filterCriteria]);

    return (
        <>
            <div id={id} className="FilterCriteria__filter-criteria">
                <div className="FilterByCriteria__container">
                    <div className="FilterByCriteria__open-button-container">
                        <button className="FilterByCriteria__open-button"
                                onClick={() => setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen)}>
                            <p className="FilterByCriteria__open-button-text">{title}</p>
                            <DropdownSvg/>
                        </button>
                    </div>
                    <div className={`FilterByCriteria__dropdown ${isDropdownOpen ? "FilterByCriteria__dropdown--open" : ""}`}>
                        {borders &&
                            <InputRange borders={borders ? borders : {min: 0, max: 100}}
                                        onChange={(value) => onFilterChange({...filterCriteria, [criteriaKey]: value})}
                                        onClear={() => {
                                            const updatedCriteria = { ...filterCriteria };
                                            delete updatedCriteria[criteriaKey];
                                            onFilterChange(updatedCriteria);
                                        }}/>
                        }
                        {options &&
                            <InputSelectMultiple options={options}
                                                 onChange={(value) => onFilterChange({...filterCriteria, [criteriaKey]: value})}
                                                 onClear={() => {
                                                     const updatedCriteria = { ...filterCriteria };
                                                     delete updatedCriteria[criteriaKey];
                                                     onFilterChange(updatedCriteria);
                                                 }}/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}