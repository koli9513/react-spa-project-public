import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookList from "./components/BookList";
import Navbar from "./components/Navbar";
import {useState} from "react";
import { FavoriteContext } from "./components/FavoriteContext";
import "./App.css";
import FavoriteList from "./components/FavoriteList";
import ThemeContext from "./components/ThemeContext";
import BookDetailedView from "./components/BookDetailedView";
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
