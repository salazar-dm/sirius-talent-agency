import React from "react";
import "./CategoryGrid.css"
import "../../App.css";
import {CommonProps} from "../../props/Common.tsx";
import {chunkArrayItems} from "../../shared/chunkArrayItems.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {ArrowSvg} from "../../assets/ArrowSvg.tsx";

interface CategoryGridProps extends CommonProps {
    children: {href: string, title: string}[]
    chunkArrayItemsBy?: number
}

const CategoryGrid: React.FC<CategoryGridProps> = ({children, chunkArrayItemsBy }) => {
    if (!children) return null

    return (
        <>
            <div className="CategoryGrid__wrapper">
                <div className="Grid_grid__container CategoryGrid__custom-grid">
                    {chunkArrayItemsBy ? (
                        chunkArrayItems(children, chunkArrayItemsBy).map((chunk, index) => (
                            <div className="Grid_grid__item"
                                style={columnsStyle(1, 9, 1, 9, index * 6 + 3, index * 6 + 9, index * 6 + 3, index * 6 + 9)}>
                                <div className="CategoryGrid__list-items-container">
                                    {chunk.map((item) => (
                                        <div className="CategoryGrid__list-item" key={item.href}>
                                            <a href={item.href} className="CategoryGrid__item-link">
                                                <span className="CategoryGrid__item-link-title">{item.title}</span>
                                                <span className="CategoryGrid__item-link-icon">
                                                    <span className="CategoryGrid__item-link-slide">
                                                        <ArrowSvg/>
                                                        <ArrowSvg/>
                                                    </span>
                                                </span>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="Grid_grid__item"
                        style={columnsStyle(1, 9, 1, 9, 1, 17, 1, 17)}>
                            <div className="CategoryGrid__list-items-container">
                                {children.map((item) => (
                                    <div className="CategoryGrid__list-item" key={item.href}>
                                        <a href={item.href} className="CategoryGrid__item-link">
                                            <span className="CategoryGrid__item-link-title">{item.title}</span>
                                            <span className="CategoryGrid__item-link-icon">
                                                <span className="CategoryGrid__item-link-slide">
                                                    <ArrowSvg />
                                                    <ArrowSvg/>
                                                </span>
                                            </span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CategoryGrid