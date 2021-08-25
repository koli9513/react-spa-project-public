import { useContext, useState, useEffect } from "react";
import BookCard from "../bookcard/BookCard";
import { BookCardsContainerStyle } from "../styles/BookCardContainerStyle";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import useFetch from "../helpers/useFetch";
import { useHistory } from "react-router-dom";
import Globals from "../helpers/Globals";

const BrowseBookList = () => {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const history = useHistory();
  const [keyword, setKeyword] = useState(Globals.words[getRandomIndex()]);
  const url = `${Globals.apiUrlBase}${keyword}${Globals.maxResults}`;

  const [books] = useFetch(url);

  function getRandomIndex() {
    return Math.floor(Math.random() * Globals.words.length);
  }

  useEffect(() => {
    const unlisten = history.listen(() => {
      setKeyword(Globals.words[getRandomIndex()]);
    });
    return function cleanup() {
      unlisten();
    };
  });

  return (
    <BookCardsContainerStyle
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.color}`,
        border: `${currentTheme.borderColor}`,
      }}
    >
      {books.map((book) => (
        <BookCard
          key={book.id}
          cover={book.cover}
          authors={book.authors}
          title={book.title}
          published={book.publishedDate}
          id={book.id}
          fromFavoriteList={false}
        />
      ))}
    </BookCardsContainerStyle>
  );
};

export default BrowseBookList;
