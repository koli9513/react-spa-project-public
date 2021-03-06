import React, { useState, useContext, useEffect } from "react";
import { StyledBookCard } from "../styles/StyledBookCard";
import { FavoriteContext } from "../contexts/FavoriteContext";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import { StyledCoverImage } from "../styles/StyledCoverImage";
import FlipHelper from "../helpers/FlipHelper";
import { BookInfo } from "../elements/BookInfo";
import { StyledDetailedLink } from "../styles/StyledDetailedLink";
import ButtonTheme from "../theme/ButtonTheme";
import { StyledFavoriteButton } from "../styles/StyledFavoriteButton";

const BookCard = (props) => {
  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(
    favoriteBooks.some((book) => book.id === props.id)
  );
  const detailedViewUrl = `/book/${props.id}`;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const buttonTheme = ButtonTheme[theme];

  const styledDetailedLinkStyle = {
    backgroundColor: `${buttonTheme.backgroundColor}`,
    color: `${buttonTheme.color}`,
    borderColor: `${buttonTheme.borderColor}`,
  };

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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  return (
    <StyledBookCard
      style={{
        backgroundColor: `${currentTheme.cardBackgroundColor}`,
        border: `${currentTheme.cardBorderColor}`,
      }}
    >
      <StyledCoverImage src={props.cover} alt="cover" />
      {isFavorite ? (
        <StyledFavoriteButton
          addedToFavorite={isFavorite}
          onClick={removeFromFavoriteBooks}
        />
      ) : (
        <StyledFavoriteButton
          addedToFavorite={isFavorite}
          onClick={addToFavoriteBooks}
        />
      )}

      <FlipHelper
        cardBack={
          <div style={{ width: "190px", height: "120px" }}>
            <br />
            <StyledDetailedLink
              style={styledDetailedLinkStyle}
              to={detailedViewUrl}
            >
              More information
            </StyledDetailedLink>
          </div>
        }
        cardFront={<BookInfo props={props} />}
      />
    </StyledBookCard>
  );
};

export default BookCard;
