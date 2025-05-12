import axios from 'axios';
import { ProjectDayType } from "../types/ProjectDayType";

export const fetchProjectDays = async (projectId: string, token: string): Promise<ProjectDayType[]> => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/project/${projectId}/days`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to fetch project days:", error);
        return [];
    }
};
