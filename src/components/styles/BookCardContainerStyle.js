import styled, {} from "styled-components";

export const BookCardsContainerStyle = styled.div
    .attrs({className: 'cards'})`
  padding: 100px 50px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  min-height: 537px;
`;