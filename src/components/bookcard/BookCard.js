import React, { useState, useContext } from "react";
import { StyledBookCard } from "../styles/StyledBookCard";
import { FavoriteContext } from "../contexts/FavoriteContext";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import {StyledCoverImage} from "../styles/StyledCoverImage";
import FlipHelper from "../helpers/FlipHelper";
import {BookInfo} from "../elements/BookInfo";
import {StyledDetailedLink} from "../styles/StyledDetailedLink";
import ButtonTheme from "../theme/ButtonTheme";
import styled from "styled-components";
import filled from "../styles/star_filled.png";
import empty from "../styles/star_empty.png";
import hover from "../styles/star_hover.png";



const BookCard = (props) => {
  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(
    favoriteBooks.some((book) => book.id === props.id)
  );
  const detailedViewUrl = `/book/${props.id}`;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const buttonTheme = ButtonTheme[theme];

  const StyledFavoriteButton = styled.button`
  top: 0;
  left: 0;
  border: 1px solid black;
  position: absolute;
  background-color: inherit;
  display: block;
  cursor: pointer;
  width: 33px;
  height: 33px;
  background-size: contain;
  background-image: url("${isFavorite ? filled : empty}");
  background-repeat: no-repeat;

  &:hover {
    background-image: url("${hover}");
  }
  `;

  const addToFavoriteBooks = () => {
    setIsFavorite(true);
    setFavoriteBooks([
      ...favoriteBooks,
      {
        cover: props.cover,
        title: props.title,
        authors: props.authors,
        date: props.published,
        id: props.id,
      },
    ]);
  };

  const removeFromFavoriteBooks = () => {
    if (!props.fromFavoriteList) setIsFavorite(false);
    const updatedFavoriteBooks = favoriteBooks.filter(
      (book) => book.id !== props.id
    );
    setFavoriteBooks(updatedFavoriteBooks);
  };


  return (
    <StyledBookCard style={{
      backgroundColor: `${currentTheme.cardBackgroundColor}`,
      border: `${currentTheme.cardBorderColor}`,
    }}>
      <StyledCoverImage src={props.cover} alt="cover" />
      {isFavorite ? (
          <StyledFavoriteButton onClick={removeFromFavoriteBooks}/>
      ) : (
          <StyledFavoriteButton onClick={addToFavoriteBooks}/>
      )}

      <FlipHelper cardBack={
        <div style={{width: "190px", height: "120px"}}>
          <br/>
          <StyledDetailedLink style={{
            backgroundColor: `${buttonTheme.backgroundColor}`,
            color: `${buttonTheme.color}`,
            borderColor: `${buttonTheme.borderColor}`
          }} to={detailedViewUrl}>More information</StyledDetailedLink>
        </div>
      }
                  cardFront={<BookInfo props={props}/>}/>
    </StyledBookCard>
  );
};

export default BookCard;
