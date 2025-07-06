type FilterTemplate =
    | { type: "enum"; options: string[] }
    | { type: "boolean" }
    | { type: "range"; min: number; max: number }
    | { type: "string" };

export const filtersTemplate: Record<string, FilterTemplate> = {
    gender: {
        type: 'enum',
        options: ['male', 'female', 'non-binary-male', 'non-binary-female'],
    },
    unionStatus: {
        type: 'enum',
        options: ['Non-Union', 'AABP', 'ACTRA Apprentice', 'ACTRA Full'],
    },
    city: { type: 'string' },
    state: {
        type: 'enum',
        options: ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'],
    },
    postalCode: { type: 'string' },
    emailVerified: { type: 'boolean' },
    lgbt: { type: 'boolean' },
    bipoc: { type: 'boolean' },
    trans: { type: 'boolean' },
    visibleTattoos: { type: 'boolean' },
    selfDrive: { type: 'boolean' },
    hairColor: {
        type: 'enum',
        options: ['afro', 'black', 'dark-brown', 'light-brown', 'dark-blonde', 'light-blonde', 'red', 'grey', 'bald', 'dyed'],
    },
    eyeColor: {
        type: 'enum',
        options: ['brown', 'hazel', 'amber', 'green', 'blue', 'grey', 'other'],
    },
    ethnicity: {
        type: 'enum',
        options: ['white', 'black', 'caucasian', 'east-asian', 'south-asian', 'southeast-asian', 'indigenous', 'latino', 'mena'],
    },
    sizeHeight: { type: 'range', min: 0, max: 250 },
    sizeWeight: { type: 'range', min: 0, max: 600 },
    sizeChest: { type: 'range', min: 0, max: 150 },
    sizeWaist: { type: 'range', min: 0, max: 130 },
    sizeHips: { type: 'range', min: 0, max: 130 },
    sizeShoe: { type: 'range', min: 0, max: 17 },
    sizeInseam: { type: 'range', min: 0, max: 120 },
    sizeHat: { type: 'range', min: 0, max: 65 },
    sizeNeck: { type: 'range', min: 0, max: 60 },
    sizeSleeve: { type: 'range', min: 0, max: 100 },
    sizeBustBand: { type: 'range', min: 0, max: 50 },
    sizeBustCup: {
        type: 'enum',
        options: ['AA', 'A', 'B', 'C', 'D', 'DD/E', 'DDD/F'],
    },
    sizeDress: {
        type: 'enum',
        options: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14'],
    },
    sizeJacket: {
        type: 'enum',
        options: ['short', 'regular', 'tall'],
    },
};

