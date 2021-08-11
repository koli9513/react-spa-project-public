import axios from "axios";
import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { BookCardsContainerStyle } from "./BookCardContainerStyle";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const url = `https://www.googleapis.com/books/v1/volumes?q="${getRandomLetter()}&maxResults=30`;
  const getBooks = () => {
    axios.get(url).then((response) => {
      const booksFromServer = response.data.items;
      const cleaned = correctMissingProperties(booksFromServer);
      setBooks(cleaned);
    });
  };

  function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  function correctMissingProperties(books) {
    return books.map((book) => {
      book = {
        cover: book.volumeInfo.hasOwnProperty("imageLinks") ? book.volumeInfo.imageLinks.thumbnail :
            "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg",
        title: book.volumeInfo.title ? book.volumeInfo.title : "Not available",
        author: book.volumeInfo.authors ? book.volumeInfo.authors : "Not available",
        publishedDate: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "Not available",
      }
      return book;
    });
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <BookCardsContainerStyle>
      {books.map((book, index) => (
        <BookCard
          key={index}
          cover={book.cover}
          author={book.authors}
          title={book.title}
          published={book.publishedDate}
          id={book.id}
        />
      ))}
    </BookCardsContainerStyle>
  );
};

export default BookList;
