import React from "react";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {SiriusTalentLogoVertical} from "../../assets/SiriusTalentLogoVertical.tsx";
import "./DesktopScrollNavigation.css"
import DesktopNavigationHiddenSandwichButton from "./DesktopNavigationHiddenSandwichButton.tsx";

interface DesktopScrollNavigationProps {
    toggleScrollOn: number;
}

const DesktopScrollNavigation: React.FC<DesktopScrollNavigationProps> = ({toggleScrollOn}) => {
    const [scaleLogo, setScaleLogo] = React.useState(2);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleScroll = () => {
        setScaleLogo(Math.max(1, 2 - window.scrollY / toggleScrollOn));
    }

    return (
        <>
            <div className="ScrollNavigation__content-wrapper">
                <div className="ScrollNavigation__navigation">
                    <div className="Grid_grid__container Grid_grid__container__margin"
                    style={numberOfColumnsStyle(16)}>
                        <div className="Grid_grid__item"
                        style={columnsStyle(1, 6, 1, 4, 1, 4, 1, 2)}>
                            <div className="ScrollNavigation__link-wrapper">
                                <a href="/" className="ScrollNavigation__logo-link">
                                    <SiriusTalentLogoVertical scale={scaleLogo} isScalable={window.location.pathname === "/"}/>
                                </a>
                            </div>
                        </div>
                        <div className="Grid_grid__item"
                        style={columnsStyle(7, 9, 7, 9, 2, 17, 2, 17)}>
                            <div className="ScrollNavigation__menu-container">
                                <DesktopNavigationHiddenSandwichButton/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DesktopScrollNavigation