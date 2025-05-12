import {useQuery} from "react-query";
import axios from "axios";
import {PerformerType} from "../types/PerformerType.tsx";

const useFetchPerformerList = () => {
    return useQuery<PerformerType[], Error>('performerList', async () => {
        const response = await axios.get<PerformerType[]>(`${import.meta.env.VITE_API_URL}/api/casting/performers/all`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    })
}

export default useFetchPerformerList