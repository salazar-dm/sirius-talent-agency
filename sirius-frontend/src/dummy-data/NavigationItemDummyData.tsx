import {NavigationItem} from "../types/NavigationItem.tsx";

const navigationItemList: NavigationItem[] = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Information",
        href: "/information",
        categories: [
            {
                categoryTitle: "Actors",
                description: "Information pages and resources for Toronto background actors.",
                categoryItems: [
                    { title: "Basic documents", href: "/information/actors/basic-documents" },
                    { title: "Union status explanation", href: "/information/actors/non-union-aabp-actra-apprentice-actra-full-explanation" },
                    { title: "Agency required and Rules before set", href: "/information/actors/agency-required-and-rules-before-set" },
                    { title: "On set rules and tips", href: "/information/actors/on-set-rules-and-tips" },
                    { title: "Voucher, commission and payment", href: "/information/actors/voucher-commission-and-payment" },
                    { title: "Minors", href: "/information/actors/minors" },
                ],
                categoryButtonText: "View actors full guide",
                categoryButtonHref: "/"
            }
        ]
    },
    {
        name: "About Us",
        href: "/about-us"
    },
    {
        name: "Contact",
        href: "/contact"
    }
];

export default navigationItemList