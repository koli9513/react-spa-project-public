import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import styled from "styled-components";

const ThemeTogglerStyle = styled.button
    .attrs({className: 'switch'})`
  //margin-left: 1450px;
  background-color: inherit;
`;

const ThemeToggler = () => {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  return (
    <ThemeTogglerStyle
        className="switch"
        onClick={() => {
        setThemeMode(themeMode === "normal" ? "dark" : "normal");
      }}
    >
      {themeMode === "normal" ? "🌙" : "☀️"}
    </ThemeTogglerStyle>
  );
};

export default ThemeToggler;
