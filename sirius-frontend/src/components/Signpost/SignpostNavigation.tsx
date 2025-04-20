import React from "react";
import "./SignpostNavigation.css";
import "../../App.css";
import { SignpostNavigationItem } from "../../dummy-data/SignpostNavigationDummyData.tsx";
import { ArrowSvg } from "../../assets/ArrowSvg.tsx";

interface SignpostNavigationProps {
    navigationList: SignpostNavigationItem[];
}

const SignpostNavigation: React.FC<SignpostNavigationProps> = ({ navigationList }) => {
    return (
        <div className="SignpostNavigation__container">
            {navigationList.map(({ title, href, text }, index) => (
                <div className="SignpostNavigation__item-container" key={index}>
                    <div className="SignpostNavigation__cta-title">
                        <div className="SignpostNavigation__body-link">
                            <a href={href}>
                                <span className="SignpostNavigation__body-link-text">{title}</span>
                                <span className="SignpostNavigation__body-link-icon">
                                    <span className="SignpostNavigation__body-link-icon-slide">
                                        <ArrowSvg />
                                        <ArrowSvg />
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="SignpostNavigation__cta-text">
                        {text &&<div>{text}</div>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SignpostNavigation;


