import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { LocalUserType } from "../types/LocalUserType";
import {PerformerProfileCard} from "../components/PerformerProfile/PerformerProfileCard.tsx";
import PerformerProfile from "../components/PerformerProfile/PerformerProfile.tsx";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay.tsx";
import ErrorModal from "../components/Modal/ErrorModal.tsx";
import {columnsStyle} from "../shared/columnsStyle.tsx";
import SecondaryButton from "../components/Button/SecondaryButton.tsx";
import PrimaryButton from "../components/Button/PrimaryButton.tsx";

const AdminUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<LocalUserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized");
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (err) {
                console.error(err);
                setError("User not found or server error");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <LoadingOverlay/>;
    if (error) return   <ErrorModal title="Error" message={error} onClose={() => navigate("/admin")}/>;
    if (!user) return <p>User not found</p>;

    return (
        <>
            <PerformerProfile performer={user} onUpdateClick={() => navigate(`/admin/user-update/${user.id}`)}/>
        </>

    );
};

export default AdminUser;
