import React, { useState, useContext } from "react";
import { BookCardStyle } from "./BookCardStyle";
import { FavoriteContext } from "./FavoriteContext";
import AppTheme from "./AppTheme";
import ThemeContext from "./ThemeContext";
import {CoverImageStyle} from "./CoverImageStyle";
import {Link} from "react-router-dom";

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
        author: props.author,
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
    <BookCardStyle style={{
      backgroundColor: `${currentTheme.cardBackgroundColor}`,
      border: `${currentTheme.cardBorderColor}`,
    }}>
      <CoverImageStyle src={props.cover} alt="cover" />
      <div className="book info">
        <h5>{props.title}</h5>
        <h6>{props.author}</h6>
        <p>{props.published}</p>
      </div>
      {isFavorite ? (
        <button onClick={removeFromFavoriteBooks}>Remove from favorites</button>
      ) : (
        <button onClick={addToFavoriteBooks}>Add to favorites</button>
      )}
      <br/>
      <Link to={detailedViewUrl}>Detail page</Link>
    </BookCardStyle>
  );
};

export default BookCard;
