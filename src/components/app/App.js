import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookList from "../lists/BookList";
import Navbar from "../navbar/Navbar";
import {useState} from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import "./App.css";
import FavoriteList from "../lists/FavoriteList";
import ThemeContext from "../contexts/ThemeContext";
import BookDetailedView from "../detailedview/BookDetailedView";
import SearchList from "../lists/SearchList";


function App() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const themeHook = useState("normal");

  return (
      <ThemeContext.Provider value={themeHook}>
        <FavoriteContext.Provider value={{ favoriteBooks, setFavoriteBooks }}>
          <Router>
            <div className="App">
              <Navbar />
              <Switch>
                <Route exact path="/"><BookList /></Route>
                <Route exact path="/"><BookList /></Route>
                <Route path="/search/:searchType/:searchTerm"><SearchList/></Route>
                <Route path="/genres">Genres</Route>
                <Route path="/favorites"><FavoriteList /></Route>
                <Route path="/book/:bookId"><BookDetailedView /></Route>
              </Switch>
            </div>
          </Router>
        </FavoriteContext.Provider>
      </ThemeContext.Provider>
  );
}

export default App;
