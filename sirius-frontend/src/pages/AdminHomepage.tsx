import React, {useEffect, useState} from "react";
import axios from "axios";
import {LocalUserType} from "../types/LocalUserType.tsx";
import PrimaryButton from "../components/Button/PrimaryButton.tsx";
import UserList from "../components/UserList/UserList.tsx";
import {AdminNavigation} from "../components/AdminNavigation/AdminNavigation.tsx";
import {adminNavigation} from "../templates/adminNavigation.ts";
import Spacer from "../components/Spacer/Spacer.tsx";

export const AdminHomepage: React.FC = () => {



    return (
        <div>
            <UserList/>
        </div>
    );
}