import React from "react";
import "../../App.css";
import axios from "axios";
import ProductionList from "./ProductionList.tsx";
import {useQuery} from "react-query";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.tsx";
import ProductionType, {ProductionDayType} from "../../types/ProductionDayType.tsx";
import Production from "./Production.tsx";
import useFetchProductionList from "../../hooks/useFetchProductionList.tsx";
import ProductionListNavigation from "./ProductionListNavigation.tsx";
import AddNewProduction from "./AddNewProduction.tsx";
import Search from "../Search/Search.tsx";
import {SearchByProductionDayName} from "../Search/SearchByProductionDayName.tsx";
import Filter from "../Filter/Filter.tsx";
import {FilterByLastProductionDayStatus} from "../Filter/FilterByLastProductionDayStatus.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {SearchByProductionDayDate} from "../Search/SearchByProductionDayDate.tsx";
import {FilterByProductionDayStatus} from "../Filter/FilterByProductionDayStatus.tsx";

const ProductionDayExplorer: React.FC = () => {
    const [productionList, setProductionList] = React.useState<ProductionType[]>([]);
    const [modifiedProductionList, setModifiedProductionList] = React.useState<ProductionType[] | null>(null);
    const [selectedProduction, setSelectedProduction] = React.useState<ProductionType | null>(null);
    const [modifiedSelectedProduction, setModifiedSelectedProduction] = React.useState<ProductionType | null>(null);
    const [transition, setTransition] = React.useState<boolean>(false);

    const filterCriteriaList: string[] = Array.from(new Set(productionList.map((production: ProductionType) => production[0].status)))

    const { data, isLoading, error} = useFetchProductionList()

    React.useEffect(() => {
        if (data) {
            setProductionList(data);
        }

        setTransition(false);
    }, [data, selectedProduction])

    const onProductionListClick = (selectedProduction: ProductionType) => {
        setTransition(true);
        setTimeout(() => {
            setSelectedProduction(selectedProduction);
        }, 300)
    };

    const onProductionBack = () => {
        setTransition(true);
        setTimeout(() => {
            setSelectedProduction(null);
            setModifiedSelectedProduction(null);
        }, 300)
    }

    const onSearch = (productionList: ProductionType[]) => {
        setModifiedProductionList(productionList);
    }

    const onProductionSearch = (productionDayList: ProductionDayType[]) => {
        setModifiedSelectedProduction(productionDayList)
    }


    if (isLoading) {
        return <LoadingOverlay/>;
    }

    return (
        <>
            <AddNewProduction/>
            {selectedProduction ?
                (
                    <>
                        <ProductionListNavigation>
                            <div className="Grid_grid__container">
                                <div className="Grid_grid__item"
                                     style={columnsStyle(1, 9, 1, 9, 1, 8, 1, 8)}>
                                    <Search searchKey="ProductionDaySearch"
                                            input={selectedProduction}
                                            searchAlgorithm={SearchByProductionDayDate}
                                            onSearch={(selectedProduction) => onProductionSearch(selectedProduction)}
                                            placeholder="Search by date"/>
                                </div>
                                <div className="Grid_grid__item"
                                     style={columnsStyle(1, 9, 1, 9, 10, 17, 10, 17)}>
                                    <Filter filterKey="ProductionDayFilter"
                                            input={selectedProduction}
                                            filterAlgorithm={FilterByProductionDayStatus}
                                            onFilter={(selectedProduction) => onProductionSearch(selectedProduction)}
                                            criteriaList={filterCriteriaList}
                                            placeholder="Filter by status"/>
                                </div>
                            </div>
                        </ProductionListNavigation>
                        <Production selectedProduction={modifiedSelectedProduction ? modifiedSelectedProduction : selectedProduction}
                                    onBack={() => onProductionBack()}
                                    triggerComponentChange={transition}/>
                    </>
                ) : (
                    <>
                        <ProductionListNavigation>
                            <div className="Grid_grid__container">
                                <div className="Grid_grid__item"
                                     style={columnsStyle(1, 9, 1, 9, 1, 8, 1, 8)}>
                                    <Search key="ProductionListSearch"
                                            input={productionList}
                                            searchAlgorithm={SearchByProductionDayName}
                                            onSearch={(productionList) => onSearch(productionList)}
                                            placeholder="Search by production name"/>
                                </div>
                                <div className="Grid_grid__item"
                                     style={columnsStyle(1, 9, 1, 9, 10, 17, 10, 17)}>
                                    <Filter key="ProductionListFilter"
                                            input={productionList}
                                            filterAlgorithm={FilterByLastProductionDayStatus}
                                            onFilter={(productionList) => onSearch(productionList)}
                                            criteriaList={filterCriteriaList}
                                            placeholder="Filter by last day status"/>
                                </div>
                            </div>
                        </ProductionListNavigation>
                        <ProductionList
                            productionList={modifiedProductionList ? modifiedProductionList : productionList}
                            onProductionListClick={onProductionListClick}
                            triggerComponentChange={transition}>
                        </ProductionList>
                    </>
                )
            }
        </>
    )
}

export default ProductionDayExplorer