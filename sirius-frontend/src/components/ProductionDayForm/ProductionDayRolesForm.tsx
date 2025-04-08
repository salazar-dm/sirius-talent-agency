import React, {useEffect} from "react";
import "./ProductionDayRolesForm.css";
import "../../App.css";
import {ProductionDayType, RoleType} from "../../types/ProductionDayType.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {FormInput} from "../Form/FormInput.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import Role from "./Role.tsx";
import {FormSelect} from "../Form/FormSelect.tsx";
import {useDynamicFunction} from "../../hooks/useDynamicFunction.tsx";


interface ProductionDayRolesFormProps {
    productionDay: Partial<ProductionDayType>;
    onProductionDayRolesSubmit: (productionDay: Partial<ProductionDayType>) => void;
}


const ProductionDayRolesForm: React.FC<ProductionDayRolesFormProps> = ({productionDay, onProductionDayRolesSubmit}) => {
    const [updatedProductionDay, setUpdatedProductionDay] = React.useState<Partial<ProductionDayType>>(productionDay);
    const [role, setRole] = React.useState<RoleType>({
        name: "",
        available: 0,
        max: 0,
        isSSE: false,
    });

    const onRolesChange = (role: RoleType) => {
        const updatedRole = {...role}

        if (updatedRole.isSSE) {
            updatedRole.name = "SSE " + updatedRole.name;
        }

        executeResetForm();

        setUpdatedProductionDay((prev) => ({
            ...prev,
            roles: prev.roles ? [...prev.roles, updatedRole] : [updatedRole]
        }));

        setRole({name: "", available: 0, max: 0, isSSE: false});
    }

    const [resetForm, executeResetForm] = useDynamicFunction(() => {
        console.log("resetForm")
    })

    useEffect(() => {
        console.log(updatedProductionDay)
    }, [updatedProductionDay]);

    useEffect(() => {
        console.log(role)
    }, [role]);

    return (
        <div className="Grid_grid__container">
            <div className="Grid_grid__item"
                 style={columnsStyle(1, 9, 1, 9, 3, 8, 3, 8)}>
                <div className="ProductionDayRolesForm__form">
                    <FormInput label="Role"
                               input={{
                                   type: "text",
                                   id: "ProductionDayRolesForm__role-name",
                                   name: "role",
                                   value: role.name || "",
                                   onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                       setRole((prev) => ({...prev, name: event.target.value}));
                                   },
                                   required: true
                               }}
                               className="ProductionDayRolesForm__name-input"
                    />
                    <FormInput label="Maximum slots"
                               input={{
                                   type: "number",
                                   id: "ProductionDayRolesForm__role-max",
                                   name: "max",
                                   value: role.max.toString() || "",
                                   onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                       setRole((prev) => ({...prev, max: parseInt(event.target.value)}));
                                   }
                               }}
                               className="ProductionDayRolesForm__max-input"
                    />
                    <FormSelect label="SSE rate"
                                select={{
                                    id: "ProductionDayRolesForm__role-sse",
                                    onChange: (value: any) => setRole((prev) => ({...prev, isSSE: value})),
                                    options: [
                                        {label: "Yes", value: true},
                                        {label: "No", value: false}
                                    ],
                                    required: true
                                }}
                                className="ProductionDayRolesForm__sse-input"
                                triggerSubmit={resetForm}
                    />
                    <button className="ProductionDayRolesForm__add-button-container"
                            onClick={() => onRolesChange(role)}>
                        <span className="ProductionDayRolesForm__add-button">Add new role</span>
                    </button>
                </div>
            </div>
            <div className="Grid_grid__item"
                 style={columnsStyle(1, 9, 1, 9, 10, 16, 10, 16)}>
                <div className="ProductionDayRolesForm__explorer">
                    <div className="ProductionDayRolesForm__list-item">
                        {updatedProductionDay.roles?.map((role, index) => (
                            <Role role={role} index={index} onDelete={() => setUpdatedProductionDay((prev) => ({...prev, roles: prev.roles?.filter((existingRole) => existingRole.name !== role.name)}))}/>
                        ))}
                    </div>
                    <div className="ProductionDayRolesForm__submit-button">
                        <PrimaryButton text="Submit"
                                       onClick={() => onProductionDayRolesSubmit(updatedProductionDay)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductionDayRolesForm