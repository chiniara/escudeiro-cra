import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import MainMenu from "./views/main-menu/MainMenu";
import { Button } from "react-bootstrap";

import CampaignList from "./views/campaign/CampaignList";
import CampaignItem from "./views/campaign/CampaignItem";

const App = () => {
  let history = useHistory();

  const handleBack = () => {
    console.log(history);
    history.goBack();
  };

  return (
    <div className="App">
      <header>
        <Link to="/">
          <h1 className="title">ESCUDEIRO</h1>
        </Link>
        <Button onClick={handleBack}>Voltar</Button>
      </header>
      <Switch>
        <Route path="/campaigns/:campaignId">
          <CampaignItem />
        </Route>
        <Route path="/campaigns">
          <CampaignList />
        </Route>

        <Route path="/compendiums"></Route>
        <Route path="/generators"></Route>
        <Route path="/">
          <MainMenu />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
