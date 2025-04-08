import React from "react";
import "../../App.css";
import "./PerformerExplorerHeaderStats.css";
import {RoleType} from "../../types/ProductionDayType.tsx";

interface PerformerExplorerHeaderStatsProps {
    selectedRole: RoleType
    filters: string[]
    results: number
    selected: {
        union: number
        nonUnion: number
    }
}

const PerformerExplorerHeaderStats: React.FC<PerformerExplorerHeaderStatsProps> = ({selectedRole, filters, results, selected}) => {
    return (
        <>
            <div className="PerformerExplorerHeader__stats">
                <div className="PerformerExplorerHeaderStats__container">
                    <div className="PerformerExplorerHeaderStats__list-item">
                        <p className="PerformerExplorerHeaderStats__list-item-title">Role</p>
                        <p className="PerformerExplorerHeaderStats__list-item-value">{selectedRole.name}</p>
                    </div>
                    <div className="PerformerExplorerHeaderStats__list-item">
                        <p className="PerformerExplorerHeaderStats__list-item-title">Filters</p>
                        <p className="PerformerExplorerHeaderStats__list-item-value">{filters.join(", ")}</p>
                    </div>
                    <div className="PerformerExplorerHeaderStats__list-item">
                        <p className="PerformerExplorerHeaderStats__list-item-title">Selected</p>
                        <p className="PerformerExplorerHeaderStats__list-item-value">{selected.nonUnion + selected.union} ({selected.union} ACTRA)</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerformerExplorerHeaderStats