import React, {ReactNode} from "react";
import {SignpostPromoContainer} from "./SignpostPromoContainer.tsx";

interface SignpostPromoProps {
    children: ReactNode
}

export const SignpostPromo: React.FC<SignpostPromoProps> = ({children}) => {


    return (
        <SignpostPromoContainer>
            {children}
        </SignpostPromoContainer>
    )
}