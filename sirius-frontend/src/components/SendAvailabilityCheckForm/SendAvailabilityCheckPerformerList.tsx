import React, {useEffect, useState} from "react"
import "../../App.css"
import "./SendAvailabilityCheckPerformerList.css"
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {LocalUserType} from "../../types/LocalUserType.tsx";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.tsx";
import useFetchPerformerList from "../../hooks/useFetchPerformerList.tsx";
import {PerformerProfileCard} from "../PerformerProfile/PerformerProfileCard.tsx";
import SecondaryButton from "../Button/SecondaryButton.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import axios from "axios";
import {NextButton} from "../Button/NextButton.tsx";

interface Props {
    roleName: string;
    onSave: (performerIds: string[]) => void;
}

export const SendAvailabilityCheckPerformerList:React.FC<Props> = ({roleName, onSave}) => {
    const [performers, setperformers] = useState<LocalUserType[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(() => {
        const saved = localStorage.getItem("page_admin_users");
        return saved ? parseInt(saved) : 0;
    });
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const fetchUsers = async (pageToFetch: number, query: string = "") => {
        const token = localStorage.getItem("token");
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
                params: {
                    page: pageToFetch,
                    size: 10,
                    query: query,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setperformers(result.data.content);
            setTotalPages(result.data.totalPages);
            setPage(pageToFetch);
            localStorage.setItem("page_admin_users", String(pageToFetch)); // 💾 сохраняем
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const [unionCount, setUnionCount] = useState(0);
    const [nonUnionCount, setNonUnionCount] = useState(0);

    const toggleSelect = (performer: LocalUserType) => {
        setSelectedIds(prev => {
            const isSelected = prev.includes(performer.id);
            return isSelected
                ? prev.filter(pid => pid !== performer.id)
                : [...prev, performer.id];
        });
    };

    useEffect(() => {
        if (!performers) return;

        let union = 0;
        let nonUnion = 0;

        selectedIds.forEach(id => {
            const p = performers.find(p => p.id === id);
            if (!p) return;

            const status = p.profile.unionStatus;
            if (status === "ACTRA Apprentice" || status === "ACTRA Full") {
                union++;
            } else {
                nonUnion++;
            }
        });

        setUnionCount(union);
        setNonUnionCount(nonUnion);
    }, [selectedIds, performers]);

    return (
        <>
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 16, 2, 16)}>
                    <h3>Selecting for role: {roleName}<br/>Green voucher selected: {unionCount} <br/> White voucher selected: {nonUnionCount}</h3>
                    {performers && performers.length > 0 && (
                        <div className="SendAvailabilityCheckPerformerList__container">
                            {performers.map(performer => (
                                <>
                                    {
                                        performer.userActivated && (
                                            <div className="SendAvailabilityCheckPerformerList__item">
                                                <PerformerProfileCard performer={performer} isSticky={false} onUpdateClick={() => {}}/>
                                                <div className="SendAvailabilityCheckPerformerList__button-container">
                                                    {
                                                        selectedIds.includes(performer.id) ? (
                                                            <>
                                                                <div className="SendAvailabilityCheckPerformerList__remove-button">
                                                                    <SecondaryButton onClick={() => toggleSelect(performer)}
                                                                                     text={`Remove ${roleName}`}/>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <SecondaryButton onClick={() => toggleSelect(performer)}
                                                                             text={`Add ${roleName}`}/>
                                                        )
                                                    }

                                                    <SecondaryButton
                                                        onClick={() => {
                                                            window.open(`/admin/user/${performer.id}`, '_blank');
                                                        }}
                                                        text={`View profile`}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    }


                                </>

                            ))}
                        </div>
                    )}
                    <PrimaryButton onClick={() => onSave(selectedIds)} text={"Save"}/>
                    <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 8, 11, 8, 11)}>
                        <div className="SearchPagination__container">
                            {page > 1 && (
                                <span
                                    className="SearchPagination__item"
                                    onClick={() => {
                                        setPage(0);
                                        window.scrollTo({ top: 600});
                                    }}
                                >1</span>
                            )}
                            {page > 2 && (<span className="SearchPagination__item">...</span>)}
                            {page > 0 && (
                                <span
                                    className="SearchPagination__item"
                                    onClick={() => {
                                        setPage(page - 1);
                                        window.scrollTo({ top: 600});
                                    }}
                                >{page}</span>
                            )}
                            <span className="SearchPagination__item SearchPagination__item--active">{page + 1}</span>
                            {page < totalPages - 1 && (
                                <span
                                    className="SearchPagination__item"
                                    onClick={() => {
                                        setPage(page + 1);
                                        window.scrollTo({ top: 600});
                                    }}
                                >{page + 2}</span>
                            )}
                            {page < totalPages - 2 && (<span className="SearchPagination__item">...</span>)}
                            {page < totalPages - 2 && (
                                <span
                                    className="SearchPagination__item"
                                    onClick={() => {
                                        setPage(totalPages - 1);
                                        window.scrollTo({ top: 600});
                                    }}
                                >{totalPages}</span>
                            )}
                            <NextButton onClick={() => {
                                setPage(prev => prev + 1);
                                window.scrollTo({ top: 600});
                            }} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}