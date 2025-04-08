import React from 'react';

export const columnsStyle = (smStart: number, smEnd: number,
                             mdStart: number, mdEnd: number,
                             lgStart: number, lgEnd: number,
                             xlStart: number, xlEnd: number): React.CSSProperties => {
    return {
        '--sm-start': `${smStart}`,
        '--sm-end': `${smEnd}`,
        '--md-start': `${mdStart}`,
        '--md-end': `${mdEnd}`,
        '--lg-start': `${lgStart}`,
        '--lg-end': `${lgEnd}`,
        '--xl-start': `${xlStart}`,
        '--xl-end': `${xlEnd}`,
        maxWidth: '100vw'
    } as React.CSSProperties;
}