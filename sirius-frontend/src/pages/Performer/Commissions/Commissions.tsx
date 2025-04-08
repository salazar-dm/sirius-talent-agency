import React from "react";
import "../../../App.css";
import "./Commissions.css";
import PaymentDetail from "./PaymentDetail.tsx";
import {columnsStyle} from "../../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../../shared/numberOfColumnsStyle.tsx";

const Commissions: React.FC = () => {
    return (
        <>
            <div className="HeaderDetail__header-detail">
                <div className="Grid_grid__container Grid_grid__container__margin"
                     style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 3, 9, 3, 9)}>
                        <div className="HeaderDetail__content-wrapper">
                            <div className="UpLink__uplink">
                                <span className="UpLink__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 20"
                                         fill="none">
                                        <path d="M9.45312 1.5L4.45312 6.5L14.4531 6.5L9.45312 1.5Z"
                                              fill="currentColor"></path>
                                        <path
                                            d="M9.45312 6.5L9.45313 9C9.45312 10.6569 10.7963 12 12.4531 12L17.4531 12"
                                            stroke="currentColor" stroke-width="2"></path>
                                    </svg>
                                </span>
                                <a title="Profile" target="" className="UpLink__text" href="/performer">Profile</a>
                            </div>
                            <h1 className="HeaderDetail__title">Pay the commission</h1>
                            <p className="HeaderDetail__body">
                                Please complete the payment form. If you're unsure about any of the fields, helpful guidance is provided below.
                            </p>
                        </div>
                    </div>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 10, 15, 10, 15)}>
                        <div className="HeaderDetail__content-wrapper">
                            <PaymentDetail/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Commissions;