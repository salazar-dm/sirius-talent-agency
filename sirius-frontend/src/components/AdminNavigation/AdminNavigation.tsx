import React from "react"
import "../../App.css"
import "./AdminNavigation.css"
import {useLocation, useNavigate} from "react-router-dom";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {NavigationItem} from "../../types/NavigationItem.tsx";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";
import Spacer from "../Spacer/Spacer.tsx";

interface Props {
    navigation: NavigationItem[];
}

export const AdminNavigation: React.FC<Props> = ({navigation}) => {
    const navigate = useNavigate();
    const path = useLocation().pathname;

    return (
        <>
                <>
                    <div className="AdminNavigation__container">
                        <div className="Grid_grid__container Grid_grid__container__margin">
                            <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 16, 2, 16)}>
                                <div className="AdminNavigation__body">
                                    {navigation.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`AdminNavigation__item-container ${item.href === path ? "selected" : ""}`}
                                        >
                                            <div className="AdminNavigation__cta-title">
                                                <div
                                                    className="AdminNavigation__body-link"
                                                    onClick={() => navigate(item.href)}
                                                >
                                                    <span className="AdminNavigation__body-link-text">{item.name}</span>
                                                    <span className="AdminNavigation__body-link-icon">
                                            <span className="AdminNavigation__body-link-icon-slide">
                                                <ArrowSvg />
                                                <ArrowSvg />
                                            </span>
                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Spacer />
                </>

        </>
    )
}