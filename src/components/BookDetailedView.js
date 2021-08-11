import axios from "axios";
import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {BookDetailedViewStyle} from "./BookDetailedViewStyle";
import ThemeContext from "./ThemeContext";
import AppTheme from "./AppTheme";
import {CoverImageStyle} from "./CoverImageStyle";
import Globals from "./Globals";

const BookDetailedView = () => {
    const [bookDetails, setBookDetails] = useState([]);
    const { bookId } = useParams();
    const theme = useContext(ThemeContext)[0];
    const currentTheme = AppTheme[theme];

    useEffect(() => {
        const getBookDetail = () => {
            const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
            axios.get(url).then((response) => {
                const bookFromServer = response.data;
                const cleaned = correctMissingProperties(bookFromServer)
                setBookDetails(cleaned);
            });
        };
        getBookDetail();
    }, [bookId]);

    function correctMissingProperties(book) {
        return {
                cover: book.volumeInfo.hasOwnProperty("imageLinks") === true ? book.volumeInfo.imageLinks.thumbnail :
                    Globals.missingImgUrl,
                title: book.volumeInfo.title ? book.volumeInfo.title : Globals.notAvailableMessage,
                author: book.volumeInfo.authors ? book.volumeInfo.authors : Globals.notAvailableMessage,
                publishedDate: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : Globals.notAvailableMessage,
                subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : null,
                publisher: book.volumeInfo.publisher ? book.volumeInfo.publisher : Globals.notAvailableMessage,
                description: book.volumeInfo.description ? book.volumeInfo.description : Globals.notAvailableMessage,
                pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : Globals.notAvailableMessage,
                categories: book.volumeInfo.categories ? book.volumeInfo.categories : Globals.notAvailableMessage,
                maturityRating: book.volumeInfo.maturityRating ? book.volumeInfo.maturityRating : Globals.notAvailableMessage,
                previewLink: book.volumeInfo.previewLink ? <a href={book.volumeInfo.previewLink}>Preview</a> : null,
                language: book.volumeInfo.language ? book.volumeInfo.language : Globals.notAvailableMessage,
                amount: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : Globals.notAvailableMessage,
                currencyCode: book.saleInfo.listPrice ? book.saleInfo.listPrice.currencyCode : null,
                buyLink: book.saleInfo.buyLink ? <a href={book.saleInfo.buyLink}>Buy</a> : null,
                webReaderLink: book.accessInfo.webReaderLink ?
                    <a href={book.accessInfo.webReaderLink}>Read sample</a> : null,
            };
    }

    return (
        <BookDetailedViewStyle style={{
            backgroundColor: `${currentTheme.backgroundColor}`,
            color: `${currentTheme.color}`,
            border: `${currentTheme.borderColor}`,
        }}>
            <div className="image-left">
                <CoverImageStyle src={bookDetails.cover} alt="cover"/>
            </div>
            <div className="book-info-right">
                <h1>{bookDetails.title}</h1>
                <h3>{bookDetails.subtitle}</h3>
                <h2>Author(s): {bookDetails.author}</h2>
                <h3>Published date: {bookDetails.publishedDate}</h3>
                <h3>Publisher: {bookDetails.publisher}</h3>
            </div>
            <div dangerouslySetInnerHTML={{__html :bookDetails.description}} />
            <h4>Page count: {bookDetails.pageCount}</h4>
            <h4>Categories: {bookDetails.categories}</h4>
            <h4>Maturity rating: {bookDetails.maturityRating}</h4>
            <h4>Language: {bookDetails.language}</h4>
            <h4>List price: {bookDetails.amount} {bookDetails.currencyCode}</h4>
            <div className="links">{bookDetails.buyLink}   {bookDetails.previewLink}   {bookDetails.webReaderLink}</div>
        </BookDetailedViewStyle>
    );
};

export default BookDetailedView;