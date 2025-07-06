import {PerformerType} from "../types/PerformerType.tsx";
import axios from "axios";

export const useFetchPerformerListByListIds = (listIds: string[]) => {
    if (listIds.length === 0) {
        return Promise.resolve({ data: [] as PerformerType[] });
    }

    const query = new URLSearchParams();
    listIds.forEach(id => query.append("ids", id));

    return axios.get<PerformerType[]>(
        `${import.meta.env.VITE_API_URL}/api/casting/performers/all-by-ids?${query.toString()}`,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    );
};
