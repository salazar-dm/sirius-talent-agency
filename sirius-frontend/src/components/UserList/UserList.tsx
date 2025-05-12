import React, {useEffect, useRef, useState} from "react";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {LocalUserType} from "../../types/LocalUserType.tsx";
import axios from "axios";
import "./SearchPagination.css";
import "./UserList.css";
import {NextButton} from "../Button/NextButton.tsx";
import {CheckSvg} from "../../assets/CheckSvg.tsx";
import {useNavigate} from "react-router-dom";
import {CloseSvg} from "../../assets/CloseSvg.tsx";
import UpdatedModal from "../Modal/UpdatedModal.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import SecondaryButton from "../Button/SecondaryButton.tsx";
import SearchUpdated from "../Search/SearchUpdated.tsx";

const UserList: React.FC = () => {
    const [users, setUsers] = useState<LocalUserType[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    const [deleteModal, setDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const searchRef = useRef<number | null>(null);

    const navigate = useNavigate();

    const fetchUsers = async (pageToFetch: number, query: string = "") => {
        const token = localStorage.getItem("token");
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
                params: {
                    page: pageToFetch,
                    size: 10,
                    query: query
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(result.data.content);
            setTotalPages(result.data.totalPages);
            setPage(pageToFetch);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchRef.current) clearTimeout(searchRef.current);
        searchRef.current = setTimeout(() => {
            fetchUsers(0, value);
        }, 300);
    };

    const deleteUser = async (id: string) => {
        const token = localStorage.getItem("token");

        try {
            const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setDeleteModal(false);
            setIdToDelete("");
        } catch (err) {
            console.error("Error deleting user", err);
        } finally {
            fetchUsers(page);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    return (
        <>
            {deleteModal && (<UpdatedModal title="Delete" message="Are you sure you want to delete this user?">
                <SecondaryButton text="Yes" onClick={() => deleteUser(idToDelete)}/>
                <SecondaryButton text="No" onClick={() => {setDeleteModal(false); setIdToDelete("")}}/>
            </UpdatedModal>)}
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 3, 15, 3, 15)}>
                    <div className="UserList__container">
                        <div className="Grid_grid__container UserList__heading-container">
                            <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 1, 6, 1, 6)}>
                                <h2 className="UserList__heading">List of users</h2>
                            </div>
                            <div className="Grid_grid__item UserList__controls-container" style={columnsStyle(1, 9, 1, 9, 12, 17, 12, 17)}>
                                <SearchUpdated placeholder="Search" onSearch={(e) => handleSearchChange(e)} value={searchTerm}/>
                                <SecondaryButton text="Add new" onClick={() => navigate("/admin/user-create")}/>
                            </div>

                        </div>
                        <div className="UserList__list-container">
                            {users.map((user) => (
                                <>
                                    <div key={user.id} className="UserList__list-item" >
                                        <div className="UserList__list-item__cta-container" role="button"
                                             onClick={() => navigate(`/admin/user/${user.id}`)}>
                                            <span className={`UserList__list-item__first-name ${user.userActivated ? "UserList__list-item__first-name--activated" : ""}`}>{user.profile.firstName === "" ? "N/A" : user.profile.firstName}</span>
                                            <span className={`UserList__list-item__last-name ${user.userActivated ? "UserList__list-item__last-name--activated" : ""}`}>{user.profile.lastName === "" ? "N/A" : user.profile.lastName}</span>
                                            <span className={`UserList__list-item__activated ${user.userActivated ? "UserList__list-item__activated--activated" : ""}`}>{user.userActivated ? "Activated" : "Not activated"}</span>
                                            <span className="UserList__list-item__email">{user.email}</span>
                                            <span className="UserList__list-item__tel">{user.tel}</span>
                                            <span className="UserList__list-item__reason">{user.reason}</span>
                                        </div>

                                        <div className="UserList__list-item__delete" role="button" onClick={
                                            () => {
                                                setDeleteModal(true);
                                                setIdToDelete(user.id);
                                            }
                                        }>
                                            <CloseSvg/>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 8, 11, 8, 11)}>
                    <div className="SearchPagination__container">
                        {page > 1 && (<span className="SearchPagination__item" onClick={() => setPage(0)}>1</span>)}
                        {page > 2 && (<span className="SearchPagination__item">...</span>)}
                        {page > 0 && (<span className="SearchPagination__item" onClick={() => setPage(page-1)}>{page}</span>)}
                        <span className="SearchPagination__item SearchPagination__item--active">{page + 1}</span>
                        {page < totalPages - 1 && (<span className="SearchPagination__item" onClick={() => setPage(page + 1)}>{page + 2}</span>)}
                        {page < totalPages - 2 && (<span className="SearchPagination__item">...</span>)}
                        {page < totalPages - 2 && (<span className="SearchPagination__item" onClick={() => setPage(totalPages - 1)}>{totalPages}</span>)}
                        <NextButton onClick={() => setPage((prev) => prev + 1)} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserList