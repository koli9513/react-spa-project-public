import { useContext } from "react";
import BookCard from "../bookcard/BookCard";
import { BookCardsContainerStyle } from "../styles/BookCardContainerStyle";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import useFetch from "../helpers/useFetch";

const SearchList = () => {
    const theme = useContext(ThemeContext)[0];
    const currentTheme = AppTheme[theme];
    const { searchType, searchTerm } = useParams();
    const { searchAuthor, searchTitle } = useParams();
    const searchIn = (() => {
        if (searchType === "author")
            return '+inauthor:'
        else if (searchType === "title")
            return '+intitle:'
        else if (searchType === "publisher")
            return '+inpublisher:'
        else if (searchType === "subject")
            return '+subject:'
        else if (searchType === "isbn")
            return '+isbn:'
    })();
    const advancedSearch = `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${searchAuthor}+intitle:${searchTitle}&maxResults=30`;
    const simpleSearch = `https://www.googleapis.com/books/v1/volumes?q=${searchIn}${searchTerm}&maxResults=30`;
    const url = searchType ? simpleSearch : advancedSearch;

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

export default SearchList;
