import {useQuery} from "react-query";
import axios from "axios";
import {PerformerType} from "../types/PerformerType.tsx";
import {LocalUserType} from "../types/LocalUserType.tsx";

const useFetchPerformerList = () => {
    return useQuery<LocalUserType[], Error>('performerList', async () => {
        const response = await axios.get<LocalUserType[]>(`${import.meta.env.VITE_API_URL}/api/casting/performers/all`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    })
}

export default useFetchPerformerList