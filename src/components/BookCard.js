import React, { useState, useContext } from "react";
import { BookCardStyle } from "./BookCardStyle";
import { FavoriteContext } from "./FavoriteContext";

const BookCard = (props) => {
  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <BookCardStyle>
      <img src={props.cover} alt="cover" />
      <div className="book info">
        <h5>{props.title}</h5>
        <h6>{props.author}</h6>
        <p>{props.published}</p>
      </div>
      {isFavorite ? (
        <button>Remove from favorites</button>
      ) : (
        <button>Add to favorites</button>
      )}
    </BookCardStyle>
  );
};

export default BookCard;
