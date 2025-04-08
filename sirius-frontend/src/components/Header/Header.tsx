import React, {useState} from 'react'
import DesktopNavigation from './DesktopNavigation.tsx';
import MobileNavigation from "./MobileNavigation.tsx";
import DesktopMenu from "./DesktopMenu.tsx";
import MobileMenu from "./MobileMenu.tsx";
import DesktopScrollNavigation from "./DesktopScrollNavigation.tsx";
import DesktopAccordionItem from "./DesktopAccordionItem.tsx";
import navigationItemListDummyData from "../../dummy-data/NavigationItemDummyData.tsx";
import {NavigationItem, NavigationItemCategory} from "../../types/NavigationItem.tsx";
import MobileAccordionItem from "./MobileAccordionItem.tsx";
import {CommonProps} from "../../props/Common.tsx";


interface HeaderProps extends CommonProps {
    isDesktop: boolean
}

const Header: React.FC<HeaderProps> = ({isDesktop}) => {
    const navigationItemList = navigationItemListDummyData;

    const navigationItemToRender = navigationItemList.filter(item => item.categories ? item : undefined)[0];
    const navigationCategoryToRender = navigationItemToRender.categories![0];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedNavigationItem, setSelectedNavigationItem] = useState<NavigationItem | undefined>(navigationItemToRender);
    const [selectedNavigationCategory, setSelectedNavigationCategory] = useState<NavigationItemCategory | undefined>(navigationCategoryToRender);
    const [isAccordionOpenHeader, setIsAccordionOpenHeader] = useState(false);

    const handleAccordionOpen = (navigationItem: NavigationItem, isAccordionOpen: boolean) => {
        setSelectedNavigationItem(navigationItem);
        setIsAccordionOpenHeader(!isAccordionOpen);
    }

    const handleMobileAccordionOpen = (selectedNavigationCategory: NavigationItemCategory, isAccordionOpen: boolean) => {
        setSelectedNavigationCategory(selectedNavigationCategory);
        setIsAccordionOpenHeader(isAccordionOpen);
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(true);
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsAccordionOpenHeader(false);
    };

    return (
        <header>
            {isDesktop ?
                <>
                    <DesktopNavigation
                        navigationMenu={navigationItemList}
                        onAccordionOpen={handleAccordionOpen}
                    />
                    <DesktopScrollNavigation
                        toggleScrollOn={400}
                    />
                    <DesktopMenu/>
                    {selectedNavigationItem &&
                        <DesktopAccordionItem isAccordionOpen={isAccordionOpenHeader} selectedNavigationItem={selectedNavigationItem}/>
                    }
                </>
                :
                <>
                    <MobileNavigation onToggleMobileMenu={toggleMobileMenu}/>
                    <MobileMenu isOpen={isMobileMenuOpen}
                                onClose={() => closeMobileMenu()}
                                mobileMenuItems={navigationItemList}
                                onAccordionOpen={handleMobileAccordionOpen}
                    />
                    {selectedNavigationCategory &&
                        <MobileAccordionItem isAccordionOpen={isAccordionOpenHeader}
                                             selectedNavigationCategory={selectedNavigationCategory}
                                             onAccordionClose={handleMobileAccordionOpen}
                        />
                    }
                </>
            }

        </header>
    )
}

export default Header