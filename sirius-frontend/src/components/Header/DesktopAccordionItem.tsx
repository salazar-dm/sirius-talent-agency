import React from "react";
import "./DesktopAccordionItem.css";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";
import {chunkArrayItems} from "../../shared/chunkArrayItems.tsx";
import {NavigationItem} from "../../types/NavigationItem.tsx";
import {NavigationItemCategory} from "../../types/NavigationItem.tsx";

interface AccordionItemProps {
    isAccordionOpen: boolean;
    selectedNavigationItem: NavigationItem;
    maxCategoryItemsPerTabColumn?: number;
}

const DesktopAccordionItem: React.FC<AccordionItemProps> = ({isAccordionOpen, selectedNavigationItem, maxCategoryItemsPerTabColumn = 4}) => {
    if (!selectedNavigationItem.categories || selectedNavigationItem.categories.length === 0) {
        return null;
    }

    const isOpen = isAccordionOpen;
    const [selectedCategory, setSelectedCategory] = React.useState<NavigationItemCategory>(selectedNavigationItem.categories[0]);

    const handleCategoryClick = (categoryTitle: string) => {
        const selected = selectedNavigationItem.categories!.find(
            item => item.categoryTitle === categoryTitle
        );

        if (selected) {
            setSelectedCategory(selected);
        } else {
            throw new Error(`Category ${categoryTitle} not found`);
        }
    }

    return (
        <>
            <div className={`AccordionItem__drawer ${isOpen ? "AccordionItem__drawer--open" : ""}`}>
                <div className="AccordionItem__drawer-content">
                    <div className="Grid_grid__container Grid_grid__container__margin">
                        <div className="Grid_grid__item AccordionItem__heading"
                        style={columnsStyle(1, 9, 1, 9, 1, 17, 1, 17)}>
                            <div className="AccordionItem__navigation-tabs">
                                {selectedNavigationItem.categories.map((item, index) => (
                                    <div key={index} role="button" tabIndex={index} onClick={() => handleCategoryClick(item.categoryTitle)}>
                                        <h2 className={`AccordionItem__subheading ${selectedCategory.categoryTitle === item.categoryTitle ? "AccordionItem__subheading--active" : ""}`}>{item.categoryTitle}</h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="Grid_grid__item"
                             style={columnsStyle(1, 9, 1, 9, 1, 17, 1, 17)}>
                            <div className={`AccordionItem__tabs-content ${isOpen ? "AccordionItem__tabs-content--open" : ""}`}>
                                <div className="Grid_grid__container Grid_grid__container__margin">
                                    <div className="Grid_grid__item"
                                         style={columnsStyle(1, 9, 1, 9, 1, 6, 1, 5)}>
                                        <div className="AccordionItem__tabs-content-side-left">
                                            <p className="AccordionItem__description">{selectedCategory.description}</p>
                                            <a href={selectedCategory.categoryButtonHref} className="AccordionItem__button">
                                                <span className="AccordionItem__button-text">{selectedCategory.categoryButtonText}</span>
                                                <span className="AccordionItem__button-icon">
                                                    <span className="AccordionItem__button-icon-slide">
                                                        <ArrowSvg/>
                                                    </span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="Grid_grid__item"
                                    style={columnsStyle(1, 9, 1, 9, 6, 17, 5, 17)}>
                                        <div className="AccordionItem__tabs-content-side-right">
                                            <div className="AccordionItem__tabs-content-list">
                                                {chunkArrayItems(selectedCategory.categoryItems, maxCategoryItemsPerTabColumn).map((chunk, index) => (
                                                    <ul key={index}>
                                                        {chunk.map(item => (
                                                            <li key={item.title} className="AccordionItem__tabs-content-list-item-wrapper">
                                                                <a href={item.href} className="AccordionItem__tabs-content-list-item">{item.title}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DesktopAccordionItem