import React from "react";
import {ProductionDayType} from "../../types/ProductionDayType.tsx";
import "./ProductionDayForm.css";
import "../../App.css";
import {ProductionDayFormContainer} from "./ProductionDayFormContainer.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import {FormInput} from "../Form/FormInput.tsx";
import {FormDatePicker} from "../Form/FormDatePicker.tsx";
import {DateObject} from "react-multi-date-picker";
import {FormGuide} from "../Form/FormGuide.tsx";
import {FormSelect} from "../Form/FormSelect.tsx";
import {FormMessage} from "../Form/FormMessage.tsx";

interface ProductionDayFormProps {
    productionDay: Partial<ProductionDayType>;
    onProductionDaySubmit: (productionDay: Partial<ProductionDayType>, dates: DateObject[]) => void;
}

const ProductionDayForm: React.FC<ProductionDayFormProps> = ({productionDay, onProductionDaySubmit}) => {
    const [updatedProductionDay, setUpdatedProductionDay] = React.useState<Partial<ProductionDayType>>(productionDay);

    const [updatedDates, setUpdatedDates] = React.useState<DateObject[]>([]);

    // TODO: total 4 phases and such a division to continuity / non-continuity

    React.useEffect(() => {
        console.log(updatedProductionDay)
    }, [updatedProductionDay])
    
    return (
        <ProductionDayFormContainer>
            <form className="ProductionDayForm__form" onSubmit={() => onProductionDaySubmit(updatedProductionDay, updatedDates)}>
                <FormInput label="Production"
                           input={{
                               type: "text",
                               id: "ProductionDayForm__production",
                               name: "production",
                               value: updatedProductionDay.production || "",
                               onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                   setUpdatedProductionDay(prev => ({...prev, production: event.target.value}));
                               },
                               required: true
                           }}
                           className="half-width"
                />
                <FormDatePicker label="Dates"
                                input={{
                                    id: "ProductionDayForm__dates",
                                    name: "dates",
                                    value: updatedDates,
                                    onChange: (updatedDates: DateObject[]) => setUpdatedDates(updatedDates),
                                    required: true
                                }}
                                className="half-width"
                                guide={<FormGuide text="Select multiple dates for the strict continuity"/>}
                />
                <FormSelect label="Union"
                            select={{
                                id: "ProductionDayForm__union",
                                onChange: (value: any) => setUpdatedProductionDay(prev => ({...prev, union: value})),
                                options: [
                                    {label: "ACTRA", value: "ACTRA"},
                                    {label: "Non-Union", value: "Non-Union"}
                                ],
                                required: true
                            }}
                            className="half-width"
                />
                <FormInput label="Location"
                           input={{
                               type: "text",
                               id: "ProductionDayForm__location",
                               name: "location",
                               value: updatedProductionDay.location || "",
                               onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                   setUpdatedProductionDay(prev => ({...prev, location: event.target.value}));
                               },
                               required: true
                           }}
                           className="half-width"
                />
                <FormSelect label="Interior/Exterior"
                            select={{
                                id: "ProductionDayForm__interiorExterior",
                                onChange: (value: any) => setUpdatedProductionDay(prev => ({...prev, exterior: value})),
                                options: [
                                    {label: "Interior", value: "Interior"},
                                    {label: "Exterior", value: "Exterior"},
                                    {label: "Interior and Exterior", value: "Interior and Exterior"}
                                ],
                                required: true
                            }}
                            className="half-width"
                />
                <FormSelect label="Self Drive Only"
                            select={{
                                id: "ProductionDayForm__selfDriveOnly",
                                onChange: (value: any) => setUpdatedProductionDay(prev => ({...prev, selfDriveOnly: value})),
                                options: [
                                    {label: "Yes", value: true},
                                    {label: "No", value: false}
                                ],
                                required: true
                            }}
                            className="half-width"
                />
                <FormMessage label="Message"
                             input={{
                                 id: "ProductionDayForm__message",
                                 onChange: (text: string) => setUpdatedProductionDay(prev => ({...prev, notes: text})),
                                 required: true
                             }}
                             className="full-width"
                />
                <PrimaryButton type="submit" text="Submit"/>
            </form>
        </ProductionDayFormContainer>
    )
}

export default ProductionDayForm