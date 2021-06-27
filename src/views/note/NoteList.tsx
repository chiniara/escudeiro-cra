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
import Note from "../../models/Note";
import "./Note.scss";
import { Modal } from "../../components/Modal";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [campaign, setCampaign] = useState<Campaign>();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState("");
  const [noteToDelete, setnoteToDelete] = useState<Note>();

  const { campaignId } = useParams<{ campaignId: string }>();

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete: any = async (id: string) => {
    const result = notes.find((c) => c._id === id);
    setnoteToDelete(result);

    setdeleteMessage(`Tem certeza que deseja deletar a nota ${result?.title}`);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (noteToDelete) await db.notes.remove(noteToDelete);
    const newNoteList = notes.filter((c) => c._id !== noteToDelete?._id);
    setNotes(newNoteList);
    handleCloseDelete();
  };

  useEffect(() => {
    const getCampaign = async () => {
      if (!campaignId) return;

      const campaign = await db.campaigns.get<Campaign>(campaignId);
      setCampaign(campaign);
    };

    const getNotes = async () => {
      try {
        const result = await db.notes.find({ selector: { campaignId } });
        setNotes(result.docs as Note[]);
      } catch (error) {
        console.log(error);
      }
    };

    getNotes();
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
              <h4>Notas</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="notes/new">
                <Button>+</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </header>
      <Container>
        {notes &&
          notes.length > 0 &&
          notes
            .map((c, i) => {
              return (
                <Row key={c._id + i}>
                  <Col>
                    <Card className="note-info">
                      <Card.Header>
                        <strong>{c.title}</strong>
                      </Card.Header>
                      <ListGroup className="list-group-flush">
                        <Accordion>
                          <Accordion.Toggle
                            as={ListGroupItem}
                            className="sheet-open-button"
                            eventKey="0"
                          >
                            <strong>Conteúdo</strong>{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey="0">
                            <ListGroupItem className="content">
                              {c.content}
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

export default NoteList;
