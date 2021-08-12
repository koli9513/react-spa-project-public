import { useState, useEffect } from "react";
import axios from "axios";
import Globals from "./Globals";

export default function useFetch(url) {
  const [books, setBooks] = useState([]);

  function correctMissingProperties(books) {
    return books.map((book) => {
      book = {
        cover: book.volumeInfo.hasOwnProperty("imageLinks")
          ? book.volumeInfo.imageLinks.thumbnail
          : Globals.missingImgUrl,
        title: book.volumeInfo.title ? book.volumeInfo.title : "Not available",
        authors: book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : [],
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
