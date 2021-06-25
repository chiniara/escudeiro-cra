import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link, useHistory, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

import routes from "./routes";

const App = () => {
  let history = useHistory();

  const handleBack = () => {
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
        <Route exact path="/">
          <Redirect to="/campaigns" />
        </Route>
        {routes.map((route: any, i: number) => {
          return <RouteWithSubRoutes key={i} {...route} />;
        })}
      </Switch>
    </div>
  );
};

const RouteWithSubRoutes = (route: any) => {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

export default App;
