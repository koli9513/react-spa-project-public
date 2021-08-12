import React, { useContext } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import BookCard from "../bookcard/BookCard";
import { BookCardsContainerStyle } from "../styles/BookCardContainerStyle";
import ThemeContext from "../contexts/ThemeContext";
import AppTheme from "../theme/AppTheme";

const FavoriteList = () => {
  const { favoriteBooks } = useContext(FavoriteContext);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];

  return (
    <BookCardsContainerStyle style={{
      backgroundColor: `${currentTheme.backgroundColor}`,
      color: `${currentTheme.color}`,
    }}>
      {favoriteBooks.map((book, index) => (
        <BookCard
          key={index}
          cover={book.cover}
          authors={book.authors}
          title={book.title}
          published={book.published}
          id={book.id}
          fromFavoriteList={true}
        />
      ))}
    </BookCardsContainerStyle>
  );
};

export default FavoriteList;
