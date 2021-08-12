import { useContext, useState, useEffect } from "react";
import BookCard from "../bookcard/BookCard";
import { BookCardsContainerStyle } from "../styles/BookCardContainerStyle";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import useFetch from "../helpers/useFetch";
import { useHistory } from "react-router-dom";

const words = [
  "+inauthor:sigmund+freud",
  "ShakesPeare",
  "+inauthor:endre+ady",
  "+inauthor:jane+austen",
  "+intitle:qing",
  "+inauthor:patrick+rothfuss",
  "+inauthor:sylvia+plath",
  "+inauthor:j+d+salinger",
  "+inauthor:tennessee+williams",
  "+inauthor:j+r+r+tolkien",
  "+inauthor:terry+pratchett",
];

const BrowseBookList = () => {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const history = useHistory();
  const [keyword, setKeyword] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=30`;
  const [books] = useFetch(url);

  useEffect(() => {
    const unlisten = history.listen(() => {
      setKeyword(words[Math.floor(Math.random() * words.length)]);
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
      {books.map((book, index) => (
        <BookCard
          key={index}
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
