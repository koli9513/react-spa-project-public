import { useContext } from "react";
import BookCard from "../bookcard/BookCard";
import { BookCardsContainerStyle } from "../styles/BookCardContainerStyle";
import AppTheme from "../theme/AppTheme";
import ThemeContext from "../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import useFetch from "../helpers/useFetch";

const GenreList = () => {
    const theme = useContext(ThemeContext)[0];
    const currentTheme = AppTheme[theme];
    const { genre } = useParams();
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=30`;
    console.log(url)

    const [books] = useFetch(url);

    return (
        <BookCardsContainerStyle
            style={{
                backgroundColor: `${currentTheme.backgroundColor}`,
                color: `${currentTheme.color}`,
                border: `${currentTheme.borderColor}`,
            }}
        >
            {books.map((book, index) => (
                <BookCard
                    key={index}
                    cover={book.cover}
                    authors={book.authors}
                    title={book.title}
                    published={book.publishedDate}
                    id={book.id}
                    fromFavoriteList={false}
                />
            ))}
        </BookCardsContainerStyle>
    );
};

export default GenreList;
