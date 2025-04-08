import React, {useEffect, useRef} from 'react'
import '../../App.css';
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import "./DesktopNavigation.css"
import {SiriusTalentAccount} from "../../assets/SiriusTalentAccount.tsx";
import {getUserRole} from "../../shared/getUserRole.tsx";
import {NavigationItem} from "../../types/NavigationItem.tsx";
import {SiriusTalentLogo} from "../../assets/SiriusTalentLogo.tsx";

interface DesktopNavigationProps {
    navigationMenu: NavigationItem[],
    hideNavigationOnScrollPixels?: number
    translateXNavigationBarOnHidePercent?: number
    onAccordionOpen: (selectedNavigationItem: NavigationItem, isAccordionOpen: boolean) => void
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
                                                                 navigationMenu,
                                                                 hideNavigationOnScrollPixels = 100,
                                                                 translateXNavigationBarOnHidePercent = 2.5,
                                                                 onAccordionOpen
}) => {
    const listItemsRef = useRef<DOMRect[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [navigationLink, setNavigationLink] = React.useState('');
    const [trackerStyle, setTrackerStyle] = React.useState({
        opacity: 0,
        left: "0",
        width: "0"
    });
    const [activeTrackerStyle, setActiveTrackerStyle] = React.useState({
        opacity: 1,
        left: "0",
        width: "0"
    })
    const [desktopNavigationStyle, setDesktopNavigationStyle] = React.useState({
        opacity: 1,
        transform: "translateX(0%)",
        pointerEvents: "all",
    });
    const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);
    const [activeItemIndex, setActiveItemIndex] = React.useState<number | null>(null);

    useEffect(() => {
        setNavigationLink(getUserRole("/login"));

        const listItems = document.querySelectorAll(".DesktopNavigation__list-item");
        listItemsRef.current = [...listItems].map(item => item.getBoundingClientRect());

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleAccordionClick = (navigationItem: NavigationItem, isAccordionOpen: boolean, index: number) => {
        setIsAccordionOpen(!isAccordionOpen);
        onAccordionOpen(navigationItem, isAccordionOpen);

        if (!activeItemIndex) {
            setActiveItemIndex(index);
        } else {
            setActiveItemIndex(null);
        }

        if (!activeItemIndex) {
            setActiveTrackerStyle({
                opacity: 1,
                left: trackerStyle.left,
                width: trackerStyle.width
            });
        } else {
            setActiveTrackerStyle((prevStyle) => ({
                ...prevStyle,
                opacity: 0
            }))
        }
    }

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 0) {
            setDesktopNavigationStyle({
                opacity: Math.max(0, 1 - currentScroll / hideNavigationOnScrollPixels),
                transform: `translateX(${Math.min(translateXNavigationBarOnHidePercent, translateXNavigationBarOnHidePercent * currentScroll / hideNavigationOnScrollPixels)}%)`,
                pointerEvents: "none",
            })
        } else {
            setDesktopNavigationStyle((prevStyle) => ({
                ...prevStyle,
                pointerEvents: "all"
            }))
        }
    }

    const handleMouseEnter = (index: number) => {
        const rect = listItemsRef.current[index];
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
            setTrackerStyle({
                opacity: 1,
                left: `${rect.left - containerRect?.left}px`,
                width: `${rect.width}px`
            });
        } else {
            console.warn("No container element found");
        }
    }

    const handleMouseLeave = () => {
        setTrackerStyle((prevStyle) => ({
            ...prevStyle,
            opacity: 0
        }));
    }

    return (
        <>
            <div className="DesktopNavigation__content-wrapper">
                <div className="Grid_grid__container Grid_grid__container__margin"
                     style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 1, 5, 1, 5)}>
                        <div className={`DesktopNavigation__logo-wrapper ${isAccordionOpen ? "DesktopNavigation__logo-wrapper--active" : ""}`}>
                            <a href="/" className="DesktopNavigation__logo">
                                <span className="DesktopNavigation__logo-icon">
                                    <SiriusTalentLogo/>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className={`Grid_grid__item DesktopNavigation__link-wrapper`}
                         style={columnsStyle(1, 9, 1, 9, 10, 17, 10, 17)}
                         ref={containerRef}>
                        <ul className="DesktopNavigation__list" style={{
                            opacity: desktopNavigationStyle.opacity,
                            transform: desktopNavigationStyle.transform,
                            pointerEvents: desktopNavigationStyle.pointerEvents,
                        }}>
                            {navigationMenu.map((link, index) => (
                                <li key={link.href}>
                                    <div
                                        className="DesktopNavigation__list-item"
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {link.categories ? (
                                            <button
                                                className={`DesktopNavigation__list-item-link ${activeItemIndex === index ? "DesktopNavigation__list-item--active" : ""} ${isAccordionOpen ? "DesktopNavigation__list-item-link--open" : ""}`}
                                                onClick={() => handleAccordionClick(link, isAccordionOpen, index)}
                                            >
                                                {link.name}
                                                <span className="DesktopNavigation__list-item-link-caret"></span>
                                            </button>
                                        ) : (
                                            <a href={link.href}
                                               className={`DesktopNavigation__list-item-link ${isAccordionOpen ? "DesktopNavigation__list-item-link--open" : ""}`}
                                            >{link.name}
                                            </a>
                                        )}
                                    </div>
                                </li>
                            ))}
                            <li className="">
                                <div className="DesktopNavigation__list-item">
                                    <button
                                        className={`DesktopNavigation__account-button ${isAccordionOpen ? "DesktopNavigation__account-button--open" : ""}`}
                                        onClick={() => window.location.href = navigationLink}>
                                        <span className="DesktopNavigation__account-button-icon">
                                            <SiriusTalentAccount/>
                                        </span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <span className="DesktopNavigation__link-tracker"
                              style={{
                                  opacity: trackerStyle.opacity,
                                  width: trackerStyle.width,
                                  left: trackerStyle.left,
                              }}>
                        </span>
                        {activeItemIndex &&
                            <span
                                className="DesktopNavigation__link-tracker DesktopNavigation__link-tracker-active-item"
                                style={activeTrackerStyle}>
                            </span>
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default DesktopNavigation