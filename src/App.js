import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookList from "./components/BookList";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
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
  );
}

export default App;
