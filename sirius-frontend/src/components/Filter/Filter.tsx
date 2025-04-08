import React, {useEffect} from "react";
import "../../App.css";
import {DropdownSvg} from "../../assets/DropdownSvg.tsx";
import FilterDropdown from "./FilterDropdown.tsx";
import FilterDropdownLine from "./FilterDropdownLine.tsx";
import "./Filter.css";

interface FilterProps {
    filterKey?: string
    input: any,
    filterAlgorithm: (list: any, criteriaList: any) => any,
    placeholder: string
    onFilter: (list: any) => void
    criteriaList: string[]
}

const Filter: React.FC<FilterProps> = ({filterKey, input, filterAlgorithm, placeholder, onFilter, criteriaList}) => {
    const [selectedCriteriaList, setSelectedCriteriaList] = React.useState<string[]>([]);
    const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false);

    useEffect(() => {
        onFilter(filterAlgorithm(input, selectedCriteriaList));
    }, [selectedCriteriaList]);

    const onCriteriaClick = (criteria: string) => {
        if (selectedCriteriaList.includes(criteria)) {
            setSelectedCriteriaList(selectedCriteriaList.filter((selectedCriteria) => selectedCriteria !== criteria));
        } else {
            setSelectedCriteriaList([...criteriaList, criteria]);
        }
    }

    return (
        <>
            <div key={filterKey? filterKey : 'filter'} className="Filter__wrapper">
                <div className="Filter__filter">
                    <div className="Filter__heading" role="button" onClick={() => setDropdownOpen(!isDropdownOpen)}>
                        <span className="Filter__placeholder">{placeholder}</span>
                        <DropdownSvg/>
                    </div>
                    <div className={`Filter__dropdown ${isDropdownOpen ? 'Filter__dropdown--open' : ''}`}>
                        <FilterDropdown>
                            {criteriaList.map((criteria) => (
                                <FilterDropdownLine text={criteria}
                                                    isLineSelected={selectedCriteriaList.includes(criteria)}
                                                    onCriteriaClick={onCriteriaClick}/>
                            ))}
                        </FilterDropdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter