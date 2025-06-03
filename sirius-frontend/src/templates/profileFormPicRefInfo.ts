export interface ProfileFormPicRefInfo {
    text: string,
    imgSrc: string,
    imgAlt: string,
}

export const profileFormHeadshotInfo: ProfileFormPicRefInfo[] = [
    {
        text: "Male reference",
        imgSrc: "/headshot-male-reference.jpg",
        imgAlt: "Male headshot reference",
    },
    {
        text: "Female reference",
        imgSrc: "/headshot-female-reference.jpg",
        imgAlt: "Female headshot reference",
    }
]

export const profileFormFullbodyInfo: ProfileFormPicRefInfo[] = [
    {
        text: "Male reference",
        imgSrc: "/fullbody-male-reference.jpg",
        imgAlt: "Male full-body reference",
    },
    {
        text: "Female reference",
        imgSrc: "/fullbody-female-reference.jpg",
        imgAlt: "Female headshot reference",
    }
]