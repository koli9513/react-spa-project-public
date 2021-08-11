import React, { useState, useContext } from "react";
import { StyledBookCard } from "../styles/StyledBookCard";
import { FavoriteContext } from "../contexts/FavoriteContext";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import {StyledCoverImage} from "../styles/StyledCoverImage";
import {StyledDetailedLink} from "../styles/StyledDetailedLink";
import FlipHelper from "../helpers/FlipHelper";
import {StyledFavouriteButton} from "../styles/StyledFavouriteButton";

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
    <StyledBookCard style={{
      backgroundColor: `${currentTheme.cardBackgroundColor}`,
      border: `${currentTheme.cardBorderColor}`,
    }}>
      <StyledCoverImage src={props.cover} alt="cover" />
      <FlipHelper cardBack={ActionPage}
            cardFront={BookInfo}/>
    </StyledBookCard>
  );
};

export default BookCard;
