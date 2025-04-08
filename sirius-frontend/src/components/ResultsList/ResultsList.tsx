import React, {ReactNode, useEffect} from "react";
import "./ResultsList.css";
import "../../App.css";
import {CommonProps} from "../../props/Common.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import ResultsListTabHeaders from "./ResultsListTabHeaders.tsx";

interface ResultsListProps extends CommonProps {
    eyebrow: string
    title: string
    children: {
        title: string
        carousel: ReactNode
    }[]
}

const ResultsList: React.FC<ResultsListProps> = ({eyebrow, title, children}) => {
    const [selectedItem, setSelectedItem] = React.useState<ResultsListProps["children"][any]>(children[0]);

    const onTabClick = (item: ResultsListProps["children"][any]) => {
        console.log(item)
        setSelectedItem(item);
    }

    return (
        <>
                <div className="ResultList__result-list">
                    <div className="Grid_grid__container Grid_grid__container__margin">
                        <div className="Grid_grid__item"
                        style={columnsStyle(1, 9, 1, 9, 2, 5, 2, 7)}>
                            <div className="ResultList__eyebrow">{eyebrow}</div>
                            <h2 className="ResultList__title">{title}</h2>
                        </div>
                        <ResultsListTabHeaders children={children} selectedItem={selectedItem} onTabClick={onTabClick}/>
                    </div>
                    <div className="ResultList__tab-content-wrapper">
                        <div className="ResultList__tab-content">
                            <div className="ResultList__carousel-wrapper">
                                    {children.map((item) => (
                                        <div key={item.title}>
                                            {item === selectedItem && (
                                                item.carousel
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default ResultsList