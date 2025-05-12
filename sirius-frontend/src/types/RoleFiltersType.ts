export interface RoleFiltersType {
    unionStatus?: string;
    age?: {
        min?: number;
        max?: number;
    };
    city?: string;
    selfDrive?: boolean;
    gender?: string;
    ethnicity?: string;
    lgbt?: boolean;
    bipoc?: boolean;
    trans?: boolean;
    visibleTattoos?: boolean;
    sizeHeight?: {
        min?: number;
        max?: number;
    };
    sizeWeight?: {
        min?: number;
        max?: number;
    };
    sizeChest?: {
        min?: number;
        max?: number;
    };
    sizeWaist?: {
        min?: number;
        max?: number;
    };
    sizeHips?: {
        min?: number;
        max?: number;
    };
    sizeShoe?: {
        min?: number;
        max?: number;
    };
    sizeInseam?: {
        min?: number;
        max?: number;
    };
}
