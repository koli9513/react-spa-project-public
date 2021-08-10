import React, { useState, useContext } from "react";
import { BookCardStyle } from "./BookCardStyle";
import { FavoriteContext } from "./FavoriteContext";

const BookCard = (props) => {
  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <BookCardStyle>
      <img src={props.cover} alt="cover" />
      <div className="book info">
        <h5>{props.title}</h5>
        <h6>{props.author}</h6>
        <p>{props.published}</p>
      </div>
      {isFavorite ? (
        <button onClick={addToFavoriteBooks}>Remove from favorites</button>
      ) : (
        <button onClick={addToFavoriteBooks}>Add to favorites</button>
      )}
    </BookCardStyle>
  );
};

export default BookCard;
