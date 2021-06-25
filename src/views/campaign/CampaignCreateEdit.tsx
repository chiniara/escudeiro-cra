import {
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import db from "../../config/database";
import Campaign from "../../models/Campaign";

const CampaignCreateEdit: FunctionComponent = () => {
  const [validated, setValidated] = useState(false);

  const [campaign, setCampaign] = useState<Campaign>(new Campaign());

  const { campaignId } = useParams<{ campaignId: string }>();

  let history = useHistory();

  useEffect(() => {
    const getCampaign = async () => {
      if (!campaignId) return;

      const campaign = await db.campaigns.get<Campaign>(campaignId);
      setCampaign(campaign);
    };

    getCampaign();
  }, [campaignId]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    console.log(form.checkValidity() === false);
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    try {
      await db.campaigns.put(campaign);

      if (!campaignId) history.replace("/campaigns");
      else history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <header>
        <Container>
          <h3>{campaignId ? "Editar" : "Criar"} Campanha</h3>
        </Container>
      </header>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Nome da campanha</Form.Label>
            <Form.Control
              required
              type="text"
              value={campaign.name}
              onChange={(e) => {
                setCampaign({ ...campaign, name: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Por favor escolha um nome.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default CampaignCreateEdit;
