import { faPencilAlt, faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import db from "../../config/database";
import Campaign from "../../models/Campaign";

const CampaignView = () => {
  const { campaignId } = useParams<{ campaignId: string }>();

  const [showDelete, setShowDelete] = useState(false);
  const [campaign, setCampaign] = useState<Campaign>();

  let history = useHistory();

  useEffect(() => {
    const getCampaign = async () => {
      if (!campaignId || campaignId === "new") return;

      const campaign = await db.campaigns.get<Campaign>(campaignId);
      setCampaign(campaign);
    };

    getCampaign();
  }, [campaignId]);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleDelete = async () => {
    try {
      if (campaign) await db.campaigns.remove(campaign);
      history.replace("/campaigns");
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseDelete();
    }
  };

  return (
    <Container>
      <header>
        <Container>
          <Row>
            <Col>
              <h3 className="campaign-title">{campaign?.name}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to={`${campaignId}/edit`}>
                <Button variant="warning">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
              </Link>
              <Button variant="danger" onClick={handleShowDelete}>
                <FontAwesomeIcon icon={faEraser} />
              </Button>
            </Col>
          </Row>
        </Container>
      </header>
      <Container>
        <ListGroup></ListGroup>

        <Modal size={"sm"} show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Deletar Campanha</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja deletar essa campanha?</Modal.Body>
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
    </Container>
  );
};

export default CampaignView;
