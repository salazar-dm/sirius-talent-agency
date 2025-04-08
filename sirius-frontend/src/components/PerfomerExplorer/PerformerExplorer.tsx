import React, {useEffect} from "react";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import PerformerCard from "../PerformerCard/PerformerCard.tsx";
import {PerformerExplorerContainer} from "./PerformerExplorerContainer.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {PerformerExplorerPerformerList} from "./PerformerExplorerPerformerList.tsx";
import {ParticipantType, RoleType} from "../../types/ProductionDayType.tsx";
import {CustomModal} from "../Modal/CustomModal.tsx";
import PerformerProfile from "../PerformerProfile/PerformerProfile.tsx";
import ContentBlockWrapper from "../ContentBlockWrapper/ContentBlockWrapper.tsx";

interface PerformerExplorerProps {
    performerList: PerformerType[]
    participants: ParticipantType[]
    onSubmit: Function
    columns?: number
    selectedRole: RoleType
    onAddParticipant: Function
    onRemoveParticipant: Function
}

const PerformerExplorer: React.FC<PerformerExplorerProps> = ({performerList, participants, onSubmit, columns = 4, selectedRole, onAddParticipant, onRemoveParticipant}) => {
    const [selectedPerformers, setSelectedPerformers] = React.useState<PerformerType[]>([]);
    const [roleBasedPerformerList, setRoleBasedPerformerList] = React.useState<PerformerType[]>(performerList);
    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
    const [selectedPerformer, setSelectedPerformer] = React.useState<PerformerType>(performerList[0]);

    const onPerformerCardClick = (performer: PerformerType) => {
        const participant: ParticipantType = {
            id: performer.id,
            role: selectedRole.name,
            unionStatus: performer.profile.unionStatus.startsWith("ACTRA") ? "ACTRA" : "Non-Union",
            draftCallTime: null,
            finalCallTime: null,
            commissionPaid: false,
        }

        if (selectedPerformers.includes(performer)) {
            setSelectedPerformers((prevSelectedPerformers) => prevSelectedPerformers.filter((p) => p.id !== performer.id));
            onRemoveParticipant(participant);
        } else {
            setSelectedPerformers((prevSelectedPerformers) => [...prevSelectedPerformers, performer]);
            onAddParticipant(participant);
        }
    }

    const onOpenProfileModal = (performer: PerformerType) => {
        setIsProfileModalOpen(true);
        setSelectedPerformer(performer);
        document.body.classList.add('no-scroll')
        console.log("Modal opened")
    }

    useEffect(() => {
        setRoleBasedPerformerList(performerList.filter((performer) => !participants.some((participant) => participant.id === performer.id) || participants.some((participant) => participant.id === performer.id && participant.role === selectedRole.name)));
    }, [participants, selectedRole]);

    return (
        <>
            {selectedPerformer &&
                    <CustomModal isOpen={isProfileModalOpen}
                                 onClose={() => setIsProfileModalOpen(false)}>
                        <>
                            <ContentBlockWrapper>
                                <PerformerProfile performer={selectedPerformer}/>
                            </ContentBlockWrapper>
                        </>
                    </CustomModal>
            }

            <PerformerExplorerContainer>
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                    <PerformerExplorerPerformerList columns={columns}>
                        {roleBasedPerformerList.map((performer) => (
                                <PerformerCard
                                    performer={performer}
                                    onClick={onPerformerCardClick}
                                    isPerformerSelected={selectedPerformers.includes(performer)}
                                    onOpenProfileModal={onOpenProfileModal}
                                />
                        ))}
                    </PerformerExplorerPerformerList>
                </div>
            </PerformerExplorerContainer>
        </>
    )
}

export default PerformerExplorer