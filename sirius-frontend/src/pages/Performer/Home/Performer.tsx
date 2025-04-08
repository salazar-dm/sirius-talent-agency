import React, {useEffect, useState} from 'react';
import axios, {AxiosError} from "axios";
import './Performer.css';
import {columnsStyle} from "../../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../../shared/numberOfColumnsStyle.tsx";
import {calculateAge} from "../../../shared/calculateAge.tsx";
import {PerformerMenu} from "./PerformerMenu.tsx";
import CategoryGrid from "../../../components/CategoryGrid/CategoryGrid.tsx";
import PerformerAttributes from "../../../components/PerformerAttributes/PerformerAttributes.tsx";
import CardElement from "../../../components/CardElement/CardElement.tsx";

interface UserProfile {
    keyName: string;
    firstName: string;
    lastName: string;
    unionStatus: string;
    unionId: string;
    dateOfBirth: string;
    socialInsuranceNumber: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    selfDrive: boolean;
    gender: string;
    ethnicity: string;
    hairColor: string;
    eyeColor: string;
    sizeHeight: number;
    sizeWeight: number;
    sizeChest: number;
    sizeWaist: number;
    sizeHips: number;
    sizeShoe: number;
    sizeInseam: number;
    sizeSleeve: number;
    sizeNeck: number;
    sizeHat: number;
}

interface UserResponse {
    id: string;
    tel: string;
    email: string;
    emailVerified: boolean;
    userActivated: boolean;
    submissionPending: boolean;
    role: string;
    profile: UserProfile;
}

interface ErrorResponse {
    message: string;
}

const Performer : React.FC = () => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/performer/get-user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data)
                setUser(response.data);
            } catch (err) {
                const axiosError = err as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    setError(axiosError.response.data.message || 'Error fetching profile');
                } else {
                    setError('An unexpected error occurred');
                }
            }
        };

        fetchUserProfile().catch(err => console.error("Error fetching user profile:", err));
    }, []);

    useEffect(() => {
        if (user && !user.userActivated) {
            window.location.href = '/performer/update-profile';
        }
    }, [user]);

    const profile = user?.profile;

    return (
        <>
            <div className="Performer__content-wrapper">
                <div className="Grid_grid__container Grid_grid__container__margin"
                     style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 2, 7, 2, 7)}>
                        <div className="Performer__profile-card-container">
                            <div className="Performer__profile-card-image-container">
                                <img src={profile?.keyName} alt={`Image of ${profile?.firstName} ${profile?.lastName}`} className="Performer__profile-card-image"/>
                            </div>
                            <div className="Performer__profile-card-details-container">
                                <div>
                                    <h3 className="Performer__full-name">{profile?.firstName} {profile?.lastName}</h3>
                                    <p className="Performer__union-status">{profile?.unionStatus}</p>
                                </div>
                                <div className="Performer__row-details-container">
                                    <div className="Performer__row-details">
                                        <p className="Performer__label">Email</p>
                                        <p className="Performer__value">{user?.email}</p>
                                    </div>
                                    <div className="Performer__row-details">
                                        <p className="Performer__label">Phone</p>
                                        <p className="Performer__value">{user?.tel}</p>
                                    </div>
                                    <div className="Performer__row-details">
                                        <p className="Performer__label">Age</p>
                                        <p className="Performer__value">{calculateAge(profile?.dateOfBirth) === 0 ? "0" : calculateAge(profile?.dateOfBirth)}</p>
                                    </div>
                                </div>
                                <div className="Performer__row-details">
                                    <div className="Performer__buttons-container">
                                        <div className="Performer__row-item-with-divider">
                                            <a href="./performer/update-profile" className="Performer__button">
                                            <span className="">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"
                                                     viewBox="0 0 20 21" fill="none">
                                                    <path d="M10 11.5L5 6.5L15 6.5L10 11.5Z" fill="#DDF1EE"></path>
                                                    <path d="M2 15L18 15" stroke="#DDF1EE" stroke-width="2"></path>
                                                </svg>
                                            </span>
                                                <span className="Performer__button-text">Update</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Grid_grid__item"
                         style={columnsStyle(1, 9, 1, 9, 8, 16, 8, 16)}>
                        <CategoryGrid children={[
                            {href: "/performer/commissions", "title": "Commissions"},
                            {href: "/performer", "title": "Information"},
                            {href: "/performer", "title": "Emergency"}
                        ]}/>
                        <CardElement title="Attributes" dividerTop={false} dividerBottom={false} children={[<PerformerAttributes data={profile}/>]}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Performer;