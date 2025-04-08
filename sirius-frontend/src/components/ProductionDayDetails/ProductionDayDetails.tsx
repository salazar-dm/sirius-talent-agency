import React, {useEffect} from "react";
import "../../App.css";
import "./ProductionDayDetails.css";
import {ProductionDayType, RoleType} from "../../types/ProductionDayType.tsx";
import {PerformerType} from "../../types/PerformerType.tsx";
import PerformerCard from "../PerformerCard/PerformerCard.tsx";
import RoleSelector from "../RoleSelector/RoleSelector.tsx";
import {ProductionDayDetailsCardContainer} from "./ProductionDayDetailsCardContainer.tsx";
import {countPerformersByUnionStatus} from "../../shared/countPerformersByUnionStatus.tsx";
import ProductionDayDetailsRoleDetails from "./ProductionDayDetailsRoleDetails.tsx";
import RoleData from "../Role/RoleData.tsx";
import ProductionDayDetailsGeneral from "./ProductionDayDetailsGeneral.tsx";
import {DateObject} from "react-multi-date-picker";
import {Divider} from "../Divider/Divider.tsx";
import {CustomModal} from "../Modal/CustomModal.tsx";
import ContentBlockWrapper from "../ContentBlockWrapper/ContentBlockWrapper.tsx";
import PerformerProfile from "../PerformerProfile/PerformerProfile.tsx";

interface ProductionDayDetailsProps {
    productionDay: Partial<ProductionDayType>
    performerList: PerformerType[]
    dates: DateObject[]
}

const ProductionDayDetails: React.FC<ProductionDayDetailsProps> = ({productionDay, performerList, dates}) => {
    if (!performerList) {
        //TODO: fetch performer list from ids of participants
        return null
    }

    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
    const [selectedPerformer, setSelectedPerformer] = React.useState<PerformerType>(performerList[0]);

    const [roleBasedPerformerList, setRoleBasedPerformerList] = React.useState<PerformerType[]>(performerList || []);
    const [selectedRole, setSelectedRole] = React.useState<RoleType>(productionDay.roles ? productionDay.roles[0] : {} as RoleType);

    const onOpenProfileModal = (performer: PerformerType) => {
        setIsProfileModalOpen(true);
        setSelectedPerformer(performer);
        document.body.classList.add('no-scroll')
    }

    useEffect(() => {
        setRoleBasedPerformerList(performerList.filter((performer) => productionDay.participants?.some((participant) =>
            participant.role === selectedRole.name && participant.id === performer.id
        )));
    }, [performerList, selectedRole]);

    return (
        <div>
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
            <ProductionDayDetailsGeneral
                productionDay={productionDay}
                dates={dates ? dates : undefined}
            />
            <Divider/>
            <ProductionDayDetailsRoleDetails>
                <RoleSelector
                    selectedRole={selectedRole}
                    onSelect={setSelectedRole}
                    roles={productionDay.roles || []}
                />
                <RoleData
                    name={selectedRole.name}
                    max={selectedRole.max}
                    selectedUnionPerformers={countPerformersByUnionStatus(roleBasedPerformerList).union}
                    selectedNonUnionPerformers={countPerformersByUnionStatus(roleBasedPerformerList).nonUnion}
                />
            </ProductionDayDetailsRoleDetails>
            <ProductionDayDetailsCardContainer>
                {roleBasedPerformerList.map((performer) => (
                    <PerformerCard key={performer.id} performer={performer} onClick={() => {}} isPerformerSelected={false} onOpenProfileModal={onOpenProfileModal}/>
                ))}
            </ProductionDayDetailsCardContainer>
            <Divider/>
        </div>
    );

}

export default ProductionDayDetails