import {KeywordProvider} from "./KeywordProvider";

const Globals = {
    notAvailableMessage: <i>Not available</i>,
    missingImgUrl: "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg",
    homePageApiUrl: `https://www.googleapis.com/books/v1/volumes?q=${KeywordProvider}&maxResults=20`,
    maxResults: "&maxResults=20",
    apiUrlBase: "https://www.googleapis.com/books/v1/volumes?q=",
    apiPartForGenres: "subject:",
    words: [
        "+inauthor:sigmund+freud",
        "ShakesPeare",
        "+inauthor:endre+ady",
        "+inauthor:jane+austen",
        "+intitle:qing",
        "+inauthor:patrick+rothfuss",
        "+inauthor:sylvia+plath",
        "+inauthor:j+d+salinger",
        "+inauthor:tennessee+williams",
        "+inauthor:j+r+r+tolkien",
        "+inauthor:terry+pratchett",
    ],
};

export default Globals;