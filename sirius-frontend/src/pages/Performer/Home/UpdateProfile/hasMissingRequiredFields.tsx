import {PerformerProfileType} from "../../../../types/PerformerProfileType.tsx";


export const getMissingRequiredFields = (
    profile: PerformerProfileType | null,
    imagesSelected: boolean
): string[] => {
    if (!profile) return ["Profile"];

    const isEmpty = (val: any) =>
        val === "" || val === null || val === undefined || val === 0;

    const requiredFields: string[] = [
        "firstName", "lastName", "dateOfBirth", "city", "state", "postalCode", "gender",
        "ethnicity", "visibleTattoos", "hairColor", "eyeColor", "sizeHeight", "sizeWeight", "sizeChest",
        "sizeWaist", "sizeHips", "sizeShoe", "sizeInseam", "emergencyFullName", "emergencyTel", "lgbt",
        "bipoc", "trans"
    ];

    if (
        profile.unionStatus === "AABP" ||
        profile.unionStatus === "ACTRA Apprentice" ||
        profile.unionStatus === "ACTRA Full"
    ) {
        requiredFields.push("unionId");
    }

    if (profile.gender === "male" || profile.gender === "non-binary-male") {
        requiredFields.push("sizeJacket", "sizeSleeve", "sizeNeck", "sizeHat");
    }

    if (profile.gender === "female" || profile.gender === "non-binary-female") {
        requiredFields.push("sizeDress", "sizeBustCup", "sizeBustBand");
    }

    const today = new Date();
    const dob = new Date(profile.dateOfBirth);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const isMinor = age < 18 || (age === 18 && monthDiff < 0);

    if (isMinor) {
        requiredFields.push("guardianFullName", "guardianTel");
    }

    const missingFields: string[] = requiredFields.filter(field =>
        isEmpty((profile as any)[field])
    );

    if (!imagesSelected && (profile.keyName === "" && profile.fullBodyKeyName === "")) {
        missingFields.push("Image");
    }

    const fieldNameMap: Record<string, string> = {
        firstName: "First Name",
        lastName: "Last Name",
        dateOfBirth: "Date of Birth",
        city: "City",
        state: "Province",
        postalCode: "Postal Code",
        gender: "Gender",
        ethnicity: "Ethnicity",
        visibleTattoos: "Visible Tattoos",
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
        Image: "Images",
        emergencyFullName: "Emergency Contact Name",
        emergencyTel: "Emergency Contact Phone Number",
        guardianFullName: "Guardian Full Name",
        guardianTel: "Guardian Phone Number"
    };

    return missingFields.map(field => fieldNameMap[field] || field);
};
