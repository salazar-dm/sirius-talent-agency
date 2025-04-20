import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../constants/pageTitles";

export const usePageTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const title = getPageTitle(location.pathname);
        document.title = title;
    }, [location.pathname]);
};