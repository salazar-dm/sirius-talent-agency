import React, { useState } from "react";
import Question from "../../types/QuestionType.tsx";
import "./Test.css"
import { testQuestions } from "./testQuestions.tsx";
import PrimaryButton from "../../components/Button/PrimaryButton.tsx";
import ErrorModal from "../../components/Modal/ErrorModal.tsx";
import axios from "axios";
import {CheckSvg} from "../../assets/CheckSvg.tsx";

export const Test: React.FC = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number[] }>({});
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const token = localStorage.getItem("token");

    const handleOptionChange = (question: Question, optionIndex: number) => {
        setSelectedAnswers((prev) => {
            const current = prev[question.id] || [];
            if (question.type === "single") {
                return { ...prev, [question.id]: [optionIndex] };
            } else {
                const isSelected = current.includes(optionIndex);
                const updated = isSelected
                    ? current.filter((i) => i !== optionIndex)
                    : [...current, optionIndex];
                return { ...prev, [question.id]: updated };
            }
        });
    };

    const handleSuccess = async () => {
        try {
            await axios.post(
                "https://sirius-talent-agency.onrender.com/api/auth/activate",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (e) {
            console.error("Activation failed", e);
        } finally {
            setSuccessModal(true)
        }
    };

    const handleSubmit = () => {
        let totalScore = 0;

        testQuestions.forEach((question) => {
            const selected = selectedAnswers[question.id] || [];

            const correct = [...question.correctAnswers].sort((a, b) => a - b);
            const selectedSorted = [...selected].sort((a, b) => a - b);

            const isCorrect =
                correct.length === selectedSorted.length &&
                correct.every((val, index) => val === selectedSorted[index]);

            if (isCorrect) {
                totalScore += 1;
            }
        });

        if (totalScore >= 16) {
            handleSuccess();

        } else {
            setErrorModal(true);
        }
    };

    const handleSuccessModalClose = () => {
        window.location.href = "/performer";
    };



    const handleReset = () => {
        setErrorModal(false);
        setSelectedAnswers({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {successModal && <ErrorModal onClose={() => handleSuccessModalClose()} title="Success!" message="Your account is now activated."/>}
            {errorModal && <ErrorModal onClose={() => handleReset()} title="Error!" message="Failed to activate your account. Please try again."/>}
            <div className="Test__container">
                {testQuestions.map((question) => (
                    <div key={question.id} className="Test__question-block">
                        <p className="Test__question">{question.id}. {question.question}</p>
                        {question.type === "single" ? <></> : <p className="Test__multiple-choice">Choose all that apply</p>}
                        <div className="Test__options">
                            {question.options.map((option, index) => {
                                const isSelected = selectedAnswers[question.id]?.includes(index) || false;
                                return (
                                    <div key={index} className="Test__option-container">
                                        <input
                                            type={question.type === "single" ? "radio" : "checkbox"}
                                            name={`question-${question.id}`}
                                            value={index}
                                            checked={isSelected}
                                            onChange={() => handleOptionChange(question, index)}
                                        />
                                        <span className="Test__line-checkbox">{isSelected ?
                                            <CheckSvg/> : null}</span>
                                        <label className="Test__option-label">{option}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <PrimaryButton onClick={handleSubmit} text="Submit"/>
            </div>
        </>
    )
};
