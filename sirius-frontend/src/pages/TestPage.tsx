import React, {useState} from "react";
import Signpost from "../components/Signpost/Signpost.tsx";
import {Test} from "../templates/Test/Test.tsx";
import ErrorModal from "../components/Modal/ErrorModal.tsx";
import Button from "../components/Button/Button.tsx";
import PrimaryButton from "../components/Button/PrimaryButton.tsx";

export const TestPage: React.FC = () => {

    return (
        <>
            <div className="Test__content-wrapper fade-in">
                <Signpost eyebrow="ACTIVATION" title="Take the Sirius Talent test" text="To activate your account, you must complete a short test based on our performer guidelines. You can review the required materials by clicking the button below. The quiz is quick, simple, and ensures you understand the key rules of working on set."
                button={<PrimaryButton text="View required materials" href="https://sirius-talent-agency.onrender.com/information/actors/quick-guide"/>}>
                    <Test/>
                </Signpost>
            </div>
        </>
    );
}