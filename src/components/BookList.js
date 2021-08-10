import axios from "axios";
import { useState, useEffect } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);

  const url = "https://www.googleapis.com/books/v1/volumes?q=excalibur";

  const getBooks = () => {
    axios.get(url).then((response) => {
      const booksFromServer = response.data.items;
      setBooks(booksFromServer);
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      {books.map((book, index) => (
        <>
          <div key={index}>{book.volumeInfo.title}</div>
          <img
            src={book.volumeInfo.imageLinks.smallThumbnail}
            alt="cover"
            key={index + 1}
          />
        </>
      ))}
    </div>
  );
};

export default BookList;
