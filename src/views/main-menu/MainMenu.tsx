import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MainMenu.scss";

const MainMenu = () => {
  return (
    <div className="main-menu">
      <Container>
        <Row className="menu-item">
          <Col>
            <Link to="/campaigns">
              <Button variant="light">Campanhas</Button>
            </Link>
          </Col>
        </Row>
        <Row className="menu-item">
          <Col>
            <Link to="/compendiums">
              <Button variant="light">Compêndios</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/generators">
              <Button variant="light">Geradores</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainMenu;
