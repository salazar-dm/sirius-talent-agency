import React from "react";
import HeaderHub from "../components/HeaderHub/HeaderHub.tsx";
import ContentBlockWrapper from "../components/ContentBlockWrapper/ContentBlockWrapper.tsx";

export const ContactUs: React.FC = () => {

    return (
        <ContentBlockWrapper>
            <HeaderHub title="Contact us" text="Please use the special emegrency number if you need urgent help"/>
        </ContentBlockWrapper>
    )
}