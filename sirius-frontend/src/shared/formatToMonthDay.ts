export const formatToMonthDay = (input: string | Date | { toDate: () => Date }): string => {
    let date: Date;

    if (typeof input === "string") {
        const [year, month, day] = input.split("-").map(Number);
        date = new Date(year, month - 1, day);
    } else if (input instanceof Date) {
        date = input;
    } else if (typeof input === "object" && typeof input.toDate === "function") {
        date = input.toDate();
    } else {
        throw new Error("Unsupported date format");
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
};
