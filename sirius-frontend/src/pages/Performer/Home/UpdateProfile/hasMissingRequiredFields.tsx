import { PerformerProfile } from "./UpdateProfile.tsx";

export const getMissingRequiredFields = (
    profile: PerformerProfile | null,
    imagesSelected: boolean
): string[] => {
    if (!profile) return ["Profile"];

    const isEmpty = (val: any) =>
        val === "" || val === null || val === undefined || val === 0;

    const requiredFields: string[] = [
        "firstName", "lastName", "dateOfBirth", "city", "state", "postalCode", "gender",
        "ethnicity", "hairColor", "eyeColor", "sizeHeight", "sizeWeight", "sizeChest",
        "sizeWaist", "sizeHips", "sizeShoe", "sizeInseam"
    ];

    // Union ID (if applicable)
    if (
        profile.unionStatus === "AABP" ||
        profile.unionStatus === "ACTRA Apprentice" ||
        profile.unionStatus === "ACTRA Full"
    ) {
        requiredFields.push("unionId");
    }

    // Male or Non-Binary-Male
    if (profile.gender === "male" || profile.gender === "non-binary-male") {
        requiredFields.push("sizeJacket", "sizeSleeve", "sizeNeck", "sizeHat");
    }

    // Female or Non-Binary-Female
    if (profile.gender === "female" || profile.gender === "non-binary-female") {
        requiredFields.push("sizeDress", "sizeBustCup", "sizeBustBand");
    }

    const missingFields: string[] = requiredFields.filter(field =>
        isEmpty((profile as any)[field])
    );

    if (!imagesSelected && (profile.keyName === "" && profile.fullBodyKeyName === "")) {
        missingFields.push("Image");
    }

    console.log(profile.keyName, profile.fullBodyKeyName)

    const fieldNameMap: Record<string, string> = {
        firstName: "First Name",
        lastName: "Last Name",
        dateOfBirth: "Date of Birth",
        city: "City",
        state: "Province",
        postalCode: "Postal Code",
        gender: "Gender",
        ethnicity: "Ethnicity",
        hairColor: "Hair Color",
        eyeColor: "Eye Color",
        sizeHeight: "Size Height",
        sizeWeight: "Size Weight",
        sizeChest: "Size Chest",
        sizeWaist: "Size Waist",
        sizeHips: "Size Hips",
        sizeShoe: "Shoe Size",
        sizeInseam: "Inseam",
        sizeSleeve: "Sleeve Length",
        sizeNeck: "Neck",
        sizeHat: "Hat Size",
        keyName: "Headshot Image",
        fullBodyKeyName: "Full Body Image",
        unionId: "Union ID",
        sizeJacket: "Jacket Size",
        sizeDress: "Dress Size",
        sizeBustCup: "Bust Cup Size",
        sizeBustBand: "Bust Band Size",
        Image: "Images"
    };

    return missingFields.map(field => fieldNameMap[field] || field);
};
