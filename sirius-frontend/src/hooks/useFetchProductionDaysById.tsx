import {ProductionDayType} from "../types/ProductionDayType.tsx";
import axios from "axios";

export const useFetchProductionDaysById = (id: string) => {
    return axios.get<ProductionDayType>(`http://localhost:8080/api/casting/production-days/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};