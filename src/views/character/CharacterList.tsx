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
  Modal,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import db from "../../config/database";
import Campaign from "../../models/Campaign";
import Character from "../../models/Character";
import "./Character.scss";

const CampaignList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [campaign, setCampaign] = useState<Campaign>();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState("");
  const [characterToDelete, setcharacterToDelete] = useState<Character>();

  const { campaignId } = useParams<{ campaignId: string }>();

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete: any = async (id: string) => {
    const result = characters.find((c) => c._id === id);
    setcharacterToDelete((oldState) => result);

    setdeleteMessage(
      `Tem certeza que deseja deletar a personagem ${characterToDelete?.name}`
    );
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (characterToDelete) await db.characters.remove(characterToDelete);
    const newCharacterList = characters.filter(
      (c) => c._id !== characterToDelete?._id
    );
    setCharacters(newCharacterList);
    handleCloseDelete();
  };

  useEffect(() => {
    const getCampaign = async () => {
      if (!campaignId) return;

      const campaign = await db.campaigns.get<Campaign>(campaignId);
      setCampaign(campaign);
    };

    const getCharacters = async () => {
      try {
        const result = await db.characters.find({ selector: { campaignId } });
        setCharacters(result.docs as Character[]);
      } catch (error) {
        console.log(error);
      }
    };

    getCharacters();
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
              <h4>Personagens</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="characters/new">
                <Button>+</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </header>
      <Container>
        {characters &&
          characters.length > 0 &&
          characters
            .map((c, i) => {
              return (
                <Row key={c._id + i}>
                  <Col>
                    <Card className="character-info">
                      <Card.Header>
                        <strong>{c.name}</strong>
                      </Card.Header>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>Idade: {c.age}</ListGroupItem>
                        <ListGroupItem>
                          Descrição: {c.description}
                        </ListGroupItem>
                        <ListGroupItem>{c.sex}</ListGroupItem>
                        <Accordion defaultActiveKey="0">
                          <Accordion.Toggle
                            as={ListGroupItem}
                            className="sheet-open-button"
                            eventKey="0"
                          >
                            <strong>Ficha</strong>{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey="0">
                            <ListGroupItem>{c.sheet}</ListGroupItem>
                          </Accordion.Collapse>
                        </Accordion>
                      </ListGroup>
                      <Card.Body>
                        <Col>
                          <Button variant="warning">
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </Button>
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
      <Modal size={"sm"} show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar Personagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>{deleteMessage}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Fechar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CampaignList;
