import React from "react";
import "./Search.css";
import "../../App.css";
import {SearchSvg} from "../../assets/SearchSvg.tsx";

interface SearchProps {
    searchKey?: string
    placeholder: string
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

const SearchUpdated: React.FC<SearchProps> = ({searchKey, placeholder, onSearch, value}) => {

    return (
        <>
            <div key={searchKey? searchKey : 'search'} className="Search__container">
                <div className="Search__search">
                    <input type="text"
                           value={value}
                           onChange={onSearch}
                           className="Search__input"
                           placeholder={placeholder}/>
                    <div className="Search__icon">
                        <SearchSvg/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchUpdated

