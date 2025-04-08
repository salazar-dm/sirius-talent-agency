import {CaretSvg} from "./CaretSvg.tsx";

export const PerformerMenu = () => {
    return (
        <>
            <div className="Performer__menu-container">
                <a href="/performer"
                   className={`Performer__menu-item`}>
                    <span className="Performer__menu-item-text">Profile</span>
                    <span className="Performer__menu-item-icon">
                                    <CaretSvg/>
                                </span>
                </a>
                <a href="/performer/commissions"
                   className={`Performer__menu-item`}>
                    <span className="Performer__menu-item-text">Commissions</span>
                    <span className="Performer__menu-item-icon">
                                    <CaretSvg/>
                                </span>
                </a>
                <a href="/performer/information"
                   className={`Performer__menu-item`}>
                    <span className="Performer__menu-item-text">Information</span>
                    <span className="Performer__menu-item-icon">
                                    <CaretSvg/>
                                </span>
                </a>
                <a href="/performer/emergency"
                   className={`Performer__menu-item`}>
                    <span className="Performer__menu-item-text">Emergency</span>
                    <span className="Performer__menu-item-icon">
                                    <CaretSvg/>
                                </span>
                </a>
            </div>
        </>
    )
}