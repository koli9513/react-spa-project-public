import React, {useContext, useState} from "react";
import axios from "axios";
import {StyledSearchBox} from "../styles/StyledSearchBox";
import ThemeContext from "../contexts/ThemeContext";
import NavbarTheme from "../theme/NavbarTheme";
import ButtonTheme from "../theme/ButtonTheme";

const SearchBox = () => {
    const [search, setSearch] = useState({
        searchTerm: "",
        searchType: "title"
    });
    const theme = useContext(ThemeContext)[0];
    const navbarTheme = NavbarTheme[theme];
    const buttonTheme = ButtonTheme[theme];

    const getSearchTerm = (e) => {
        setSearch({...search, searchTerm: e.target.value})
    }

    const getSearchType = (e) => {
        setSearch({...search, searchType: e.target.value})
    }

    const buttonStyle = {
        backgroundColor: `${buttonTheme.backgroundColor}`,
        color: `${buttonTheme.color}`,
        borderColor: `${buttonTheme.borderColor}`
    }

    return(
        <StyledSearchBox className="search-box" style={{
            backgroundColor: `${navbarTheme.lowerBackgroundColor}`,
            color: `${navbarTheme.color}`,
            borderColor: `${navbarTheme.borderColor}`
        }}>
            <form onSubmit={e => {
                e.preventDefault();
                window.location.replace(`/search/${search.searchType}/${search.searchTerm}`)
            }}>
                <input onChange={getSearchTerm} placeholder="search books..." type="text"
                       style={buttonStyle}/>
                <select onChange={getSearchType} name="searchType" id="searchType"
                        style={buttonStyle}>
                    <option value="title">title</option>
                    <option value="author">author</option>
                    <option value="publisher">publisher</option>
                    <option value="subject">subject</option>
                    <option value="isbn">isbn</option>
                </select>
                <button style={buttonStyle} type="submit">Search</button>
            </form>
        </StyledSearchBox>
    )
}

export default SearchBox;