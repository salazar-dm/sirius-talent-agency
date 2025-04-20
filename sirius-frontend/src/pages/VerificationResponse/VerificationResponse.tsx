import React, {useEffect, useState} from "react";
import ScrollNavigation from "../../templates/ScrollNavigation/ScrollNavigation.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import "./VerificationResponse.css"
import {useNavigate} from "react-router-dom";

const VerificationRequest:React.FC = () => {
    const navigate = useNavigate();

    function sendGetRequest() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            const requestUrl = `https://www.siriustalent.ca/api/auth/verify?token=${token}`;

            fetch(requestUrl, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response data:', data);
                })
                .catch(error => {
                    console.error('Error during GET request:', error);
                });

        } else {
            console.warn('Token not found in the URL');
        }
    }

    useEffect(() => {


        const timer = setTimeout(() => {
            navigate('/login');
        }, 4000);

        sendGetRequest()

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <div className="VerificationRequest__verification-request">
                <div className="Grid_grid__container Grid_grid__container__margin"
                     style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                        <h1 className="VerificationRequest__title">Email has been verified. Redirecting...</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerificationRequest