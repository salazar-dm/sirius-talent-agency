import React from "react";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";
import "./MenuButton.css";

interface MenuButtonProps {
    title: string;
    onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({title, onClick}) => {

    return (
        <div className="ProjectMenu__cta-title">
            <div className="MenuButton__body-link">
                <a onClick={onClick}>
                    <span className="MenuButton__body-link-text">{title}</span>
                    <span className="MenuButton__body-link-icon">
                                        <span className="MenuButton__body-link-icon-slide">
                                            <ArrowSvg/>
                                            <ArrowSvg/>
                                        </span>
                                    </span>
                </a>
            </div>
        </div>
    )
}

export default MenuButton