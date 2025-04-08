import React from "react";
import "./MobileMenu.css";
import "../../App.css";
import {SiriusTalentLogo} from "../../assets/SiriusTalentLogo.tsx";
import {CloseSvg} from "../../assets/CloseSvg.tsx";
import {NavigationItem, NavigationItemCategory} from "../../types/NavigationItem.tsx";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    mobileMenuItems: NavigationItem[];
    onAccordionOpen: (selectedNavigationCategory: NavigationItemCategory, isAccordionOpen: boolean) => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({isOpen = false, onClose, mobileMenuItems, onAccordionOpen}) => {

    const handleAccordionOpen = (selectedNavigationCategory: NavigationItemCategory, isAccordionOpen: boolean) => {
        onAccordionOpen(selectedNavigationCategory, isAccordionOpen);
    }

    return (
        <>
            <div className={`MobileMenu__mobile-menu ${isOpen ? 'MobileMenu__mobile-menu--open' : ''}`}>
                <div className="MobileMenu__drawer">
                    <div className="MobileMenu__content-wrapper">
                        <div className="MobileMenu__heading">
                            <div className="MobileMenu__logo-wrapper">
                                <a href="/" className="MobileMenu__logo-link">
                                    <SiriusTalentLogo/>
                                </a>
                            </div>
                            <button className="MobileNavigation__menu-close-button"
                            onClick={onClose}>
                                <CloseSvg/>
                            </button>
                        </div>
                        <div className="MobileMenu__navigation">
                            <ul className="MobileMenu__list">
                                {mobileMenuItems.map((item, index) => (
                                    !item.categories ? (
                                        <li key={index}>
                                            <div className="MobileMenu__list-item">
                                                <a href={item.href} className="MobileMenu__list-item-link">
                                                    {item.name}
                                                </a>
                                            </div>
                                        </li>
                                    ) : (
                                        <li key={index}>
                                            <div className="MobileMenu__list-item">
                                                <h2 className="MobileMenu__sub-navigation-title">{item.name}</h2>
                                                <div className="MobileMenu__sub-navigation-container">
                                                    {item.categories.map((category, index) => (
                                                        <button key={index} className="MobileMenu__sub-navigation-item"
                                                        onClick={() => handleAccordionOpen(category, true)}
                                                        >
                                                            {category.categoryTitle}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileMenu