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
import GameSession from "../../models/GameSession";

import "./GameSession.scss";
import DatePicker from "../../components/date-picker/DatePicker";

const GameSessionCreateEdit: FunctionComponent = () => {
  const [validated, setValidated] = useState(false);

  const [gameSession, setGameSession] = useState<GameSession>(
    new GameSession()
  );

  const { campaignId, gameSessionId } =
    useParams<{ campaignId: string; gameSessionId: string }>();

  let history = useHistory();

  useEffect(() => {
    const getGameSession = async () => {
      if (!gameSessionId) return;

      const gameSession = await db.gameSessions.get<GameSession>(gameSessionId);
      setGameSession(gameSession);
    };

    getGameSession();
  }, [gameSessionId]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGameSession({ ...gameSession, [event.target.name]: event.target.value });
  };

  const handleDateChange = (day: any) => {
    setGameSession({ ...gameSession, date: day });
    console.log(gameSession);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        if (!gameSession.campaignId) {
          gameSession.campaignId = campaignId;
        }
        setGameSession(gameSession);
        await db.gameSessions.put(gameSession);

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
          <h3>{gameSessionId ? "Editar" : "Criar"} Sessão</h3>
        </Container>
      </header>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <DatePicker
            currentDay={gameSession.date}
            handleChange={handleDateChange}
          />
          <Form.Group controlId="before">
            <Form.Label>Antes</Form.Label>
            <Form.Control
              name="before"
              as={"textarea"}
              value={gameSession.before}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="during">
            <Form.Label>Durante</Form.Label>
            <Form.Control
              name="during"
              as={"textarea"}
              value={gameSession.during}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="after">
            <Form.Label>Depois</Form.Label>
            <Form.Control
              name="after"
              as={"textarea"}
              value={gameSession.after}
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

export default GameSessionCreateEdit;
