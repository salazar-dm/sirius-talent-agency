import {ReactNode} from "react";

export interface CommonProps {
    children?: any[]
    title?: string
    description?: string
    image?: string
    imageAlt?: string
    button?: ReactNode
    isDesktop?: boolean
}