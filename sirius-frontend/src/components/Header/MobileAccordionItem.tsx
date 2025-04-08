import React, {useEffect} from "react";
import "./MobileAccordionItem.css";
import "../../App.css";
import {NavigationItemCategory} from "../../types/NavigationItem.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";

interface MobileAccordionItemProps {
    isAccordionOpen: boolean;
    selectedNavigationCategory: NavigationItemCategory;
    onAccordionClose: (selectedNavigationCategory: NavigationItemCategory, isAccordionOpen: boolean) => void;
}

const MobileAccordionItem: React.FC<MobileAccordionItemProps> = ({isAccordionOpen, selectedNavigationCategory, onAccordionClose}) => {

    const handleAccordionClose = (selectedNavigationCategory: NavigationItemCategory, isAccordionOpen: boolean) => {
        onAccordionClose(selectedNavigationCategory, isAccordionOpen);
    }

    return (
        <>
            <div className={`MobileAccordionItem__drawer ${isAccordionOpen ? "MobileAccordionItem__drawer--open" : ""}`}>
                <div className="MobileAccordionItem__button-back">
                    <div className="Grid_grid__container">
                        <div className="Grid_grid__item"
                        style={columnsStyle(1, 9, 1, 9, 1, 17, 1, 17)}>
                            <button className="SecondaryButton__secondary-button"
                            onClick={() => handleAccordionClose(selectedNavigationCategory, false)}
                            >
                                <span className="SecondaryButton__icon-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                                        <path stroke="currentColor" d="M16 10H4M8.5 5.5 4 10l4.5 4.5"></path>
                                    </svg>
                                </span>
                                <span className="SecondaryButton__text">Back</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="MobileAccordionItem__content">
                    <div className="Grid_grid__container">
                        <div className="Grid_grid__item"
                        style={columnsStyle(1, 9, 1, 9, 1, 17, 1, 17)}>
                            <div className="MobileAccordionItem__links-container">
                                <div className="MobileAccordionItem__heading-container">
                                    <h3 className="MobileAccordionItem__heading">{selectedNavigationCategory.categoryTitle}</h3>
                                    <p className="MobileAccordionItem__description">{selectedNavigationCategory.description}</p>
                                    <a href={selectedNavigationCategory.categoryButtonHref}
                                       className="MobileAccordionItem__button">
                                        <span
                                            className="MobileAccordionItem__button-text">{selectedNavigationCategory.categoryButtonText}</span>
                                        <span className="MobileAccordionItem__button-icon">
                                        <span className="MobileAccordionItem__button-icon-slide"><ArrowSvg/></span>
                                    </span>
                                    </a>
                                </div>
                                <ul className="MobileAccordionItem__links-list">
                                    {selectedNavigationCategory.categoryItems.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.href} className="MobileAccordionItem__link">{item.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MobileAccordionItem;