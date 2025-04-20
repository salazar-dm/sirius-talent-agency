const CUSTOM_TITLES: Record<string, string> = {
    "/": "Sirius Talent",
    "*": "Sirius Talent",
};

const autoFormatTitle = (path: string): string => {
    const parts = path.split("/").filter(Boolean);
    const slug = parts[parts.length - 1] || "";
    if (!slug) return "Sirius Talent";
    return slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const getPageTitle = (path: string): string => {
    return CUSTOM_TITLES[path] || autoFormatTitle(path) || CUSTOM_TITLES["*"];
};
