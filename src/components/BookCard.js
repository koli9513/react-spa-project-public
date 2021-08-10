import { BookCardStyle } from "./BookCardStyle";

const BookCard = (props) => {
  return (
    <BookCardStyle>
      <img src={props.cover} alt="cover" />
      <div className="book info">
        <h5>{props.title}</h5>
        <h6>{props.author}</h6>
        <p>{props.published}</p>
      </div>
      <button>Add to favorites</button>
    </BookCardStyle>
  );
};

export default BookCard;
