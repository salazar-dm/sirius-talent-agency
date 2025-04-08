import React, {ReactNode, useEffect} from "react";
import "./ResultsListTabHeaders.css";
import "../../App.css";
import {CommonProps} from "../../props/Common.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface ResultsListTabHeadersProps extends CommonProps {
    children: {
        title: string
        carousel: ReactNode
    }[]
    selectedItem: {
        title: string
        carousel: ReactNode
    }
    onTabClick: (item: {title: string, carousel: ReactNode}) => void
}

const ResultsListTabHeaders: React.FC<ResultsListTabHeadersProps> = ({children, selectedItem, onTabClick}) => {
    const [isDesktop, setIsDesktop] = React.useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <>
            <div className="Grid_grid__item"
                 style={columnsStyle(1, 9, 1, 9, 6, 17, 7, 17)}>
                {isDesktop ? (
                    <div className="ResultList__tab-headers">
                        {children.map((item) => (
                            <>
                                <button
                                    className={`ResultList__tab-header-button ${selectedItem === item ? "ResultList__tab-header-button--active" : ""}`}
                                    onClick={() => onTabClick(item)}>
                                    <span className="ResultList__tab-header-button-text">{item.title}</span>
                                </button>
                            </>
                        ))}
                    </div>
                ) : (
                    <div className="ResultList__tab-headers">
                        <div className="ResultList__tab-headers-select-wrapper">
                            <select
                                value={selectedItem.title}
                                onChange={(e) => {
                                    const selectedItem = children.find((item) => item.title === e.target.value);
                                    if (selectedItem) {
                                        onTabClick(selectedItem);
                                    }
                                }}
                            >
                                {children.map((item) => (
                                    <option key={item.title} value={item.title}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ResultsListTabHeaders