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
        switch (searchType){
            case "author":
                return '+inauthor:';
            case "title":
                return '+intitle:';
            case "publisher":
                return '+inpublisher:';
            case "subject":
                return '+subject:';
            case "isbn":
                return '+isbn:';
        }
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
