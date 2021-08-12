import { useContext } from "react";
import BookCard from "../bookcard/BookCard";
import { BookCardsContainerStyle } from "../styles/BookCardContainerStyle";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import useFetch from "../helpers/useFetch";
import Globals from "../helpers/Globals";

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
    const advancedSearch = `${Globals.apiUrlBase}+inauthor:${searchAuthor}+intitle:${searchTitle}${Globals.maxResults}`;
    const simpleSearch = `${Globals.apiUrlBase}${searchIn}${searchTerm}${Globals.maxResults}`;
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
