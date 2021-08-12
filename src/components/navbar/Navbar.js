import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
import NavbarTheme from "../theme/NavbarTheme";
import { StyledNavbar } from "../styles/StyledNavbar";
import ThemeToggler from "../theme/ThemeToggler";
import SearchBox from "../search/SearchBox";
import { StyledNavbarLink } from "../styles/StyledNavbarLink";
import { StyledSearchBox } from "../styles/StyledSearchBox";
import ButtonTheme from "../theme/ButtonTheme";
import CatGif from "../theme/CatGif";

const Navbar = () => {
  const theme = useContext(ThemeContext)[0];
  const navbarTheme = NavbarTheme[theme];
  const buttonTheme = ButtonTheme[theme];
  const navLinkContainerStyle = {
    float: "left",
    left: "17%",
    position: "absolute",
  };
  const navLinkStyle = {
    backgroundColor: `${buttonTheme.backgroundColor}`,
    color: `${buttonTheme.color}`,
    borderColor: `${buttonTheme.borderColor}`,
  };

  return (
      <div>
          <StyledNavbar style={{
            backgroundColor: `${navbarTheme.backgroundColor}`,
            color: `${navbarTheme.color}`,
            border: `${navbarTheme.borderColor}`
          }}>
            <ThemeToggler />
              <div style={navLinkContainerStyle}>
                <StyledNavbarLink to="/" style={navLinkStyle}>Home</StyledNavbarLink>
                <StyledNavbarLink to="/browse" style={navLinkStyle}>Browse books</StyledNavbarLink>
                <StyledNavbarLink style={navLinkStyle} to="/favorites">Favorites</StyledNavbarLink>
              </div>
              <CatGif cat="1"/>
              <CatGif cat="2"/>
          </StyledNavbar>
          <StyledSearchBox style={{
              backgroundColor: `${navbarTheme.backgroundColor}`,
              color: `${navbarTheme.color}`,}}>
              <SearchBox />
          </StyledSearchBox>
      </div>
  );
};

export default Navbar;
