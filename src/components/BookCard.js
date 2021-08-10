import React, { useState, useContext } from "react";
import { BookCardStyle } from "./BookCardStyle";
import { FavoriteContext } from "./FavoriteContext";

const BookCard = (props) => {
  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(
    favoriteBooks.some((book) => book.id === props.id)
  );

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
    const updatedFavoriteBooks = favoriteBooks.filter(
      (book) => book.id !== props.id
    );
    setIsFavorite(false);
    setFavoriteBooks(updatedFavoriteBooks);
  };

  return (
    <BookCardStyle>
      <img src={props.cover} alt="cover" />
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
    </BookCardStyle>
  );
};

export default BookCard;
