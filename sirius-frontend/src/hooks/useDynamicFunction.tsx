import React from "react";

export const useDynamicFunction = (initialFunc: Function) => {
    const [func, setFunc] = React.useState<Function>(() => initialFunc);

    const changeReference = React.useCallback(() => {
        setFunc(() => () => {
            console.log("Dynamic function executed");
        });
    }, []);

    const executeFunction = React.useCallback(() => {
        func();
        changeReference();
    }, [func, changeReference]);

    return [func, executeFunction];
}