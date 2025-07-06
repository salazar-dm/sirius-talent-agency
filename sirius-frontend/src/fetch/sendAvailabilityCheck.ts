import axios from "axios";
import {ProjectDayType} from "../types/ProjectDayType.ts";

export async function sendAvailabilityCheck(projectDay: ProjectDayType): Promise<void> {
    const token = localStorage.getItem("token");

    await axios.post(
        `${import.meta.env.VITE_API_URL}/api/action/availability-check/send`,
        projectDay,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}
