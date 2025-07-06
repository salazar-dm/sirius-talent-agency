import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {CastingType} from "../../types/CastingType.ts";
import CastingDirectorList from "../../components/Casting/CastingDirectorList.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import SearchUpdated from "../../components/Search/SearchUpdated.tsx";
import SecondaryButton from "../../components/Button/SecondaryButton.tsx";

const CastingDirectorsAll: React.FC = () => {
    const [castingDirectors, setCastingDirectors] = useState<CastingType[]>([]);
    const [selectedDirector, setSelectedDirector] = useState<CastingType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCastingDirectors = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/casting`, {
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

    useEffect(() => {
        if (selectedDirector) {
            navigate(`/casting-director/${selectedDirector.id}`);
        }
    }, [selectedDirector]);

    return (
        <>
            <CastingDirectorList
                castingDirectors={castingDirectors}
                onDirectorClick={(director: CastingType) => setSelectedDirector(director)}
            />
        </>

    );
};

export default CastingDirectorsAll;
