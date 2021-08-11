import axios from "axios";
import {useState, useEffect, useContext} from "react";
import BookCard from "./BookCard";
import { BookCardsContainerStyle } from "./BookCardContainerStyle";
import AppTheme from "./AppTheme";
import ThemeContext from "./ThemeContext";
import {KeywordProvider} from "./KeywordProvider";


const BookList = () => {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const missingImgUrl = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

  const [books, setBooks] = useState([]);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${KeywordProvider}&maxResults=30`;
  const getBooks = () => {
    axios.get(url).then((response) => {
      console.log(url)
      const booksFromServer = response.data.items;
      const cleaned = correctMissingProperties(booksFromServer);
      setBooks(cleaned);
    });
  };

  function correctMissingProperties(books) {
    return books.map((book) => {
      if (book.volumeInfo.hasOwnProperty("publishedDate") === false) {
        book.volumeInfo["publishedDate"] = "0000";
      } else if (book.volumeInfo.hasOwnProperty("imageLinks") === false) {
        book.volumeInfo["imageLinks"] = {
          thumbnail:
            missingImgUrl,
        };
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
          cover={book.volumeInfo.imageLinks.thumbnail}
          author={book.volumeInfo.authors}
          title={book.volumeInfo.title}
          published={book.volumeInfo.publishedDate}
          id={book.id}
        />
      ))}
    </BookCardsContainerStyle>
  );
};

export default BookList;
