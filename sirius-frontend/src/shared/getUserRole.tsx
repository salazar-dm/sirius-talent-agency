import {jwtDecode} from "jwt-decode";

interface CustomJwtPayload {
    role: string
}

export const getUserRole = (guest : string ) : string => {

    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        if (decoded.role) {
            return "/" + decoded.role.toLowerCase();
        } else {
            return guest;
        }
    }

    return guest;
}