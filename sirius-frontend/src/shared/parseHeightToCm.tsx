const parseHeightToCm = (input: string): number | null => {
    const cleaned = input.trim().replace(/[^0-9']/g, '');

    const regex = /^(\d{1})'?(\d{1,2})?$/;
    const match = cleaned.match(regex);

    if (!match) return null;

    const feet = parseInt(match[1], 10);
    const inches = parseInt(match[2] || "0", 10);

    if (isNaN(feet) || isNaN(inches)) return null;

    const totalInches = feet * 12 + inches;
    const cm = Math.round(totalInches * 2.54);

    return cm;
};

const formatInput = (value: string): string => {
    const digitsOnly = value.replace(/[^0-9]/g, '');

    if (digitsOnly.length === 0) return '';
    if (digitsOnly.length === 1) return `${digitsOnly}'`;         // 6 → 6'
    if (digitsOnly.length <= 3) return `${digitsOnly[0]}'${digitsOnly.slice(1)}`; // 62 → 6'2
    if (digitsOnly.length > 3) return `${digitsOnly[0]}'${digitsOnly.slice(1, 3)}`;

    return value; // fallback
};

export {parseHeightToCm, formatInput}