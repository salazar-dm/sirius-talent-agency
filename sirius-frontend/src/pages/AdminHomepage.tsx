import React, {useEffect, useState} from "react";
import axios from "axios";
import {LocalUserType} from "../types/LocalUserType.tsx";
import PrimaryButton from "../components/Button/PrimaryButton.tsx";
import UserList from "../components/UserList/UserList.tsx";

export const AdminHomepage: React.FC = () => {



    return (
        <div>
            <UserList/>
        </div>
    );
}