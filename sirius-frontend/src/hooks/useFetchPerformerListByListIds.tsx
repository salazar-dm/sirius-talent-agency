import {PerformerType} from "../types/PerformerType.tsx";
import axios from "axios";

export const useFetchPerformerListByListIds = (listIds: string[]) => {
    console.log(listIds)

    if (listIds.length === 0) {
        return Promise.resolve({
            data: [] as PerformerType[],
        });
    }

    return axios.get<PerformerType[]>(`${import.meta.env.VITE_API_URL}/api/casting/performers/all-by-ids`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
            ids: listIds
        }
    });
}