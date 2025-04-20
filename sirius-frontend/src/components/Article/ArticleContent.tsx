import React from "react";
import "../../App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {PageUpLink} from "./PageUpLink.tsx";
import {ArticleDetails} from "./ArticleDetails.tsx";

interface ArticleContentProps {
    children: React.ReactNode
    pageUpLink?: {
        title: string
        href: string
    }
    articleDetails?: {
        readTime: number
    }
}

export const ArticleContent: React.FC<ArticleContentProps> = ({children, pageUpLink, articleDetails}) => {
    return (
        <div className="Article__content-wrapper">
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 3, 7, 3, 6)}>
                    {pageUpLink && <PageUpLink title={pageUpLink.title} href={pageUpLink.href}/>}
                    {articleDetails && <ArticleDetails readTime={articleDetails.readTime}/>}
                </div>
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 8, 16, 7, 15)}>
                    {children}
                </div>
            </div>
        </div>
    )
}