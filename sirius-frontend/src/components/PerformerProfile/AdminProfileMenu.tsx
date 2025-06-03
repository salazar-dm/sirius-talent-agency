import React, {useEffect} from "react"
import "../../App.css"
import "./AdminProfileMenu.css"
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import Spacer from "../Spacer/Spacer.tsx";
import SecondaryButton from "../Button/SecondaryButton.tsx";
import {useNavigate, useParams} from "react-router-dom";

export const AdminProfileMenu: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        console.log(id);
    }, [])

    return (
        <>
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 16, 2, 16)}>
                    <div className="AdminProfileMenu__container">
                        <h3 className="AdminProfileMenu__heading">Admin panel</h3>
                        <div className="AdminProfileMenu__cta-container">
                            <SecondaryButton text={"Send custom email"} onClick={() => navigate(`/admin/user/email-to/${id}`)}/>
                        </div>
                    </div>
                </div>
            </div>
            <Spacer/>
        </>
    )
}