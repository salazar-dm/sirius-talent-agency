import React, {useEffect} from "react";
import "./InputSelectMultiple.css";
import "../../App.css";
import {CheckSvg} from "../../assets/CheckSvg.tsx";
import {ClearButton} from "../Button/ClearButton.tsx";

interface InputSelectMultipleProps {
    id?: string
    title?: string
    options: string[]
    onChange: (value: string[]) => void
    onClear?: () => void
}

export const InputSelectMultiple: React.FC<InputSelectMultipleProps> = ({id, title, options, onChange, onClear}) => {
    const [value, setValue] = React.useState<string[]>([]);

    const onValueChange = (updatedValue: string) => {
        let updatedValueArray;

        if (!value.includes(updatedValue)) {
            updatedValueArray = [...value, updatedValue];
        } else {
            updatedValueArray = value.filter((value) => value !== updatedValue);
        }

        setValue(updatedValueArray);
        onChange(updatedValueArray);
    }

    const onClearValue = () => {
        setValue([]);
        onChange([]);
        if (onClear) onClear();
    }

    useEffect(() => {
        if (value.length === 0) {
            if (onClear) onClear();
        }
    }, [value]);

    return (
        <>
            <div className="InputSelect__container">
                {options.map((option) => (
                    <div key={option} className="InputSelect__option" onClick={() => onValueChange(option)} role={"button"}>
                        <span className="InputSelect__checkbox">{value.includes(option) ? <CheckSvg/> : null}</span>
                        <span className="InputSelect__option-text">{option}</span>
                    </div>
                ))}
            </div>
            <ClearButton text="Clear" onClick={onClearValue}/>
        </>
    )
}