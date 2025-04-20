import {ProductionDayType} from "../types/ProductionDayType.tsx";
import axios from "axios";

export const useFetchProductionDaysById = (id: string) => {
    return axios.get<ProductionDayType>(`https://www.siriustalent.ca/api/casting/production-days/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};