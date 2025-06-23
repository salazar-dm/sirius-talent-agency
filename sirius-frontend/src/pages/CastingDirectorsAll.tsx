import React, { useEffect, useState } from "react";
import axios from "axios";

interface CastingDirector {
    id: string;
    email: string;
    tel: string;
}

const CastingDirectorsAll: React.FC = () => {
    const [castingDirectors, setCastingDirectors] = useState<CastingDirector[]>([]);

    useEffect(() => {
        const fetchCastingDirectors = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/casting/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCastingDirectors(response.data);
            } catch (error) {
                console.error("Failed to fetch casting directors:", error);
            }
        };

        fetchCastingDirectors();
    }, []);

    return (
        <div>
            <h2>All Casting Directors</h2>
            <ul>
                {castingDirectors.map(cd => (
                    <li key={cd.id}>{cd.email} ({cd.tel})</li>
                ))}
            </ul>
        </div>
    );
};

export default CastingDirectorsAll;
