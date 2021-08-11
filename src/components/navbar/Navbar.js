import { Link } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import {useContext} from "react";
import NavbarTheme from "../theme/NavbarTheme";
import {StyledNavbar} from "../styles/StyledNavbar";
import ThemeToggler from "../theme/ThemeToggler";
import SearchBox from "../search/SearchBox";

const Navbar = () => {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = NavbarTheme[theme];

  return (
      <StyledNavbar style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.color}`,
      }}>
        <ThemeToggler />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <SearchBox />
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/genres">Genres</Link>
            </li>
          </ul>
        </nav>
      </StyledNavbar>
  );
};

export default Navbar;
