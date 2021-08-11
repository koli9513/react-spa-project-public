import { useContext } from "react";
import BookCard from "../bookcard/BookCard";
import { BookCardsContainerStyle } from "./BookCardContainerStyle";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import useFetch from "../helpers/useFetch";

const SearchList = () => {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { searchType, searchTerm } = useParams();
  const searchBy = searchType === "author" ? "+inauthor:" : "+intitle:";
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchBy}${searchTerm}&maxResults=30`;

  const [books] = useFetch(url);

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
          author={book.authors}
          title={book.title}
          published={book.publishedDate}
          id={book.id}
          fromFavoriteList={false}
        />
      ))}
    </BookCardsContainerStyle>
  );
};

export default SearchList;
