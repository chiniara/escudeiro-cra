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
import Character from "../../models/Character";

const CharacterCreateEdit: FunctionComponent = () => {
  const [validated, setValidated] = useState(false);

  const [character, setCharacter] = useState<Character>(new Character());

  const { campaignId, characterId } =
    useParams<{ campaignId: string; characterId: string }>();

  let history = useHistory();

  useEffect(() => {
    const getCharacter = async () => {
      if (!characterId) return;

      const character = await db.characters.get<Character>(characterId);
      setCharacter(character);
    };

    getCharacter();
  }, [characterId]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCharacter({ ...character, [event.target.name]: event.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        if (!character.campaignId) {
          character.campaignId = campaignId;
        }
        setCharacter(character);
        await db.characters.put(character);

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
          <h3>{characterId ? "Editar" : "Criar"} Personagem</h3>
        </Container>
      </header>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              value={character.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor escolha um nome.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="sex">
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              required
              name="sex"
              type="text"
              value={character.sex}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor escolha um sexo.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              required
              name="age"
              type="number"
              value={character.age}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor escolha uma idade.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              name="description"
              type="text"
              value={character.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="sheet">
            <Form.Label>Ficha</Form.Label>
            <Form.Control
              name="sheet"
              as={"textarea"}
              value={character.sheet}
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

export default CharacterCreateEdit;
