import styled, {css} from "styled-components";

export const StyledSearchBox = styled.div
    .attrs({className: 'box'})`
  position: absolute;
  width: 100%;

  ${props => props && css`
    transition: 0.1s;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    & button {
      font-size: 160%;
      display: inline-block;
      position: relative;
      padding: 5px 15px;
      margin: 2px 10px;
      font-weight: bold;
    }

    & input {
      font-size: 160%;
      display: inline-block;
      position: relative;
      padding: 5px 15px;
      margin: 2px 10px;
      font-weight: bold;
    }
    
    & select {
      font-size: 160%;
      display: inline-block;
      position: relative;
      padding: 5px 15px;
      margin: 2px 10px;
      font-weight: bold;
    }
  `}
`;