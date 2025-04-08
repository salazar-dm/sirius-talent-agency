import React, {useCallback, useEffect} from "react";
import "./FormSelect.css";
import "../../App.css";
import {DropdownSvg} from "../../assets/DropdownSvg.tsx";
import FilterDropdown from "../Filter/FilterDropdown.tsx";
import FilterDropdownLine from "../Filter/FilterDropdownLine.tsx";

interface FormSelectProps {
    label?: string;
    select: {
        id: string;
        onChange: (value: any) => void;
        options: OptionProps[];
        required: boolean;
        defaultValue?: any;
    };
    className?: string;
    triggerSubmit?: Function | boolean;
}

interface OptionProps {
    label: string,
    value: any
}

export const FormSelect: React.FC<FormSelectProps> = ({label, select, className, triggerSubmit}) => {
    const [selectedOption, setSelectedOption] = React.useState<OptionProps | null>(null);
    const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const onOptionClick = (option: OptionProps) => {
        setSelectedOption(option);
        select.onChange(option.value);
    };

    const resetFormField = useCallback(() => {
        setSelectedOption(null);
        setDropdownOpen(false);
        setError(null);
        console.log("resetFormField");
    }, []);

    useEffect(() => {
        if (select.defaultValue !== undefined && select.options.length > 0) {
            const found = select.options.find(opt => opt.value === select.defaultValue);
            if (found) {
                setSelectedOption(found);
            }
        } else if (triggerSubmit !== undefined) {
            resetFormField();
        }
    }, [triggerSubmit, resetFormField, select.defaultValue, select.options]);

    return (
        <div className={`FormSelect__select-container ${className || ''}`}>
            {label && <label htmlFor={select.id} className="FormSelect__label">{label}</label>}
            <div className="FormSelect__select">
                <div
                    className="FormSelect__select-placeholder"
                    role="button"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                    <span className="Filter__placeholder">{selectedOption?.label || ""}</span>
                    <DropdownSvg/>
                </div>
                <div className={`Filter__dropdown ${isDropdownOpen ? 'Filter__dropdown--open' : ''}`}>
                    <FilterDropdown>
                        {select.options.map((option) => (
                            <FilterDropdownLine
                                key={option.value}
                                text={option.label}
                                isLineSelected={selectedOption?.value === option.value}
                                onCriteriaClick={() => onOptionClick(option)}
                            />
                        ))}
                    </FilterDropdown>
                </div>
            </div>
        </div>
    );
};
