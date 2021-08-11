import React, {useState} from "react";
import axios from "axios";

const SearchBox = () => {
    const [search, setSearch] = useState({
        searchTerm: "",
        searchType: "title"
    });

    const getSearchTerm = (e) => {

        setSearch({...search, searchTerm: e.target.value})
    }

    const getSearchType = (e) => {
        setSearch({...search, searchType: e.target.value})
    }

    return(
        <div className="search-box">
            <form onSubmit={e => {
                e.preventDefault();
                window.location.replace(`/search/${search.searchType}/${search.searchTerm}`)
            }} >
                <input onChange={getSearchTerm} type="text"/>
                <select onChange={getSearchType} name="searchType" id="searchType">
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
                <button type="submit">Search</button>

            </form>
        </div>
    )
}

export default SearchBox;