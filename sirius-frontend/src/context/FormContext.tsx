import React, {useContext} from "react";

interface FormContextProps {
    onSubmitReference: Function
}

export const FormContext = React.createContext<FormContextProps>({
    onSubmitReference: Function
});

export const useOnSubmitReference = () => {
    const ctx = useContext(FormContext);
    if (!ctx) {
        throw new Error('useOnSubmitReference must be used within a FormProvider');
    }
    return ctx.onSubmitReference;
}