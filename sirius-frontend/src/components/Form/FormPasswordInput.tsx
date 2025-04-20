import React, { useState } from "react";
import {EyeSvg} from "../../assets/EyeSvg.tsx";
import './FormPasswordInput.css';

interface FormPasswordInputProps {
    value: string;
    onChange: (value: string) => void;
}

const FormPasswordInput: React.FC<FormPasswordInputProps> = ({ value, onChange }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="FormPasswordInput__container" style={{ position: "relative", width: "100%" }}>
            <input
                type={visible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Password"
                required
                style={{ width: "100%", paddingRight: "40px" }}
            />

            <span className={"FormPasswordInput__cta-eye"}
                onClick={() => setVisible(!visible)}
            >
                <EyeSvg/>
            </span>
        </div>
    );
};

export default FormPasswordInput;
