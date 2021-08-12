import axios from "axios";
import {useState, useEffect, useContext} from "react";
import BookCard from "../bookcard/BookCard";
import { BookCardsContainerStyle } from "../styles/BookCardContainerStyle";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import {useParams} from "react-router-dom";
import Globals from "../helpers/Globals";


const SearchList = () => {
    const theme = useContext(ThemeContext)[0];
    const currentTheme = AppTheme[theme];
    const { searchType, searchTerm } = useParams();
    const { searchAuthor, searchTitle } = useParams();
    const searchIn = (() => {
        if (searchType === "author")
            return '+inauthor:'
        else if (searchType === "title")
            return '+intitle:'
        else if (searchType === "publisher")
            return '+inpublisher:'
        else if (searchType === "subject")
            return '+subject:'
        else if (searchType === "isbn")
            return '+isbn:'
    })();
    const advancedSearch = `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${searchAuthor}+intitle:${searchTitle}&maxResults=30`;
    const simpleSearch = `https://www.googleapis.com/books/v1/volumes?q=${searchIn}${searchTerm}&maxResults=30`;
    const url = searchType ? simpleSearch : advancedSearch;

    const [books, setBooks] = useState([]);
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
                cover: book.volumeInfo.hasOwnProperty("imageLinks") ? book.volumeInfo.imageLinks.thumbnail : Globals.missingImgUrl,
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

export default SearchList;
