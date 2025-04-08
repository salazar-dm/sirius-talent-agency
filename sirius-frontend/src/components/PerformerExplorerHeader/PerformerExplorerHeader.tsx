import React, {useEffect} from "react";
import "../../App.css";
import "./PerformerExplorerHeader.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import {ProductionDayType, RoleType} from "../../types/ProductionDayType.tsx";
import {DateObject} from "react-multi-date-picker";
import {PerformerExplorerHeaderContainer} from "./PerformerExplorerHeaderContainer.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import PerformerExplorerFilter from "../PerformerExplorerFilter/PerformerExplorerFilter.tsx";
import {FilterByCriteria} from "../Filter/FilterByCriteria.tsx";
import RoleSelector from "../RoleSelector/RoleSelector.tsx";
import {PerformerFilterCriteria} from "../../types/FilterCriteria.tsx";
import {normalizePerformerFilterCriteria} from "../../shared/normalizeFilterCriteria.tsx";
import PerformerExplorerHeaderStats from "./PerformerExplorerHeaderStats.tsx";

interface PerformerExplorerHeaderProps {
    performerList: PerformerType[]
    filteredPerformerList: PerformerType[]
    roles: RoleType[]
    selectedRole: RoleType
    onFilterSubmit: (performerList: PerformerType[]) => void
    onSelectRole: (role: RoleType) => void
    productionDay: Partial<ProductionDayType>
    minValues?: {[key: string]: number}
    maxValues?: {[key: string]: number}
}

interface ParticipantUnionStatusCounter {
    union: number
    nonUnion: number
}

const PerformerExplorerHeader: React.FC<PerformerExplorerHeaderProps> = ({performerList, filteredPerformerList, roles, selectedRole, onFilterSubmit, onSelectRole, productionDay, maxValues, minValues}) => {
    const [currentFilterCriteria, setCurrentFilterCriteria] = React.useState<PerformerFilterCriteria>({});
    const [counter, setCounter] = React.useState<ParticipantUnionStatusCounter>({union: 0, nonUnion: 0});

    useEffect(() => {
        setCounter({
            union: productionDay.participants?.filter((participant) => participant.unionStatus.startsWith("ACTRA")).length || 0,
            nonUnion: productionDay.participants?.filter((participant) => !participant.unionStatus.startsWith("ACTRA")).length || 0
        })
    }, [productionDay]);

    return (
        <PerformerExplorerHeaderContainer>
            <RoleSelector
                roles={roles}
                selectedRole={selectedRole}
                onSelect={onSelectRole}
            />
            <PerformerExplorerFilter
                performerList={performerList}
                onSubmit={onFilterSubmit}
                onUpdateFilterCriteria={setCurrentFilterCriteria}
            >
                <FilterByCriteria id="filterByDateOfBirth" criteriaKey="dateOfBirth" title="Age" borders={{
                    min: minValues?.["dateOfBirth"] ?? 0,
                    max: maxValues?.["dateOfBirth"] ?? 100
                }}/>
                <FilterByCriteria id="filterByUnionStatus" criteriaKey="unionStatus" title="Union Status" options={["ACTRA Full", "ACTRA Apprentice", "AABP", "Non-Union"]}/>
                <FilterByCriteria id="filterByHeight" criteriaKey="sizeHeight" title="Height" borders={{
                    min: minValues?.["sizeHeight"] ?? 0,
                    max: maxValues?.["sizeHeight"] ?? 100
                }}/>
                <FilterByCriteria id="filterByHairColor" criteriaKey="hairColor" title="Hair color" options={["Black", "Blonde", "Brown", "Gray", "Red", "White"]}/>
                <FilterByCriteria id="filterByEyeColor" criteriaKey="eyeColor" title="Eye color" options={["Blue", "Brown", "Green", "Gray", "Hazel"]}/>
                <FilterByCriteria id="filterBySizeChest" criteriaKey="sizeChest" title="Chest" borders={{
                    min: minValues?.["sizeChest"] ?? 0,
                    max: maxValues?.["sizeChest"] ?? 100
                }}/>
                <FilterByCriteria id="filterBySizeWaist" criteriaKey="sizeWaist" title="Waist" borders={{
                    min: minValues?.["sizeWaist"] ?? 0,
                    max: maxValues?.["sizeWaist"] ?? 100
                }}/>
                <FilterByCriteria id="filterBySizeHips" criteriaKey="sizeHips" title="Hips" borders={{
                    min: minValues?.["sizeHips"] ?? 0,
                    max: maxValues?.["sizeHips"] ?? 100
                }}/>
                <FilterByCriteria id="filterBySizeShoe" criteriaKey="sizeShoe" title="Shoe" borders={{
                    min: minValues?.["sizeShoe"] ?? 0,
                    max: maxValues?.["sizeShoe"] ?? 100
                }}/>
                <FilterByCriteria id="filterBySizeInseam" criteriaKey="sizeInseam" title="Inseam" borders={{
                    min: minValues?.["sizeInseam"] ?? 0,
                    max: maxValues?.["sizeInseam"] ?? 100
                }}/>
                <FilterByCriteria id="filterBySizeSleeve" criteriaKey="sizeSleeve" title="Sleeve" borders={{
                    min: minValues?.["sizeSleeve"] ?? 0,
                    max: maxValues?.["sizeSleeve"] ?? 100
                }}/>
                <FilterByCriteria id="filterBySizeNeck" criteriaKey="sizeNeck" title="Neck" borders={{
                    min: minValues?.["sizeNeck"] ?? 0,
                    max: maxValues?.["sizeNeck"] ?? 100
                }}/>
                <FilterByCriteria id="filterBySizeHat" criteriaKey="sizeHat" title="Hat" borders={{
                    min: minValues?.["sizeHat"] ?? 0,
                    max: maxValues?.["sizeHat"] ?? 100
                }}/>
            </PerformerExplorerFilter>
            <PerformerExplorerHeaderStats
                selectedRole={selectedRole}
                filters={Object.keys(normalizePerformerFilterCriteria(currentFilterCriteria))}
                results={filteredPerformerList.length}
                selected={counter}
            />
        </PerformerExplorerHeaderContainer>
    )
}

export default PerformerExplorerHeader