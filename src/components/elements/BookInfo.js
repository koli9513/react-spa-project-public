import React from "react";

export const BookInfo = ({props}) =>
    <div>
        <h4>{props.title}</h4>
        <h5>{props.authors}</h5>
        <p>{props.published}</p>
    </div>