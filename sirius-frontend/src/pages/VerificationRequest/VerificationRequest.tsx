import React from "react";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import "./VerificationRequest.css"

const VerificationRequest:React.FC = () => {
    return (
        <>
            <div className="VerificationRequest__verification-request">
                <div className="Grid_grid__container Grid_grid__container__margin"
                style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item"
                    style={columnsStyle(1, 9, 1, 9, 3, 8, 3, 8)}>
                        <h1 className="VerificationRequest__title">Verify your email</h1>
                    </div>
                    <div className="Grid_grid__item"
                    style={columnsStyle(1, 9, 1, 9, 10, 16, 10, 16)}>
                        <p className="VerificationRequest__body">An email has been sent, please click the link in the email to continue.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerificationRequest