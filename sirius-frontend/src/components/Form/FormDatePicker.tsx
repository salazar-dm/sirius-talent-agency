import React, {ReactNode} from "react";
import "./FormDatePicker.css";
import "../../App.css";
import DatePicker, {DateObject} from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

interface FormDatePickerProps {
    label?: string;
    input: {
        id: string;
        name: string;
        value: DateObject[];
        onChange: (dates: DateObject[]) => void;
        placeholder?: string;
        required?: boolean;
    };
    errorMessage?: string;
    className?: string;
    guide?: ReactNode;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({label, input, errorMessage, className, guide}) => {

    return (
        <div className={`FormDatePicker__dates-container ${className || ''}`}>
            <span className="FormDatePicker__row-container">
                {label && <label htmlFor={input.id}>{label}</label>}
                {guide && <div className="FormDatePicker__guide">{guide}</div>}
            </span>
            <DatePicker
                multiple
                sort
                value={input.value.map(date => new DateObject(date))}
                onChange={(dates: DateObject[]) => input.onChange(dates)}
                className={`FormDatePicker__dates green`}
                plugins={[
                    <DatePanel/>
                ]}
            />
        </div>
    )
}