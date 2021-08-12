import styled, {css} from "styled-components";

export const StyledNavbar = styled.div
    .attrs({className: 'card'})`
  padding: 30px 50px;
  display: grid;

  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

`;