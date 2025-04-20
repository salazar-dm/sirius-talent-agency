import React from "react";
import "./PageUpLink.css";
import "../../App.css";


interface PageUpLinkProps {
    title: string
    href: string
}

export const PageUpLink: React.FC<PageUpLinkProps> = ({title, href}) => {
    return (
        <div className={"PageUpLink__container"}>
            <a href={href} className="PageUpLink__content">
                <h3 className="PageUpLink__label">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 15.0001H17.5V6L12.5 1.0001H6.5V15.0001Z" stroke="currentColor"
                              stroke-width="2"></path>
                        <path d="M17.5 7L11.5 7L11.5 1" stroke="currentColor" stroke-width="2"></path>
                        <path d="M6.9 5H2.5V19H13.5V15" stroke="currentColor" stroke-width="2"></path>
                    </svg>
                    Part of our report
                </h3>
                <span className="PageUpLink__title">{title}</span>
            </a>
        </div>
    )
}