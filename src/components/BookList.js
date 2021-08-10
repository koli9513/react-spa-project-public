import axios from "axios";
import { useState, useEffect } from "react";
import BookCard from "./BookCard";

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
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  function correctMissingProperties (books) {
    return books.map((book) => {
      if (book.volumeInfo.hasOwnProperty('publishedDate') === false) {
        book.volumeInfo['publishedDate'] = '0000';
      } else if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
        book.volumeInfo['imageLinks'] = {
          cover: 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
        }
      }
      return book;
    });
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
      <div className="book list">
        {books.map((book, index) => (
            <BookCard
                key={index}
                cover={book.volumeInfo.imageLinks.smallThumbnail}
                author={book.volumeInfo.authors}
                title={book.volumeInfo.title}
                published={book.volumeInfo.publishedDate}
            />
        ))}
      </div>
  );
};

export default BookList;
