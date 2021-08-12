import styled, {css} from "styled-components";

export const StyledBookCard = styled.div
    .attrs({className: 'card'})`
  position: relative;

    ${props => props && css`
      &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.41);
      }
    `}
`;