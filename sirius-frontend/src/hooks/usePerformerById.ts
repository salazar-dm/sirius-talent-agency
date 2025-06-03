import { useEffect, useState } from "react";
import axios from "axios";
import {LocalUserType} from "../types/LocalUserType.tsx";

export const usePerformerById = (id: string | undefined) => {
    const [performer, setPerformer] = useState<LocalUserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!id) return;
        if (!token) return;

        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setPerformer(res.data);
                setError(null);
            })
            .catch((err) => {
                setError("User not found");
                setPerformer(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return { performer, loading, error };
};
