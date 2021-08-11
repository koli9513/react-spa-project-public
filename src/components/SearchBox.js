import React, {useState} from "react";
import axios from "axios";

const SearchBox = () => {
    const [search, setSearch] = useState('');

    const getSearchBox = (e) => {

        const searchTerm = e.target.value;
        setSearch(searchTerm)
    }


    return(
        <div className="search-box">
            <form onSubmit={e => {
                e.preventDefault();
                window.location.replace(`/search/${search}`)
            }} >
                <input onChange={getSearchBox} type="text"/>
                <select name="searchType" id="searchType">
                    <option value="title">Title</option>
                    <option value="Author">Author</option>
                </select>
                <button type="submit">Search</button>

            </form>
        </div>
    )
}

export default SearchBox;