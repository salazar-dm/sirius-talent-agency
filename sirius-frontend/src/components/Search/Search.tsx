import React from "react";
import "./Search.css";
import "../../App.css";
import {SearchSvg} from "../../assets/SearchSvg.tsx";

interface SearchProps {
    searchKey?: string
    onSearch: (input: any) => void
    input: any
    searchAlgorithm: (input: any, event: React.ChangeEvent<HTMLInputElement>) => any
    placeholder: string
}

const Search: React.FC<SearchProps> = ({searchKey, onSearch, input, searchAlgorithm, placeholder}) => {


    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(searchAlgorithm(input, event));
    }

    return (
        <>
            <div key={searchKey? searchKey : 'search'} className="Search__container">
                <div className="Search__search">
                    <input type="text"
                           onChange={(event) => onSearchChange(event)}
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

export default Search