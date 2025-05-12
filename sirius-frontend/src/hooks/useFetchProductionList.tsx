import {useQuery} from "react-query";
import ProductionType from "../types/ProductionDayType.tsx";
import axios from "axios";

const useFetchProductionList = () => {
    return useQuery<ProductionType[], Error>('productionList', async () => {
        const response = await axios.get<ProductionType[]>(`${import.meta.env.VITE_API_URL}/api/casting/production-days/all`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    })
}

export default useFetchProductionList
