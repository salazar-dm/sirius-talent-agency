import React, {useEffect, useState} from "react";
import "../../App.css"
import "./AdminMailSender.css"
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {usePerformerById} from "../../hooks/usePerformerById.ts";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import SecondaryButton from "../Button/SecondaryButton.tsx";
import axios from "axios";
import {FormSelect} from "../Form/FormSelect.tsx";

interface AdminMailSenderProps {
    id: string;
}

export const AdminMailSender: React.FC<AdminMailSenderProps> = ({ id }) => {
    const { performer, loading } = usePerformerById(id);

    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [signature, setSignature] = useState("asya");
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    if (loading || !performer) return <LoadingOverlay />;

    const handleSend = async () => {
        setSending(true);
        setSuccess(false);
        setError("");

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/admin/users/email-to`,
                {
                    email: performer.email,
                    subject: subject,
                    body: body,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSuccess(true);
        } catch (err: any) {
            setError(err?.response?.data || "Failed to send email");
        } finally {
            setSending(false);
        }
    };



    return (
        <div className="Grid_grid__container Grid_grid__container__margin">
            <div
                className="Grid_grid__item"
                style={columnsStyle(1, 9, 1, 9, 2, 16, 2, 16)}
            >
                <div className="AdminMailSender__container">
                    <ul className="AdminMailSender__list">
                        <li className="AdminMailSender__list-item">
                            <h3 className="AdminMailSender__list-item__label">
                                Name:
                            </h3>
                            <div className="AdminMailSender__list-item__text">
                                {performer.profile.firstName}{" "}
                                {performer.profile.lastName}
                            </div>
                        </li>
                        <li className="AdminMailSender__list-item">
                            <h3 className="AdminMailSender__list-item__label">
                                Email:
                            </h3>
                            <div className="AdminMailSender__list-item__text">
                                {performer.email}
                            </div>
                        </li>
                        <li id={"input-field"} className="AdminMailSender__list-item">
                            <h3 className="AdminMailSender__list-item__label">
                                Subject:
                            </h3>
                            <input
                                className="AdminMailSender__list-item__text"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </li>
                        <li id={"input-field"} className="AdminMailSender__list-item">
                            <h3 className="AdminMailSender__list-item__label">
                                Message:
                            </h3>
                            <textarea
                                className="AdminMailSender__list-item__text"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </li>
                        <li id={"input-field"} className="AdminMailSender__list-item">
                            <h3 className="AdminMailSender__list-item__label">
                                Sent by:
                            </h3>
                            <FormSelect
                                select={{
                                    id: "signature-selector",
                                    onChange: (val) => setSignature(val),
                                    options: [
                                        { label: "Asya", value: "asya" },
                                        { label: "Igor", value: "igor" }
                                    ],
                                    required: true,
                                    defaultValue: signature,
                                }}
                                className="AdminMailSender__list-item__select"
                            />

                        </li>

                        <SecondaryButton
                            text={sending ? "Sending..." : "Send email"}
                            onClick={handleSend}
                        />

                        {success && (
                            <div className="AdminMailSender__success">
                                Email sent successfully
                            </div>
                        )}
                        {error && (
                            <div className="AdminMailSender__error">
                                {error}
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};