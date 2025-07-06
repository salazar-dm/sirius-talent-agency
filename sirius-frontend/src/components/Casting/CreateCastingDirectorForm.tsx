import React, { useState } from "react";
import "./CreateCastingDirectorForm.css";
import "../../App.css";
import { columnsStyle } from "../../shared/columnsStyle";
import PrimaryButton from "../Button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CastingFormState {
    email: string;
    tel: string;
    firstName: string;
    lastName: string;
}

const CreateCastingDirectorForm: React.FC = () => {
    const [casting, setCasting] = useState<CastingFormState>({
        email: "",
        tel: "",
        firstName: "",
        lastName: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/casting/create`,
                casting,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            navigate(`/casting-director/${response.data.id}`);
        } catch (err) {
            console.error("Failed to create casting director:", err);
        }
    };


    return (
        <div className="Grid_grid__container Grid_grid__item">
            <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 7, 11, 7, 11)}>
                <div className="CreateCastingDirectorForm__container">
                    <h3 className="CreateCastingDirectorForm__title">Create a new casting director</h3>
                    <form onSubmit={handleSubmit}>
                        <p>
                            <input
                                placeholder="Email"
                                type="email"
                                value={casting.email}
                                onChange={(e) => setCasting({ ...casting, email: e.target.value })}
                            />
                        </p>
                        <p>
                            <input
                                placeholder="First Name"
                                type="text"
                                value={casting.firstName}
                                onChange={(e) => setCasting({ ...casting, firstName: e.target.value })}
                            />
                        </p>
                        <p>
                            <input
                                placeholder="Last Name"
                                type="text"
                                value={casting.lastName}
                                onChange={(e) => setCasting({ ...casting, lastName: e.target.value })}
                            />
                        </p>
                        <p>
                            <input
                                placeholder="Phone"
                                type="tel"
                                value={casting.tel}
                                onChange={(e) => setCasting({ ...casting, tel: e.target.value })}
                            />
                        </p>
                        <PrimaryButton text="Create" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCastingDirectorForm;
