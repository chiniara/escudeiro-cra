import {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import db from "../../config/database";
import Note from "../../models/Note";

import "./Note.scss";

const NoteCreateEdit: FunctionComponent = () => {
  const [validated, setValidated] = useState(false);

  const [note, setNote] = useState<Note>(new Note());

  const { campaignId, noteId } =
    useParams<{ campaignId: string; noteId: string }>();

  console.log(campaignId, noteId);
  let history = useHistory();

  useEffect(() => {
    const getNote = async () => {
      if (!noteId) return;

      const note = await db.notes.get<Note>(noteId);
      setNote(note);
    };

    getNote();
  }, [noteId]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        if (!note.campaignId) {
          note.campaignId = campaignId;
        }
        setNote(note);
        await db.notes.put(note);

        history.goBack();
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
  };

  return (
    <Container>
      <header>
        <Container>
          <h3>{noteId ? "Editar" : "Criar"} Nota</h3>
        </Container>
      </header>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Título</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={note.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Conteúdo</Form.Label>
            <Form.Control
              name="content"
              as={"textarea"}
              value={note.content}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default NoteCreateEdit;
