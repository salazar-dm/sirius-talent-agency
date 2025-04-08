export interface PerformerFilterCriteria {
    keyName?: string;
    firstName?: string;
    lastName?: string;
    unionStatus?: string;
    unionId?: string;
    dateOfBirth?: { min?: number, max?: number };
    socialInsuranceNumber?: string;
    city?: string;
    selfDrive?: boolean;
    gender?: string[];
    ethnicity?: string[];
    hairColor?: string[];
    eyeColor?: string[];
    sizeHeight?: { min?: number, max?: number };
    sizeWeight?: { min?: number, max?: number };
    sizeChest?: { min?: number, max?: number };
    sizeWaist?: { min?: number, max?: number };
    sizeHips?: { min?: number, max?: number };
    sizeShoe?: { min?: number, max?: number };
    sizeInseam?: { min?: number, max?: number };
    sizeSleeve?: { min?: number, max?: number };
    sizeNeck?: { min?: number, max?: number };
    sizeHat?: { min?: number, max?: number };
    [key: string]: string | { min?: number, max?: number } | boolean | string[] | undefined;
}