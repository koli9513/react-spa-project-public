import React, {useContext, useState} from "react";
import axios from "axios";
import {StyledSearchBox} from "../styles/StyledSearchBox";
import ThemeContext from "../contexts/ThemeContext";
import NavbarTheme from "../theme/NavbarTheme";
import ButtonTheme from "../theme/ButtonTheme";
import {AdvancedSearch} from "./AdvancedSearch";

const SearchBox = () => {
    const [search, setSearch] = useState({
        searchTerm: "",
        searchType: "title",
        searchAuthor: "",
        searchTitle: "",
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

    const getSearchAuthor = (e) => {
        setSearch({...search, searchAuthor: e.target.value})
    }

    const getSearchTitle = (e) => {
        setSearch({...search, searchTitle: e.target.value})
    }

    const searchBarStyle = {
        backgroundColor: `${buttonTheme.backgroundColor}`,
        color: `${buttonTheme.color}`,
        borderColor: `${buttonTheme.borderColor}`,
    }

    const advancedSearchBarStyle = {
        backgroundColor: `${buttonTheme.backgroundColor}`,
        color: `${buttonTheme.color}`,
        borderColor: `${buttonTheme.borderColor}`,
        float: "center"
    }

    const advancedButtonStyle = {
        backgroundColor: `${buttonTheme.backgroundColor}`,
        color: `${buttonTheme.color}`,
        borderColor: `${buttonTheme.borderColor}`,
        float: "left",
        right: "3%",
        position: "absolute",
        top: "0%"
    }

    const advancedForm = (
        <form onSubmit={e => {
            e.preventDefault();
            window.location.replace(`/advanced/${search.searchAuthor}/${search.searchTitle}`)
        }}>
            <input onChange={getSearchAuthor} placeholder="search author..." type="text"
                   style={advancedSearchBarStyle}/>
            <input onChange={getSearchTitle} placeholder="search title..." type="text"
                   style={advancedSearchBarStyle}/>
            <button style={advancedSearchBarStyle} type="submit">Search</button>
        </form>
    )

    const advancedButton = (
        <button style={advancedButtonStyle}>Advanced Search</button>
    )


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
                       style={searchBarStyle}/>
                <select onChange={getSearchType} name="searchType" id="searchType"
                        style={searchBarStyle}>
                    <option value="title">title</option>
                    <option value="author">author</option>
                    <option value="publisher">publisher</option>
                    <option value="subject">subject</option>
                    <option value="isbn">isbn</option>
                </select>
                <button style={searchBarStyle} type="submit">Search</button>
            </form>
                <AdvancedSearch title={advancedButton} children={advancedForm}/>
        </StyledSearchBox>
    )
}

export default SearchBox;