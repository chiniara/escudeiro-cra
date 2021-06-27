import { faEraser, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import db from "../../config/database";
import Campaign from "../../models/Campaign";
import Location from "../../models/Location";
import "./Location.scss";
import { Modal } from "../../components/Modal";

const LocationList = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [campaign, setCampaign] = useState<Campaign>();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState("");
  const [locationToDelete, setlocationToDelete] = useState<Location>();

  const { campaignId } = useParams<{ campaignId: string }>();

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete: any = async (id: string) => {
    const result = locations.find((c) => c._id === id);
    setlocationToDelete(result);

    setdeleteMessage(
      `Tem certeza que deseja deletar a localidade ${result?.name}`
    );
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (locationToDelete) await db.locations.remove(locationToDelete);
    const newLocationList = locations.filter(
      (c) => c._id !== locationToDelete?._id
    );
    setLocations(newLocationList);
    handleCloseDelete();
  };

  useEffect(() => {
    const getCampaign = async () => {
      if (!campaignId) return;

      const campaign = await db.campaigns.get<Campaign>(campaignId);
      setCampaign(campaign);
    };

    const getLocations = async () => {
      try {
        const result = await db.locations.find({ selector: { campaignId } });
        setLocations(result.docs as Location[]);
      } catch (error) {
        console.log(error);
      }
    };

    getLocations();
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
              <h4>Localidades</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="locations/new">
                <Button>+</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </header>
      <Container>
        {locations &&
          locations.length > 0 &&
          locations
            .map((c, i) => {
              return (
                <Row key={c._id + i}>
                  <Col>
                    <Card className="location-info">
                      <Card.Header>
                        <strong>{c.name}</strong>
                      </Card.Header>
                      <Card.Body>
                        <Col>
                          <Link to={`locations/${c._id}/view`}>
                            <Button variant="success">
                              <FontAwesomeIcon icon={faEye} />
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

export default LocationList;
