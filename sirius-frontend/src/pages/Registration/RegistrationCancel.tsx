import "../../App.css"
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

export const RegistrationCancel = () => {
    return (
        <div className="VerificationRequest__verification-request">
            <div className="Grid_grid__container Grid_grid__container__margin"
                 style={numberOfColumnsStyle(16)}>
                <div className="Grid_grid__item"
                     style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                    <h1 className="VerificationRequest__title">Payment failed. Please try again later or email support to office@siriustalent.ca</h1>
                </div>
            </div>
        </div>
    );
}