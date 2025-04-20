interface FooterItemType {
    name: string;
    href: string;
}

interface FooterCategoryType {
    categoryTitle: string;
    categoryItemList: FooterItemType[];
}



const footerCategoryList: FooterCategoryType[] = [
    {
        categoryTitle: "Services",
        categoryItemList: [
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about-us" },
            { name: "Contact", href: "/contact" },
            { name: "Registration", href: "/registration" }
        ]
    },
    {
        categoryTitle: "Information",
        categoryItemList: [
            { name: "Basic documents", href: "/information/actors/basic-documents" },
            { name: "Union status", href: "/information/actors/non-union-aabp-actra-apprentice-actra-full-explanation" },
            { name: "Rules before set", href: "/information/actors/agency-required-and-rules-before-set" },
            { name: "On set tips", href: "/information/actors/on-set-rules-and-tips" },
            { name: "Payment & voucher", href: "/information/actors/voucher-commission-and-payment" },
            { name: "Minors", href: "/information/actors/minors" }
        ]
    }
];

export default footerCategoryList