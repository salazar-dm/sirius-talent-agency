import React, { useCallback, useEffect, useRef, useState } from "react";
import "./FormSelect.css";
import "../../App.css";
import { DropdownSvg } from "../../assets/DropdownSvg.tsx";
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
    label: string;
    value: any;
}

export const FormSelect: React.FC<FormSelectProps> = ({
                                                          label,
                                                          select,
                                                          className,
                                                          triggerSubmit
                                                      }) => {
    const [selectedOption, setSelectedOption] = useState<OptionProps | null>(null);
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const onOptionClick = (option: OptionProps) => {
        setSelectedOption(option);
        select.onChange(option.value);
        setDropdownOpen(false); // сразу закрыть после выбора
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

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div
            className={`FormSelect__select-container ${className || ""}`}
            ref={containerRef}
        >
            {label && (
                <label htmlFor={select.id} className="FormSelect__label">
                    {label}
                </label>
            )}
            <div className="FormSelect__select">
                <div
                    className="FormSelect__select-placeholder"
                    role="button"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                    <span className="Filter__placeholder">
                        {selectedOption?.label || ""}
                    </span>
                    <DropdownSvg />
                </div>
                <div
                    className={`Filter__dropdown ${
                        isDropdownOpen ? "Filter__dropdown--open" : ""
                    }`}
                >
                    <FilterDropdown>
                        {select.options.map(option => (
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
