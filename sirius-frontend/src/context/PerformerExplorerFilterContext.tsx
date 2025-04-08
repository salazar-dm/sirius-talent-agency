import React from "react";
import {PerformerFilterCriteria} from "../types/FilterCriteria.tsx";

interface PerformerExplorerFilterContextProps {
    filterCriteria: PerformerFilterCriteria;
    onFilterChange: (filterCriteria: PerformerFilterCriteria) => void;
}

export const PerformerExplorerFilterContext = React.createContext<PerformerExplorerFilterContextProps>({
    filterCriteria: {} as PerformerFilterCriteria,
    onFilterChange: (filterCriteria: PerformerFilterCriteria) => {},
})

export const usePerformerExplorerFilterContext = (): [PerformerFilterCriteria, (filterCriteria: PerformerFilterCriteria) => void] => {
    const ctx = React.useContext(PerformerExplorerFilterContext);

    if (!ctx) {
        throw new Error("usePerformerExplorerFilterContext must be used within a PerformerExplorerFilterContextProvider");
    }

    return [ctx.filterCriteria, ctx.onFilterChange];
};