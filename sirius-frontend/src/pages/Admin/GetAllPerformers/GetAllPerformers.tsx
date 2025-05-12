import React from 'react';
import './GetAllPerformers.css';
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {useEffect, useState} from "react";
import axios from 'axios';

interface LocalUser {
    id: string;
    tel: string;
    email: string;
    emailVerified: boolean;
    userActivated: boolean;
    submissionPending: boolean;
    //role: string;
    //profile: Profile;
}

const GetAllPerformers : React.FC = () => {

    const [users, setUsers] = useState<LocalUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<LocalUser[]>(`${import.meta.env.VITE_API_URL}/api/admin/get-all/${role}`);
                setUsers(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [role]);




    return (
        <div>

        </div>
    );
}

export default GetAllPerformers;
