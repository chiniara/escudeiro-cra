import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import MainMenu from "./views/main-menu/MainMenu";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div className="App">
      <Container>
        <Router>
          <header>
            <Link to="/">
              <h1 className="title">ESCUDEIRO</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/campaigns"></Route>
            <Route path="/compendiums"></Route>
            <Route path="/generators"></Route>
            <Route path="/">
              <MainMenu />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
};

export default App;
