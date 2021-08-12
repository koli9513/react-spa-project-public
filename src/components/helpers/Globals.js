import {KeywordProvider} from "./KeywordProvider";

const Globals = {
    notAvailableMessage: <i>Not available</i>,
    missingImgUrl: "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg",
    homePageApiUrl: `https://www.googleapis.com/books/v1/volumes?q=${KeywordProvider}&maxResults=20`,
    maxResults: "&maxResults=20",
    apiUrlBase: "https://www.googleapis.com/books/v1/volumes?q="
};

export default Globals;