import React, {useEffect} from "react";
import "./InputRange.css";
import "../../App.css";
import ReactSlider from "react-slider";
import styled from 'styled-components';
import {ClearButton} from "../Button/ClearButton.tsx";

interface InputRangeProps {
    id?: string
    title?: string
    borders: BorderType
    onChange: (value: BorderType) => void
    onClear?: () => void
}

type BorderType = {
    min: number
    max: number
}

export const InputRange: React.FC<InputRangeProps> = ({id, title, borders, onChange, onClear}) => {
    const [value, setValue] = React.useState<[number, number]>([borders.min, borders.max]);

    const onValueChange = (updatedValue: [number, number]) => {
        setValue(updatedValue);
        formatAndSubmitValue(updatedValue);
    }

    const onClearValue = () => {
        setValue([borders.min, borders.max]);
        formatAndSubmitValue([borders.min, borders.max]);
        if (onClear) onClear();
    }

    const formatAndSubmitValue = (updatedValue: [number, number]) => {
        const formattedUpdatedValue = {
            min: updatedValue[0],
            max: updatedValue[1]
        }

        onChange(formattedUpdatedValue);
    }

    useEffect(() => {
        if (value[0] === borders.min && value[1] === borders.max) {
            if (onClear) onClear();
        }
    }, [value]);

    return (
        <>
            <div className="InputDualSlider__container">
                <ReactSlider
                    className="InputDualSlider__slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    value={value}
                    onChange={onValueChange}
                    min={borders.min}
                    max={borders.max}
                    step={1}
                    renderThumb={(props, state) =>
                        <div {...props}>
                            <div className="InputDualSlider__label">{state.valueNow}</div>
                        </div>
                    }
                />
            </div>
            <ClearButton text="Clear" onClick={onClearValue}/>
        </>
    )
}