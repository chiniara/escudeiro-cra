import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import "./DiceRollerModal.scss";

const DiceRollerModal = ({
  onCancel,
  isVisible,
}: {
  onCancel: () => void;
  isVisible: boolean;
}) => {
  const [rollHistory, setRollHistory] = useState<string[]>([]);
  const [modifier, setModifier] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.querySelector(".anchor")?.scrollIntoView();
  });

  const rollDice = (faces: number) => {
    return Math.ceil(Math.random() * faces);
  };

  const renderDice = (diceList: Die[]) => {
    return diceList.map((die, index) => {
      return (
        <Button
          key={index}
          onClick={() => {
            setRollHistory([
              ...rollHistory,
              addRollToHistory(quantity, die.faces, modifier),
            ]);
          }}
        >
          D{die.faces}
        </Button>
      );
    });
  };

  const parseDiceQuantity = (e: any) => {
    setQuantity(
      (parseInt(e.target.value!) ?? 1) < 1 ? 1 : parseInt(e.target.value!) ?? 1
    );
  };

  const parseModifier = (e: any) => {
    setModifier(parseInt(e.target.value!) ?? 0);
  };

  const addRollToHistory = (
    quantity: number,
    faces: number,
    modifier: number
  ) => {
    const results = [];
    for (let i = 0; i < quantity; i++) {
      results.push(rollDice(faces));
    }
    return `[${results.join(",")}] ${quantity}d${faces} ${
      modifier >= 0 ? "+" : "-"
    } ${Math.abs(modifier)} = ${
      results.reduce((total, result) => total + result, 0) + modifier
    }`;
  };

  const diceList: Die[] = [
    { faces: 4 },
    { faces: 6 },
    { faces: 8 },
    { faces: 10 },
    { faces: 12 },
    { faces: 20 },
    { faces: 100 },
  ];

  return (
    <Modal
      size="sm"
      dialogClassName="dice-roller-modal"
      show={isVisible}
      onHide={onCancel}
    >
      <Modal.Header closeButton>
        <Modal.Title>Rolagem de Dados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <ListGroup className="dice-roll-history">
            {rollHistory.map((roll, index) => {
              return <ListGroup.Item key={index}>{roll}</ListGroup.Item>;
            })}
            <div className="anchor"></div>
          </ListGroup>
        </Container>
        <Container>
          <Card className="dice-bar">
            <Card.Body>
              <Row>
                <Col>
                  <div className="quantity">
                    <Form.Group controlId="quantity">
                      <Form.Label>Quantidade</Form.Label>

                      <Form.Control
                        min="1"
                        inputMode="numeric"
                        type="number"
                        value={quantity}
                        onChange={(e) => parseDiceQuantity(e)}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="dice">{renderDice(diceList)}</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="modifier">
                    <Form.Group controlId="modifier">
                      <Form.Label>Modificador</Form.Label>

                      <FormControl
                        type="number"
                        value={modifier}
                        onChange={(e) => parseModifier(e)}
                      ></FormControl>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiceRollerModal;

type Die = { faces: number };
