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
                description: "Information files and resources for Toronto background actors.",
                categoryItems: [
                    { title: "Background Actor Resume Templates", href: "/actors/resume-templates" },
                    { title: "Toronto Actor Union Guidelines", href: "/actors/union-guidelines" },
                    { title: "Toronto Casting Calls", href: "/actors/casting-calls" },
                    { title: "Actor Reels Submission Guide", href: "/actors/actor-reels-guide" },
                    { title: "Talent Agency Contacts", href: "/actors/agency-contacts" },
                    { title: "Toronto Film Set Etiquette", href: "/actors/film-set-etiquette" },
                    { title: "Toronto Background Actor Rates", href: "/actors/background-rates" },
                    { title: "How to Get Cast as a Background Actor", href: "/actors/getting-cast" },
                    { title: "Workshops for Background Actors", href: "/actors/workshops" }
                ],
                categoryButtonText: "View All Actor Resources",
                categoryButtonHref: "/actors"
            },
            {
                categoryTitle: "Casting",
                description: "Discover casting opportunities and details for background actors.",
                categoryItems: [
                    { title: "Event Casting", href: "/casting/event" },
                    { title: "Online Casting", href: "/casting/online" }
                ],
                categoryButtonText: "See All Castings",
                categoryButtonHref: "/casting"
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