import styled, {css} from "styled-components";
import {Link} from "react-router-dom";

export const StyledNavbarLink = styled(Link)`
  display: inline-block;
  width: 170px;
  position: relative;
  border: solid 2px #eee;
  padding: 5px 15px;
  margin: 2px 10px;
  text-decoration: none;
  font-weight: bold;
  color: #333;
  left: 25%;
  font-size: x-large;
  box-shadow: 0 8px 16px 0 rgba(143, 143, 143, 0.58);

  ${props => props && css`
    transition: 0.1s;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.66);
    }
  `}
`;