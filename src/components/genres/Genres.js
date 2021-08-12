import React, { useContext, useState } from "react";
import { StyledSearchBox } from "../styles/StyledSearchBox";
import ThemeContext from "../contexts/ThemeContext";
import NavbarTheme from "../theme/NavbarTheme";
import ButtonTheme from "../theme/ButtonTheme";
import { useHistory } from "react-router-dom";

const Genres = () => {
    const [genre, setGenre] = useState('');

    const theme = useContext(ThemeContext)[0];
    const buttonTheme = ButtonTheme[theme];
    const history = useHistory();

    const genreButtonStyle = {
        backgroundColor: `${buttonTheme.backgroundColor}`,
        color: `${buttonTheme.color}`,
        borderColor: `${buttonTheme.borderColor}`,
        float: "left",
        left: "14%",
        position: "absolute",
        top: "0%",
    };
    const genreOptionStyle = {
        backgroundColor: `${buttonTheme.backgroundColor}`,
        color: `${buttonTheme.color}`,
        borderColor: `${buttonTheme.borderColor}`,
        float: "left",
        left: "3%",
        position: "absolute",
        top: "0%",
    };


    const setGenreValue = (e) => {

        setGenre({genre: e.target.value})
    }


    return (
        <div>
            <form onSubmit={(e) => {
                    e.preventDefault();
                   history.push(`/genres/${genre}`);
                }}>
                <select style={genreOptionStyle}>
                    <option value="adventure">adventure</option>
                    <option value="biography">biography</option>
                    <option value="education">education</option>
                    <option value="fiction">fiction</option>
                    <option value="science">science</option>
                    <option value="art">art</option>
                </select>
                <button style={genreButtonStyle} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Genres;
