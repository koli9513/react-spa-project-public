import React, { useState, useContext } from "react";
import { StyledBookCard } from "../styles/StyledBookCard";
import { FavoriteContext } from "../contexts/FavoriteContext";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import {StyledCoverImage} from "../styles/StyledCoverImage";
import FlipHelper from "../helpers/FlipHelper";
import {BookInfo} from "../elements/BookInfo";
import {ActionItems} from "../elements/ActionItems";
import {StyledFavouriteButton} from "../styles/StyledFavouriteButton";
import {StyledDetailedLink} from "../styles/StyledDetailedLink";
import ButtonTheme from "../theme/ButtonTheme";

const BookCard = (props) => {
  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(
    favoriteBooks.some((book) => book.id === props.id)
  );
  const detailedViewUrl = `/book/${props.id}`;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const buttonTheme = ButtonTheme[theme];

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
      <FlipHelper cardBack={
        <div style={{width: "190px", height: "120px"}}>
          {isFavorite ? (
              <StyledFavouriteButton onClick={removeFromFavoriteBooks}>Remove favourite</StyledFavouriteButton>
          ) : (
              <StyledFavouriteButton onClick={addToFavoriteBooks}>Add favourite</StyledFavouriteButton>
          )}
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
