import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MainMenu.scss";

const MainMenu = () => {
  return (
    <Container className="main-menu">
      <Col>
        <Row className="menu-item">
          <Link to="/campaigns">
            <Button variant="light">Campanhas</Button>
          </Link>
        </Row>
        <Row className="menu-item">
          <Link to="/compendiums">
            <Button variant="light">Compêndios</Button>
          </Link>
        </Row>
        <Row className="menu-item">
          <Link to="/generators">
            <Button variant="light">Geradores</Button>
          </Link>
        </Row>
      </Col>
    </Container>
  );
};

export default MainMenu;
