import axios from "axios";
import {useState, useEffect, useContext} from "react";
import BookCard from "../bookcard/BookCard";
import { BookCardsContainerStyle } from "../styles/BookCardContainerStyle";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import {KeywordProvider} from "../helpers/KeywordProvider";
import Globals from "../helpers/Globals";


const BookList = () => {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];

  const [books, setBooks] = useState([]);
  const getBooks = () => {
    axios.get(Globals.homePageApiUrl).then((response) => {
      const booksFromServer = response.data.items;
      const cleaned = correctMissingProperties(booksFromServer);
      setBooks(cleaned);
    });
  };

  function correctMissingProperties(books) {
    return books.map((book) => {
      book = {
        cover: book.volumeInfo.hasOwnProperty("imageLinks") ? book.volumeInfo.imageLinks.thumbnail : Globals.missingImgUrl,
        title: book.volumeInfo.title ? book.volumeInfo.title : Globals.notAvailableMessage,
        authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : [],
        publishedDate: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : Globals.notAvailableMessage,
        id: book.id
      }
      return book;
    });
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
      <BookCardsContainerStyle
          style={{
            backgroundColor: `${currentTheme.backgroundColor}`,
            color: `${currentTheme.color}`,
            border: `${currentTheme.borderColor}`,
          }}>
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

export default BookList;
