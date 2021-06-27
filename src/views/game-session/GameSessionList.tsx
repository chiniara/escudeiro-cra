import {
  faPencilAlt,
  faEraser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  ListGroup,
  Row,
  Col,
  Card,
  ListGroupItem,
  Accordion,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import db from "../../config/database";
import Campaign from "../../models/Campaign";
import GameSession from "../../models/GameSession";
import "./GameSession.scss";
import { Modal } from "../../components/Modal";
import MomentLocaleUtils from "react-day-picker/moment";

const GameSessionList = () => {
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const [campaign, setCampaign] = useState<Campaign>();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState("");
  const [gameSessionToDelete, setgameSessionToDelete] = useState<GameSession>();

  const { campaignId } = useParams<{ campaignId: string }>();

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete: any = async (id: string) => {
    const result = gameSessions.find((c) => c._id === id);
    setgameSessionToDelete(result);

    setdeleteMessage(
      `Tem certeza que deseja deletar a sessão do dia ${
        result?.date && MomentLocaleUtils.formatDate(result.date, "DD/MM/YYYY")
      }`
    );
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (gameSessionToDelete) await db.gameSessions.remove(gameSessionToDelete);
    const newGameSessionList = gameSessions.filter(
      (c) => c._id !== gameSessionToDelete?._id
    );
    setGameSessions(newGameSessionList);
    handleCloseDelete();
  };

  useEffect(() => {
    const getCampaign = async () => {
      if (!campaignId) return;

      const campaign = await db.campaigns.get<Campaign>(campaignId);
      setCampaign(campaign);
    };

    const getGameSessions = async () => {
      try {
        const result = await db.gameSessions.find({ selector: { campaignId } });
        setGameSessions(result.docs as GameSession[]);
      } catch (error) {
        console.log(error);
      }
    };

    getGameSessions();
    getCampaign();
  }, [campaignId]);

  return (
    <Container>
      <header>
        <Container>
          <Row>
            <Col>
              <h3>{campaign?.name}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Sessões</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="sessions/new">
                <Button>+</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </header>
      <Container>
        {gameSessions &&
          gameSessions.length > 0 &&
          gameSessions
            .map((c, i) => {
              return (
                <Row key={c._id + i}>
                  <Col>
                    <Card className="gameSession-info">
                      <Card.Header>
                        <strong>
                          {MomentLocaleUtils.formatDate(c.date, "DD/MM/YYYY")}
                        </strong>
                      </Card.Header>
                      <ListGroup className="list-group-flush">
                        <Accordion>
                          <Accordion.Toggle
                            as={ListGroupItem}
                            className="sheet-open-button"
                            eventKey="0"
                          >
                            <strong>Antes</strong>{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey="0">
                            <ListGroupItem className="content">
                              {c.before}
                            </ListGroupItem>
                          </Accordion.Collapse>
                        </Accordion>
                        <Accordion>
                          <Accordion.Toggle
                            as={ListGroupItem}
                            className="sheet-open-button"
                            eventKey="1"
                          >
                            <strong>Durante</strong>{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey="1">
                            <ListGroupItem className="content">
                              {c.during}
                            </ListGroupItem>
                          </Accordion.Collapse>
                        </Accordion>
                        <Accordion>
                          <Accordion.Toggle
                            as={ListGroupItem}
                            className="sheet-open-button"
                            eventKey="2"
                          >
                            <strong>Depois</strong>{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey="2">
                            <ListGroupItem className="content">
                              {c.after}
                            </ListGroupItem>
                          </Accordion.Collapse>
                        </Accordion>
                      </ListGroup>
                      <Card.Body>
                        <Col>
                          <Link to={`sessions/${c._id}/edit`}>
                            <Button variant="warning">
                              <FontAwesomeIcon icon={faPencilAlt} />
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => handleShowDelete(c._id)}
                          >
                            <FontAwesomeIcon icon={faEraser} />
                          </Button>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              );
            })
            .sort()}
      </Container>
      <Modal
        onCancel={handleCloseDelete}
        onConfirm={handleDelete}
        message={deleteMessage}
        isVisible={showDelete}
      />
    </Container>
  );
};

export default GameSessionList;
