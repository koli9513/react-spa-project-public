import React, { useContext, useEffect } from "react";
import ThemeContext from "../contexts/ThemeContext";
import styled from "styled-components";

const ThemeTogglerStyle = styled.button.attrs({ className: "switch" })`
  //margin-left: 1450px;
  background-color: inherit;
  width: 40px;
  height: 30px;
`;

const ThemeToggler = () => {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeMode));
  }, [themeMode]);

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
