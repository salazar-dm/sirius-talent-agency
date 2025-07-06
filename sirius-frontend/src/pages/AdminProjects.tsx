import {AdminNavigation} from "../components/AdminNavigation/AdminNavigation.tsx";
import {adminNavigation} from "../templates/adminNavigation.ts";
import Spacer from "../components/Spacer/Spacer.tsx";
import ProjectAll from "./Project/ProjectAll.tsx";
import {ProjectListNavigation} from "../components/ProjectList/ProjectListNavigation.tsx";

export const AdminProjects = () => {
    return (
        <>
            <ProjectListNavigation/>
            <ProjectAll/>
        </>
    )
}