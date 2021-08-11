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
      book = {
        cover: book.volumeInfo.hasOwnProperty("imageLinks") ? book.volumeInfo.imageLinks.thumbnail : missingImgUrl,
        title: book.volumeInfo.title ? book.volumeInfo.title : "Not available",
        author: book.volumeInfo.authors ? book.volumeInfo.authors : "Not available",
        publishedDate: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "Not available",
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

export default BookList;
