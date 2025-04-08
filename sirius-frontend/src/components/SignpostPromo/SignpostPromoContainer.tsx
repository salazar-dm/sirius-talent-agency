import React from "react";
import "./SignpostPromoContainer.css"

interface SignpostPromoContainerProps {
    children: React.ReactNode
}

export const SignpostPromoContainer: React.FC<SignpostPromoContainerProps> = ({children}) => {
    return (
        <>
            <div className="SignpostPromoContainer__container">
                <div className="Grid_grid__container">
                    {children}
                </div>
            </div>
        </>
    )
}