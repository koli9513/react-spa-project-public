import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [books, setBooks] = useState([]);
  const missingImgUrl =
    "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

  function correctMissingProperties(books) {
    return books.map((book) => {
      book = {
        cover: book.volumeInfo.hasOwnProperty("imageLinks")
          ? book.volumeInfo.imageLinks.thumbnail
          : missingImgUrl,
        title: book.volumeInfo.title ? book.volumeInfo.title : "Not available",
        author: book.volumeInfo.authors
          ? book.volumeInfo.authors
          : "Not available",
        publishedDate: book.volumeInfo.publishedDate
          ? book.volumeInfo.publishedDate
          : "Not available",
        id: book.id,
      };
      return book;
    });
  }

  useEffect(() => {
    const getBooks = () => {
      axios.get(url).then((response) => {
        console.log(url);
        const booksFromServer = response.data.items;
        const cleaned = correctMissingProperties(booksFromServer);
        setBooks(cleaned);
      });
    };
    getBooks();
  }, [url]);

  return [books];
}
