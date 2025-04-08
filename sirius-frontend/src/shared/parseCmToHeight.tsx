const parseCmToHeight = (cm: number): string => {
    if (isNaN(cm) || cm <= 0) return "";

    const totalInches = Math.round(cm / 2.54);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;

    return `${feet}'${inches}`;
};

export {parseCmToHeight}