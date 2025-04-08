import React from "react";

export const numberOfColumnsStyle = (numberOfColumns: number): React.CSSProperties => {
    return {
        '--number-of-columns': `${numberOfColumns}`,
    } as React.CSSProperties;
}