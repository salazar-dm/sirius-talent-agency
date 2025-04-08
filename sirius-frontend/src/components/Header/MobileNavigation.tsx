import React, {useEffect, useState} from "react";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {SiriusTalentLogo} from "../../assets/SiriusTalentLogo.tsx";
import "./MobileNavigation.css"
import "../../App.css";
import {SiriusTalentAccount} from "../../assets/SiriusTalentAccount.tsx";
import {getUserRole} from "../../shared/getUserRole.tsx";

interface MobileNavigationProps {
    onToggleMobileMenu: () => void
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({onToggleMobileMenu}) => {
    const [navigationLink, setNavigationLink] = useState('');
    const [isNavVisible, setIsNavVisible] = useState(true);
    let lastScrollTop = 0;

    useEffect(() => {
        setNavigationLink(getUserRole("/login"));

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    const handleScroll = () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
            setIsNavVisible(false);
        } else {
            setIsNavVisible(true);
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }

    return (
        <>
                <div className={`MobileNavigation__content-wrapper ${isNavVisible ? 'MobileNavigation__content-wrapper--visible' : ''}`}>
                    <div className="MobileNavigation__navigation">
                        <div className="Grid_grid__container Grid_grid__container__margin"
                        style={numberOfColumnsStyle(8)}>
                            <div className="Grid_grid__item"
                            style={columnsStyle(1, 6, 1, 4, 1, 4, 1, 2)}>
                                <div className="MobileNavigation__logo-wrapper">
                                    <a href="/" className="MobileNavigation__logo-link">
                                        <SiriusTalentLogo/>
                                    </a>
                                </div>
                            </div>

                            <div className="Grid_grid__item"
                            style={columnsStyle(7, 9, 7, 9, 7, 9, 7, 9)}>
                                <div className="MobileNavigation__navigation-menu-container">
                                    <button className="MobileNavigation__account-button"
                                            onClick={() => window.location.href = navigationLink}>
                                            <span className="MobileNavigation__account-button-icon">
                                                <SiriusTalentAccount/>
                                            </span>
                                    </button>
                                    <button className="MobileNavigation__navigation-menu-button"
                                            onClick={onToggleMobileMenu}
                                            type="button"
                                            aria-label="Home Page">
                                        <span className="MobileNavigation__navigation-menu-item"></span>
                                        <span className="MobileNavigation__navigation-menu-item"></span>
                                        <span className="MobileNavigation__navigation-menu-item"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default MobileNavigation