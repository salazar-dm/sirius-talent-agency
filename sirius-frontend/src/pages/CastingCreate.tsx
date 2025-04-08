import React, {useEffect} from "react";
import useFetchPerformerList from "../hooks/useFetchPerformerList.tsx";
import {PerformerType} from "../types/PerformerType.tsx";
import HeaderHub from "../components/HeaderHub/HeaderHub.tsx";
import ModeSelector from "../components/ModeSelector/ModeSelector.tsx";
import ContentBlockWrapper from "../components/ContentBlockWrapper/ContentBlockWrapper.tsx";
import RichText from "../components/RichText/RichText.tsx";
import RichTextTypes from "../types/RichTextTypes.tsx";
import {ParticipantType, ProductionDayType, RoleType} from "../types/ProductionDayType.tsx";
import ProductionDayForm from "../components/ProductionDayForm/ProductionDayForm.tsx";
import {DateObject} from "react-multi-date-picker";
import ProductionDayRolesForm from "../components/ProductionDayForm/ProductionDayRolesForm.tsx";
import PerformerExplorer from "../components/PerfomerExplorer/PerformerExplorer.tsx";
import PerformerExplorerHeader from "../components/PerformerExplorerHeader/PerformerExplorerHeader.tsx";
import PrimaryButton from "../components/Button/PrimaryButton.tsx";
import CastingCreateProductionDay from "../components/CastingCreateProductionDay/CastingCreateProductionDay.tsx";
import {useGetPerformerMinMax} from "../hooks/useGetPerformerMinMax.tsx";


const CastingCreate: React.FC = () => {
    const [phase, setPhase] = React.useState(1);
    const [performerList, setPerformerList] = React.useState<PerformerType[] | null>(null);
    const [filteredPerformerList, setFilteredPerformerList] = React.useState<PerformerType[]>([]);
    const [productionDay, setProductionDay] = React.useState<Partial<ProductionDayType>>({});
    const [mode, setMode] = React.useState("Automatic");
    const [selectedDates, setSelectedDates] = React.useState<DateObject[]>([]);
    const [selectedRole, setSelectedRole] = React.useState<RoleType>({} as RoleType);
    const [globalError, setGlobalError] = React.useState<string | null>(null);
    const [performerMinValues, setPerformerMinValues] = React.useState<{[key: string]: number}>({});
    const [performerMaxValues, setPerformerMaxValues] = React.useState<{[key: string]: number}>({});

    const [dummyPerformerList, setDummyPerformerList] = React.useState<PerformerType[]>([]);

    const { data, isLoading, error} = useFetchPerformerList();

    const formatDates = (dates: DateObject[]) => dates.map((date) => [date.year, date.month.index + 1, date.day]);

    useEffect(() => {
        if (data) {
            setPerformerList(data);
            setFilteredPerformerList(data);

            console.log(data);

            const [minValues, maxValues] = useGetPerformerMinMax(data);
            setPerformerMinValues(minValues);
            setPerformerMaxValues(maxValues);

            console.log(minValues, maxValues);
        }

        if (data) {
            const duplicatedData = [].concat(...Array(40).fill(data));
            setDummyPerformerList(duplicatedData);
        }
    }, [data]);

    const onModeSelect = (mode: string) => {
        setMode(mode);
        onNextPhase();
    }

    const onProductionDayFormSubmit = (productionDay: Partial<ProductionDayType>, dates: DateObject[]) => {
        updateProductionDay(productionDay);
        updateDates(dates);
        onNextPhase();
    }

    const onProductionDayRolesFormSubmit = (productionDay: Partial<ProductionDayType>) => {
        updateProductionDay(productionDay);
        if (productionDay.roles) {
            setSelectedRole(productionDay.roles[0]);
        } else {
            setGlobalError("Select at least one role");
        }
        onNextPhase();
    }

    const onAddParticipant = (participant: ParticipantType) => {
        setProductionDay((prevProductionDay) => ({
            ...prevProductionDay,
            participants: [
                ...(prevProductionDay.participants || []),
                participant,
            ],
        }));
    }

    const onRemoveParticipant = (participant: ParticipantType) => {
        setProductionDay((prevProductionDay) => ({
            ...prevProductionDay,
            participants: (prevProductionDay.participants || []).filter((p) => p.id !== participant.id),
        }));
    }

    const updateProductionDay = (productionDay: Partial<ProductionDayType> = {}) => {
        setProductionDay((prevProductionDay) => ({...prevProductionDay, ...productionDay}));
    };

    const updateDates = (dates: DateObject[] = []) => {
        setSelectedDates(dates);
    };

    const onNextPhase = () => {
        setPhase((prevPhase) => prevPhase + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <ContentBlockWrapper>
            {error && (
                <div className="CastingCreate__error">
                    {globalError}
                </div>
            )}
            {phase === 1 && (
                <>
                    <HeaderHub
                        title="Booking mode"
                        text="On this step you can select whether you want to book automatically or manually"/>
                    <ModeSelector
                        onModeClick={onModeSelect}
                        modeList={[
                            {
                                title: "Automatic",
                                description:
                                    <RichText>
                                        <ul>
                                            <li>select the performers in minutes</li>
                                            <li>get the availability quickly</li>
                                            <li>perfect for crowd scene days</li>
                                        </ul>
                                        <p>Read about the <a href="/casting/booking-mode">automatic selection process</a></p>
                                    </RichText>,
                            },
                            {
                                title: "Hand-picked",
                                description: "I want to book manually.",
                            },
                        ]}
                    />
                </>
            )}

            {phase === 2 && (
                <>
                    <HeaderHub
                        title="Day details"
                        text="Please complete the form about the details of the upcoming day"/>
                    <ProductionDayForm
                        productionDay={productionDay}
                        onProductionDaySubmit={onProductionDayFormSubmit}
                    />
                </>
            )}

            {phase === 3 && (
                <>
                    <HeaderHub
                        title="Assign roles"
                        text="Please assign roles for the future performers selection"/>
                    <ProductionDayRolesForm
                        productionDay={productionDay}
                        onProductionDayRolesSubmit={onProductionDayRolesFormSubmit}
                    />
                </>
            )}

            {phase === 4 && performerList && (
                <>
                    <HeaderHub
                        title="Select performers"
                        text="Click on the image of performers you want to book. Apply filters if needed"/>
                    <PerformerExplorerHeader
                        performerList={performerList}
                        filteredPerformerList={filteredPerformerList}
                        roles={productionDay.roles || []}
                        selectedRole={selectedRole}
                        onFilterSubmit={setFilteredPerformerList}
                        onSelectRole={setSelectedRole}
                        productionDay={productionDay}
                        minValues={performerMinValues}
                        maxValues={performerMaxValues}
                    />
                    <PerformerExplorer
                        performerList={filteredPerformerList}
                        participants={productionDay.participants ? productionDay.participants : []}
                        onSubmit={onNextPhase}
                        selectedRole={selectedRole}
                        onAddParticipant={onAddParticipant}
                        onRemoveParticipant={onRemoveParticipant}
                    />
                    <PrimaryButton
                        onClick={onNextPhase}
                        text="Next"
                    />
                </>
            )}

            {phase === 5 && (
                <>
                    <HeaderHub
                        title="Ask availability"
                        text="Please check all the details and confirm the performers list to ask for their availability"/>
                    <CastingCreateProductionDay
                        productionDay={productionDay}
                        performerList={performerList || []}
                        onConfirm={() => {}}
                        dates={selectedDates}
                    />
                </>
            )}
            <>
            </>
        </ContentBlockWrapper>
    )
}

export default CastingCreate