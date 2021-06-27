import React, { useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link, useHistory, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "./routes";
import DiceRollerModal from "./components/dice-roller-modal/DiceRollerModal";

const App = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <Button variant="warning" onClick={handleShow}>
          <FontAwesomeIcon icon={faDice} />
        </Button>
      </header>
      <Switch>
        <Route exact path="/">
          <Redirect to="/campaigns" />
        </Route>
        {routes.map((route: any, i: number) => {
          return <RouteWithSubRoutes key={i} {...route} />;
        })}
      </Switch>
      <DiceRollerModal isVisible={show} onCancel={handleClose} />
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
