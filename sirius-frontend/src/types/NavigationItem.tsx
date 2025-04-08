interface CategoryItem {
    title: string;
    href: string;
}

interface Category {
    categoryTitle: string;
    description: string;
    categoryItems: CategoryItem[];
    categoryButtonText?: string;
    categoryButtonHref?: string;
}

export type NavigationItemCategory = Category;

interface NavigationItem {
    name: string;
    href: string;
    categories?: Category[]
}

export type { NavigationItem };