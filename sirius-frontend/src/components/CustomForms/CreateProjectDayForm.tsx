import React, {useEffect, useState} from "react";
import {FormInput} from "../Form/FormInput.tsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {emptyProjectDay, ProjectDayType} from "../../types/ProjectDayType.ts";
import "../../App.css";
import "./CreateProjectDayForm.css";
import {FormSelect} from "../Form/FormSelect.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import {FormDatePicker} from "../Form/FormDatePicker.tsx";
import {DateObject} from "react-multi-date-picker";
import {FormGuide} from "../Form/FormGuide.tsx";
import SecondaryButton from "../Button/SecondaryButton.tsx";

export const CreateProjectDayForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [projectDay, setProjectDay] = useState<ProjectDayType>(emptyProjectDay);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectName = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/project/read/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProjectDay(prev => ({ ...prev, title: response.data.name }));
            } catch (error) {
                console.error("Failed to fetch project name", error);
            }
        };

        if (id) {
            fetchProjectName();
        }
    }, [id]);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const formattedDates = projectDay.dates.map(date =>
                date.toDate().toISOString().split("T")[0]
            );

            const payload = {
                ...projectDay,
                dates: formattedDates
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/project/${id}/create-day`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Created day ID:", response.data);
            // navigate(`/project/${id}/days/${response.data}`);
        } catch (error) {
            console.error("Failed to create project day:", error);
        }
    };


    return (
        <>
            <div className="ProjectDayForm__container">
                <form className={"ProjectDayForm__form"} onSubmit={handleSubmit}>
                    <h3 className={"ProjectDayForm__form-title full-width"}>General Info</h3>
                    <FormInput label="Title *"
                               input={{
                                   type: "text",
                                   id: "ProductionDayForm__title",
                                   name: "title",
                                   value: projectDay.title || "",
                                   onChange: (e) => setProjectDay(prev => ({...prev, title: e.target.value})),
                                   required: true
                               }}
                               className="half-width"
                    />

                    <FormInput label="Set location (City) *"
                               input={{
                                   type: "text",
                                   id: "ProductionDayForm__location",
                                   name: "location",
                                   value: projectDay.location || "",
                                   onChange: (e) => setProjectDay(prev => ({...prev, location: e.target.value})),
                                   required: true
                               }}
                               className="half-width"
                    />

                    <FormSelect
                        label="Shuttle *"
                        select={{
                            id: "shuttle",
                            required: true,
                            options: [
                                {label: "Available", value: "Available"},
                                {label: "Not Available", value: "Not Available"}
                            ],
                            onChange: (value) => setProjectDay(prev => ({...prev, shuttle: value})),
                            defaultValue: projectDay.shuttle
                        }}
                        className="half-width"
                    />

                    <FormDatePicker
                        label="Dates *"
                        input={{
                            id: "ProductionDayForm__dates",
                            name: "dates",
                            value: projectDay.dates,
                            onChange: (updatedDates: DateObject[]) => setProjectDay(prev => ({
                                ...prev,
                                dates: updatedDates
                            })),
                            required: true
                        }}
                        className="half-width"
                        guide={<FormGuide text="Select multiple dates for the strict continuity"/>}
                    />

                    <h3 className={"ProjectDayForm__form-title full-width"}>Rate and Documents</h3>

                    <FormInput
                        label="Rate *"
                        input={{
                            type: "text",
                            id: "ProductionDayForm__rate",
                            name: "rate",
                            value: projectDay.rate || "",
                            onChange: (e) => setProjectDay(prev => ({...prev, rate: e.target.value})),
                            required: true

                        }}
                    />
                    <FormInput
                        label="Required Documents"
                        input={{
                            as: "textarea",
                            id: "ProductionDayForm__required-documents",
                            name: "requiredDocuments",
                            value: projectDay.requiredDocuments || "",
                            onChange: (e) => setProjectDay(prev => ({...prev, requiredDocuments: e.target.value}))
                        }}
                    />

                    <h3 className={"ProjectDayForm__form-title full-width"}>Notes</h3>

                    <FormInput
                        label="Notes"
                        input={{
                            as: "textarea",
                            id: "ProductionDayForm__notes",
                            name: "notes",
                            value: projectDay.notes || "",
                            onChange: (e) => setProjectDay(prev => ({...prev, notes: e.target.value})),
                        }}
                    />

                    <SecondaryButton text="Submit"
                                     type="submit"/>
                </form>
            </div>
        </>
    )
}