import React, {useEffect, useState} from "react";
import "../../App.css"
import "./ProjectListNavigation.css"
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import SecondaryButton from "../Button/SecondaryButton.tsx";
import {useNavigate} from "react-router-dom";
import {CustomModal} from "../Modal/CustomModal.tsx";
import Modal from "../Modal/Modal.tsx";
import {FormSelect} from "../Form/FormSelect.tsx";
import axios from "axios";

interface CastingDirector {
    id: string;
    firstName: string;
    lastName: string;
}

export const ProjectListNavigation: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [castingDirectors, setCastingDirectors] = useState<CastingDirector[]>([]);
    const [castingDirectorId, setCastingDirectorId] = useState<string | null>(null);

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
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCastingDirectors(response.data);
            } catch (error) {
                console.error("Failed to fetch casting directors:", error);
            }
        };

        fetchCastingDirectors();
    }, []);

    useEffect(() => {
        console.log(castingDirectors);
    }, [castingDirectors]);

    const options = castingDirectors.map((dir) => ({
        label: `${dir.firstName} ${dir.lastName}`,
        value: dir.id,
    }));


    return (
        <>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={"Add new project"} message={"Please select the casting director to create the project for"} >
                    <>
                        <div className="ProjectListNavigation__selector-container">
                            <FormSelect
                                label="Casting Director"
                                select={{
                                    id: "casting-director",
                                    options,
                                    onChange: setCastingDirectorId,
                                    required: true,
                                }}
                            />
                            {castingDirectorId && (
                                <>
                                    <div className="ProjectListNavigation__button-container">
                                        <SecondaryButton text={`Create project`} onClick={() => navigate(`/admin/project/create/${castingDirectorId}`)} />
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                </Modal>
            )}

            <div className="ProjectListNavigation__container">
                <div className="Grid_grid__container Grid_grid__container__margin">
                    <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 3, 15, 3, 15)}>
                        <div className="Grid_grid__container">
                            <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 1, 4, 1, 4)}>
                                <h3 className="ProjectListNavigation__title">All Projects</h3>
                            </div>
                            <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 14, 17, 14, 17)}>
                                <SecondaryButton text="Add new" onClick={() => setIsModalOpen(true)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}