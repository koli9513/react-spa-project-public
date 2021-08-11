import React, { useState, useContext } from "react";
import { BookCardStyle } from "./BookCardStyle";
import { FavoriteContext } from "./FavoriteContext";
import AppTheme from "./AppTheme";
import ThemeContext from "./ThemeContext";
import {CoverImageStyle} from "./CoverImageStyle";
import {StyledDetailedLink} from "./StyledDetailedLink";
import FlipHelper from "./FlipHelper";
import {StyledFavouriteButton} from "./StyledFavouriteButton";

const BookCard = (props) => {
  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(
    favoriteBooks.some((book) => book.id === props.id)
  );
  const detailedViewUrl = `/book/${props.id}`;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];

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

  const BookInfo =
      <div>
        <h4>{props.title}</h4>
        <h5>{props.authors}</h5>
        <p>{props.published}</p>
      </div>

  const ActionPage =
      <div style={{width: "190px", height: "120px"}}>
        {isFavorite ? (
            <StyledFavouriteButton onClick={removeFromFavoriteBooks}>Add favourite</StyledFavouriteButton>
        ) : (
            <StyledFavouriteButton onClick={addToFavoriteBooks}>Remove favourite</StyledFavouriteButton>
        )}
        <br/>
        <StyledDetailedLink to={detailedViewUrl}>More information</StyledDetailedLink>
      </div>

  return (
    <BookCardStyle style={{
      backgroundColor: `${currentTheme.cardBackgroundColor}`,
      border: `${currentTheme.cardBorderColor}`,
    }}>
      <CoverImageStyle src={props.cover} alt="cover" />
      <FlipHelper cardBack={ActionPage}
            cardFront={BookInfo}/>
    </BookCardStyle>
  );
};

export default BookCard;
