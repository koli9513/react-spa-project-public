import styled from "styled-components";
import filled from "../styles/star_filled.png";
import empty from "../styles/star_empty.png";
import hover from "../styles/star_hover.png";

export const StyledFavoriteButton = styled.button`
  top: 0;
  left: 0;
  border: 1px solid black;
  position: absolute;
  background-color: inherit;
  display: block;
  cursor: pointer;
  width: 33px;
  height: 33px;
  background-size: contain;
  background-image: url("${({ addedToFavorite }) =>
    addedToFavorite ? filled : empty}");
  background-repeat: no-repeat;

  &:hover {
    background-image: url("${hover}");
  }
`;

