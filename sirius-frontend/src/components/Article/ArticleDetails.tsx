import React from "react";
import "./ArticleDetails.css";
import "../../App.css";

interface ArticleDetailsProps {
    readTime: number
}

export const ArticleDetails: React.FC<ArticleDetailsProps> = ({readTime}) => {
    return (
        <>
            <div className="ArticleDetails__heading">
                <div className="ArticleDetails__content">
                    <div className="">
                        <div className="ArticleDetails__text-icon">
                            <span className="ArticleDetails__eyebrow">Read time</span>
                            <div className="ArticleDetails__text-icon-container">
                                <span className="ArticleDetails__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><circle
                                        cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"></circle><path
                                        stroke="currentColor" stroke-width="2" d="M10 4v6.5h4.5"></path></svg>
                                </span>
                                <span className="ArticleDetails__text">{readTime} min{readTime > 1 ? "s" : ""}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}