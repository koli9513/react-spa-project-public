import styled, {css} from "styled-components";

export const StyledBookDetailedView = styled.div
    .attrs({className: 'card'})`
  padding: 100px 50px;
  text-align: left;
  min-height: 537px;

  > .image-left {
    width: 15%;
    float: left;
    height: 280px;
  }
    .book-info-right {
      width: 85%;
      float: right;
      height: 280px;
    }
    
    .links {
      text-align: center;
      font-size: 27px;
      font-weight: bold;
  }
`;