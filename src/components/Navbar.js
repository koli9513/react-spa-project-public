import { Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import {useContext} from "react";
import NavbarTheme from "./NavbarTheme";
import {NavbarStyle} from "./NavbarStyle";
import ThemeToggler from "./ThemeToggler";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = NavbarTheme[theme];

  return (
      <NavbarStyle style={{
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
      </NavbarStyle>
  );
};

export default Navbar;
