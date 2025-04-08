import React, {ReactNode, useCallback} from "react";
import "./Form.css";
import "../../App.css";
import {useDynamicFunction} from "../../hooks/useDynamicFunction.tsx";
import {FormContext} from "../../context/FormContext.tsx";

interface FormProps {
    children: ReactNode
    onSubmit: Function
}

const Form: React.FC<FormProps> = ({children, onSubmit}) => {

    const [onSubmitReference, executeOnSubmit] = useDynamicFunction(onSubmit);

    return (
        <div role="form" className="Form__form">
            {children}
            <button className="Form__submit" onClick={() => executeOnSubmit()}>Submit</button>
        </div>
    )
}

export default Form

