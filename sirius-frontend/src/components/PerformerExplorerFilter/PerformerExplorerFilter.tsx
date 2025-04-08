import React from "react";
import {PerformerType} from "../../types/PerformerType.tsx";
import {PerformerFilterCriteria} from "../../types/FilterCriteria.tsx";
import {DropdownSvg} from "../../assets/DropdownSvg.tsx";
import {PerformerExplorerFilterContext} from "../../context/PerformerExplorerFilterContext.tsx";
import {usePerformerFilter} from "../../hooks/usePerformerFilter.tsx";
import {ClearButton} from "../Button/ClearButton.tsx";
import "./PerformerExplorerFitler.css";
import "../../App.css";

interface PerformerExplorerFilterProps {
    performerList: PerformerType[],
    children?: React.ReactNode,
    onSubmit: (performerList: PerformerType[]) => void
    onUpdateFilterCriteria: (filterCriteria: PerformerFilterCriteria) => void
}

const PerformerExplorerFilter: React.FC<PerformerExplorerFilterProps> = ({performerList, children, onSubmit, onUpdateFilterCriteria}) => {
    const [filterCriteria, setFilterCriteria] = React.useState<PerformerFilterCriteria>({});
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const onFilterChange = (filterCriteria: PerformerFilterCriteria) => {
        setFilterCriteria(filterCriteria);
        onSubmit(usePerformerFilter(performerList, filterCriteria))
        onUpdateFilterCriteria(filterCriteria);
    }

    const onFilterClear = () => {
        setFilterCriteria({} as PerformerFilterCriteria);
        onSubmit(usePerformerFilter(performerList, {}))
        onUpdateFilterCriteria({} as PerformerFilterCriteria);
    }

    return (
        <PerformerExplorerFilterContext.Provider value={{filterCriteria, onFilterChange: onFilterChange}}>
            <div className="PerformerExplorerFilter__container">
                <div className="PerformerExplorerFilter__open-button-container">
                    <div className="PerformerExplorerFilter__open-button" onClick={() => setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen)}>
                        <p className="PerformerExplorerFilter__open-button-text">Filter</p>
                        <DropdownSvg/>
                    </div>
                </div>
                <div className={`PerformerExplorerFilter__dropdown ${isDropdownOpen ? "PerformerExplorerFilter__dropdown--open" : ""}`}>
                    <div className="PerformerExplorerFilter__criteria-scrollable">
                        {children && children}
                    </div>
                    <div className="PerformerExplorerFilter__clear-button-container">
                        <ClearButton onClick={onFilterClear} text="Clear  filter"/>
                    </div>
                </div>
            </div>
        </PerformerExplorerFilterContext.Provider>
    )
}

export default PerformerExplorerFilter