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
                const cleaned = correctMissingProperties(bookFromServer)
                setBookDetails(cleaned);
            });
        };
        getBookDetail();
    }, [bookId]);

    function correctMissingProperties(book) {
        return {
                cover: book.volumeInfo.hasOwnProperty("imageLinks") === true ? book.volumeInfo.imageLinks.thumbnail :
                    "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg",
                title: book.volumeInfo.title ? book.volumeInfo.title : "Not available",
                author: book.volumeInfo.authors ? book.volumeInfo.authors : "Not available",
                publishedDate: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "Not available",
                subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "Not available",
                publisher: book.volumeInfo.publisher ? book.volumeInfo.publisher : "Not available",
                description: book.volumeInfo.description ? book.volumeInfo.description : "Description not available",
                pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "Not available",
                categories: book.volumeInfo.categories ? book.volumeInfo.categories : "Not available",
                maturityRating: book.volumeInfo.maturityRating ? book.volumeInfo.maturityRating : "Not available",
                previewLink: book.volumeInfo.previewLink ? <a href={book.volumeInfo.previewLink}>Preview</a> : null,
                language: book.volumeInfo.language ? book.volumeInfo.language : "Not available",
                amount: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : "Unavailable",
                currencyCode: book.saleInfo.listPrice ? book.saleInfo.listPrice.currencyCode : null,
                buyLink: book.saleInfo.buyLink ? <a href={book.saleInfo.buyLink}>Buy</a> : null,
                webReaderLink: book.accessInfo.webReaderLink ?
                    <a href={book.accessInfo.webReaderLink}>Read sample</a> : null,
            };
    }

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