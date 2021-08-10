import axios from "axios";
import { useState, useEffect } from "react";
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);

  function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  const url = "https://www.googleapis.com/books/v1/volumes?q=" + `${getRandomLetter()}` + "&maxResults=30";

  const getBooks = () => {
    axios.get(url).then((response) => {
      const booksFromServer = response.data.items;
      setBooks(booksFromServer);
      console.log(booksFromServer)
      console.log(url)
    });
  };

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
