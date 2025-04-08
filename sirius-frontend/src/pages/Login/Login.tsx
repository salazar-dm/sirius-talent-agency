import React from 'react';
import HeaderDetail from "../../templates/HeaderDetail/HeaderDetail.tsx";
import LoginForm from "../../components/LoginForm/LoginForm.tsx";
import HeaderDetailSvgMonogramRed from "../../templates/HeaderDetail/HeaderDetailSvgMonogramRed.tsx";

const LoginPage: React.FC = () => {


    return (
        <>
            <HeaderDetail form={<LoginForm/>} monogram={<HeaderDetailSvgMonogramRed/>} title="Login"/>
        </>
    );
};

export default LoginPage;