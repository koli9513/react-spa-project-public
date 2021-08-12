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
      })
          .catch((error) => {

            if (error.response) {
               console.log(error.response.data);
                console.log(error.response.status);
               console.log(error.response.headers);
            } else if (error.request) {

              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
              alert('No books found');
              console.log(error.config);
          });
    };
    getBooks();
  }, [url]);

  return [books];
}
