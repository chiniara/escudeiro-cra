import { CRS, LatLngBounds } from "leaflet";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Modal as BootstrapModal,
  Row,
  Table,
} from "react-bootstrap";
import {
  ImageOverlay,
  MapContainer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import {
  faChevronDown,
  faEraser,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import db from "../../config/database";
import Campaign from "../../models/Campaign";
import Location from "../../models/Location";
import LocationMarker from "../../models/LocationMarker";
import { Modal } from "../../components/Modal";
import "./Location.scss";

const LocationView = () => {
  const [location, setLocation] = useState<Location>(new Location());
  const [campaign, setCampaign] = useState<Campaign>();
  const [mapUrl, setmapUrl] = useState<string>("");
  const [locationMarkers, setLocationMarkers] = useState<LocationMarker[]>([]);
  const [showMarkerAdd, setShowMarkerAdd] = useState(false);
  const [markerToAdd, setMarkerToAdd] = useState<LocationMarker>(
    new LocationMarker()
  );
  const [validated, setValidated] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [markerToDelete, setMarkerToDelete] = useState<LocationMarker>();
  const [deleteMessage, setdeleteMessage] = useState("");

  const { campaignId, locationId } =
    useParams<{ campaignId: string; locationId: string }>();

  const handleCloseMarkerAdd = () => setShowMarkerAdd(false);
  const handleShowMarkerAdd = () => setShowMarkerAdd(true);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMarkerToAdd({ ...markerToAdd, [event.target.name]: event.target.value });
  };

  const handleMarkerAdd: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        if (!markerToAdd.locationId) {
          markerToAdd.locationId = locationId;
        }
        setMarkerToAdd(markerToAdd);
        await db.marks.put(markerToAdd);

        setLocationMarkers([...locationMarkers, markerToAdd]);
        setMarkerToAdd(new LocationMarker());
        handleCloseMarkerAdd();
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
  };

  const getStringCoordinates = (locationMarker?: LocationMarker) => {
    return `${locationMarker?.coordinates.lat.toFixed(
      2
    )}, ${locationMarker?.coordinates.lng.toFixed(2)}`;
  };

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete: any = async (id: string) => {
    const result = locationMarkers.find((c) => c._id === id);
    setMarkerToDelete(result);

    setdeleteMessage(
      `Tem certeza que deseja deletar o marcador com as coordenadas (${getStringCoordinates(
        result
      )})?`
    );
    setShowDelete(true);
  };

  const handleDelete = async () => {
    try {
      console.log(markerToDelete);
      if (markerToDelete) await db.marks.remove(markerToDelete);
      const newLocationMarkersList = locationMarkers.filter(
        (c) => c._id !== markerToDelete?._id
      );
      setLocationMarkers(newLocationMarkersList);
      handleCloseDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const updateMapFileReader = () => {
    let reader = new FileReader();
    reader.onload = function (ev: any) {
      setmapUrl(ev.target.result);
    };
    return reader;
  };

  useEffect(() => {
    const getCampaign = async () => {
      if (!campaignId) return;
      try {
        const campaign = await db.campaigns.get<Campaign>(campaignId);
        setCampaign(campaign);
      } catch (error) {
        console.log(error);
      }
    };

    const getLocation = async () => {
      if (!locationId) return;
      try {
        const location = await db.locations.get<Location>(locationId);
        setLocation(location);

        const reader = updateMapFileReader();

        reader.readAsDataURL(location.map as Blob);
      } catch (error) {
        console.log(error);
      }
    };

    const getLocationMarkers = async () => {
      try {
        const result = await db.marks.find({ selector: { locationId } });
        setLocationMarkers(result.docs as LocationMarker[]);
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
    getCampaign();
    getLocationMarkers();
  }, [campaignId, locationId]);

  const AddLocationMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        setMarkerToAdd({ ...markerToAdd, coordinates: e.latlng });
        handleShowMarkerAdd();
      },
      locationfound: (location: any) => {
        console.log("location found:", location);
      },
    });
    return null;
  };

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
              <h4>{location?.name}</h4>
            </Col>
          </Row>
        </Container>
      </header>
      <Container>
        <MapContainer
          crs={CRS.Simple}
          zoom={-1}
          minZoom={-1}
          center={[500, 500]}
          className="map-view"
          scrollWheelZoom={false}
        >
          <ImageOverlay
            bounds={new LatLngBounds([0, 0], [1000, 1000])}
            url={mapUrl}
          />
          {locationMarkers.map((m, i) => {
            return (
              <Marker key={i} position={m.coordinates}>
                <Popup>
                  <p>{getStringCoordinates(m)}</p>
                  <p>{m.description}</p>
                </Popup>
              </Marker>
            );
          })}
          <AddLocationMarker />
        </MapContainer>
        <Row className="x">
          <Col>
            <h4>Marcadores</h4>
          </Col>
        </Row>
        {locationMarkers &&
          locationMarkers.map((m, i) => {
            return (
              <Row key={m._id + i}>
                <Col>
                  <Card>
                    <Card.Header>
                      <strong>{`(${getStringCoordinates(m)})`}</strong>
                    </Card.Header>
                    <ListGroup className="list-group-flush">
                      <Accordion>
                        <Accordion.Toggle
                          as={ListGroupItem}
                          className="sheet-open-button"
                          eventKey="0"
                        >
                          <strong>Descrição</strong>{" "}
                          <FontAwesomeIcon icon={faChevronDown} />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <ListGroupItem className="content">
                            {m.description}
                          </ListGroupItem>
                        </Accordion.Collapse>
                      </Accordion>
                    </ListGroup>
                    <Card.Body>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => handleShowDelete(m._id)}
                        >
                          <FontAwesomeIcon icon={faEraser} />
                        </Button>
                      </Col>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            );
          })}
      </Container>
      <BootstrapModal
        size={"sm"}
        show={showMarkerAdd}
        onHide={handleShowMarkerAdd}
      >
        <Form noValidate validated={validated} onSubmit={handleMarkerAdd}>
          <BootstrapModal.Header closeButton>
            <BootstrapModal.Title>Adicionar Marcador</BootstrapModal.Title>
          </BootstrapModal.Header>
          <BootstrapModal.Body>
            <p>Gostaria de adicionar um marcador nessa posição?</p>
            <Form.Group controlId="coordinates">
              <Form.Label>Título</Form.Label>
              <Form.Control
                name="title"
                type="text"
                hidden
                value={JSON.stringify(markerToAdd.coordinates)}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                name="description"
                as={"textarea"}
                value={markerToAdd.description}
                onChange={handleChange}
              />
            </Form.Group>
          </BootstrapModal.Body>
          <BootstrapModal.Footer>
            <Button variant="secondary" onClick={handleCloseMarkerAdd}>
              Enviar
            </Button>
            <Button variant="primary" type="submit">
              Deletar
            </Button>
          </BootstrapModal.Footer>
        </Form>
      </BootstrapModal>
      <Modal
        onCancel={handleCloseDelete}
        onConfirm={handleDelete}
        message={deleteMessage}
        isVisible={showDelete}
      />
    </Container>
  );
};

export default LocationView;
