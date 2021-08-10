import axios from "axios";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const BookDetailedView = () => {
    const [bookDetails, setBookDetails] = useState([]);
    const { bookId } = useParams();

    useEffect(() => {
        const getBookDetail = () => {
            const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
            axios.get(url).then((response) => {
                const bookFromServer = response.data;
                const book = {
                    cover: bookFromServer.volumeInfo.imageLinks.smallThumbnail,
                    title: bookFromServer.volumeInfo.title ? bookFromServer.volumeInfo.title : "Not available",
                    author: bookFromServer.volumeInfo.authors ? bookFromServer.volumeInfo.authors : "Not available",
                    subtitle: bookFromServer.volumeInfo.subtitle ? bookFromServer.volumeInfo.subtitle : "Not available",
                    publisher: bookFromServer.volumeInfo.publisher ? bookFromServer.volumeInfo.publisher : "Not available",
                    publishedDate: bookFromServer.volumeInfo.publishedDate ? bookFromServer.volumeInfo.publishedDate : "Not available",
                    description: bookFromServer.volumeInfo.description ? bookFromServer.volumeInfo.description : "Description not available",
                    pageCount: bookFromServer.volumeInfo.pageCount ? bookFromServer.volumeInfo.pageCount : "Not available",
                    categories: bookFromServer.volumeInfo.categories ? bookFromServer.volumeInfo.categories : "Not available",
                    maturityRating: bookFromServer.volumeInfo.maturityRating ? bookFromServer.volumeInfo.maturityRating : "Not available",
                    previewLink: bookFromServer.volumeInfo.previewLink ? <a href={bookFromServer.volumeInfo.previewLink}>Preview</a> : null,
                    language: bookFromServer.volumeInfo.language ? bookFromServer.volumeInfo.language : "Not available",
                    amount: bookFromServer.saleInfo.listPrice ? bookFromServer.saleInfo.listPrice.amount : "Unavailable",
                    currencyCode: bookFromServer.saleInfo.listPrice ? bookFromServer.saleInfo.listPrice.currencyCode : null,
                    buyLink: bookFromServer.saleInfo.buyLink ? <a href={bookFromServer.saleInfo.buyLink}>Buy</a> : null,
                    webReaderLink: bookFromServer.accessInfo.webReaderLink ?
                        <a href={bookFromServer.accessInfo.webReaderLink}>Read sample</a> : null,
                };
                setBookDetails(book);
            });
        };
        getBookDetail();
    }, [bookId]);

    return (
        <div>
            <img src={bookDetails.cover} alt="cover"/>
            <h3>{bookDetails.title}</h3>
            <h5>Subtitle: {bookDetails.subtitle}</h5>
            <h4>Author(s): {bookDetails.author}</h4>
            <h5>Published date: {bookDetails.publishedDate}</h5>
            <h5>Publisher: {bookDetails.publisher}</h5>
            <h6>{bookDetails.description}</h6>
            <h5>Page count: {bookDetails.pageCount}</h5>
            <h5>Categories: {bookDetails.categories}</h5>
            <h5>Maturity rating: {bookDetails.maturityRating}</h5>
            <h5>Language: {bookDetails.language}</h5>
            <h5>List price: {bookDetails.amount} {bookDetails.currencyCode}</h5>
            {bookDetails.buyLink}<br/>
            {bookDetails.previewLink}<br/>
            {bookDetails.webReaderLink}
        </div>
    );
};

export default BookDetailedView;