import React, { useEffect, useState, useCallback } from "react";
import "./FormSelect.css";
import "../../App.css";

interface FormNumericInputProps {
    label?: string;
    input: {
        id: string;
        onChange: (value: number | string) => void; // теперь может быть строка
        required: boolean;
        defaultValue?: number;
        placeholder?: string;
        min?: number;
        max?: number;
    };
    className?: string;
    triggerSubmit?: Function | boolean;
}

export const FormNumericInput: React.FC<FormNumericInputProps> = ({
                                                                      label,
                                                                      input,
                                                                      className,
                                                                      triggerSubmit
                                                                  }) => {
    const [value, setValue] = useState<string>("");

    const resetField = useCallback(() => {
        setValue("");
    }, []);

    useEffect(() => {
        if (input.defaultValue !== undefined) {
            setValue(input.defaultValue.toString());
        } else if (triggerSubmit !== undefined) {
            resetField();
        }
    }, [triggerSubmit, resetField, input.defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        // если пусто — передаём ""
        if (newValue === "") {
            input.onChange("");
            return;
        }

        const parsed = parseFloat(newValue);
        if (!isNaN(parsed)) {
            input.onChange(parsed);
        }
    };

    return (
        <div className={`FormSelect__select-container ${className || ""}`}>
            {label && <label htmlFor={input.id} className="FormSelect__label">{label}</label>}
            <input
                id={input.id}
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                step="0.1"
                value={value}
                onChange={handleChange}
                placeholder={input.placeholder || ""}
                min={input.min}
                max={input.max}
                className="FormSelect__input"
                required={input.required}
            />
        </div>
    );
};
