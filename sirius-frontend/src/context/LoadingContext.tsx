import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext<{
    loading: boolean;
    setLoading: (value: boolean) => void;
}>({ loading: false, setLoading: () => {} });

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingContext