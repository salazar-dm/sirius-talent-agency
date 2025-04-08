import React from "react";
import {SignpostMenuContainer} from "./SignpostMenuContainer.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface SignpostMenuProps {
    children: React.ReactNode[]
}

export const SignpostMenu: React.FC<SignpostMenuProps> = ({children}) => {
    if (children.length < 2) {
        return (<><div className="Error__error">Error</div></>)
    }

    return (
        <SignpostMenuContainer>
            <div className="Grid_grid__item"
            style={columnsStyle(1, 9, 1, 9, 2, 6, 3, 7)}>
                {children[0]}
            </div>
            <div className="Grid_grid__item"
            style={columnsStyle(1, 9, 1, 9, 9, 16, 9, 15)}>
                {children[1]}
            </div>
        </SignpostMenuContainer>
    )
}