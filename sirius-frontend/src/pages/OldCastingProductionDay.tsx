import React, {useEffect} from "react";
import {useFetchProductionDaysById} from "../hooks/useFetchProductionDaysById.tsx";
import {useParams} from "react-router-dom";
import {ProductionDayType} from "../types/ProductionDayType.tsx";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay.tsx";
import ProductionDayDetails from "../components/ProductionDayDetails/ProductionDayDetails.tsx";
import {useFetchPerformerListByListIds} from "../hooks/useFetchPerformerListByListIds.tsx";
import {useQueries, useQuery} from "react-query";
import {PerformerType} from "../types/PerformerType.tsx";
import {arrayDateToDateObject} from "../shared/arrayDateToDateObject.tsx";
import {columnsStyle} from "../shared/columnsStyle.tsx";
import HeaderDetailWrapper from "../components/HeaderDetailWrapper/HeaderDetailWrapper.tsx";
import HeaderHub from "../components/HeaderHub/HeaderHub.tsx";

const OldCastingProductionDay: React.FC = () => {
    const [productionDay, setProductionDay] = React.useState<ProductionDayType | null>(null);
    const [performerList, setPerformerList] = React.useState<PerformerType[] | null>(null);
    const { id } = useParams<{ id: string }>();

    const { data: productionDayData, isLoading: productionDayLoading, error: productionDayError } = useQuery(
        ['productionDay', id],
        () => useFetchProductionDaysById(id!),
        {
            enabled: !!id,
        }
    );

    const { data: performerListData, isLoading: performerListLoading } = useQuery(
        ['performers', productionDayData?.data.participants],
        () => useFetchPerformerListByListIds(productionDayData?.data.participants.map(p => p.id).filter(p => p !== null) || []),
        {
            enabled: !!productionDayData?.data.participants && productionDayData?.data.participants.map(p => p.id).length > 0,
        }
    );

    useEffect(() => {
        if (productionDayData?.data) {
            setProductionDay(productionDayData.data);
            console.log(productionDayData.data.participants.map(p => p.id) + " participants")
        }
    }, [productionDayData]);

    useEffect(() => {
        if (performerListData?.data) {
            setPerformerList(performerListData.data);
        }
    }, [performerListData]);

    if (productionDayLoading || performerListLoading) return <LoadingOverlay/>

    return (
        <>
            {productionDay && performerList &&
                <>
                    <HeaderHub title="Day details"/>
                    <div className="Grid_grid__container">
                        <div className="Grid_grid__item"
                             style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                            <ProductionDayDetails productionDay={productionDay} performerList={performerList}
                                                  dates={[arrayDateToDateObject(productionDay.date)]}/>
                        </div>
                    </div>
                </>

            }
        </>
    )
}

export default OldCastingProductionDay