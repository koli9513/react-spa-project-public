import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookList from "./components/BookList";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { FavoriteContext } from "./components/FavoriteContext";
import "./App.css";

function App() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  return (
    <FavoriteContext.Provider value={{ favoriteBooks, setFavoriteBooks }}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <BookList />
            </Route>
            <Route path="/genres">Genres</Route>
            <Route path="/favorites">Favorites</Route>
          </Switch>
        </div>
      </Router>
    </FavoriteContext.Provider>
  );
}

export default App;
