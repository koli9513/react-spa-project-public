import React, { useContext } from "react";
import { FavoriteContext } from "./FavoriteContext";
import BookCard from "./BookCard";
import { BookCardsContainerStyle } from "./BookCardContainerStyle";

const FavoriteList = () => {
  const { favoriteBooks } = useContext(FavoriteContext);

  return (
    <BookCardsContainerStyle>
      {favoriteBooks.map((book, index) => (
        <BookCard
          key={index}
          cover={book.cover}
          author={book.author}
          title={book.title}
          published={book.published}
          id={book.id}
        />
      ))}
    </BookCardsContainerStyle>
  );
};

export default FavoriteList;
