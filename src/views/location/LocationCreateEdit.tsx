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
import Location from "../../models/Location";
import { MapContainer, ImageOverlay } from "react-leaflet";

import "./Location.scss";
import { CRS, LatLngBounds } from "leaflet";

const LocationCreateEdit: FunctionComponent = () => {
  const [validated, setValidated] = useState(false);
  const [location, setLocation] = useState<Location>(new Location());
  const [mapUrl, setmapUrl] = useState<string>("");

  const { campaignId, locationId } =
    useParams<{ campaignId: string; locationId: string }>();

  let history = useHistory();

  useEffect(() => {
    const getLocation = async () => {
      if (!locationId) return;

      const location = await db.locations.get<Location>(locationId);
      setLocation(location);

      const reader = updateMapFileReader();
      reader.readAsDataURL(location.map as Blob);
    };

    getLocation();
  }, [locationId]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLocation({ ...location, [event.target.name]: event.target.value });
  };

  const updateMapFileReader = () => {
    let reader = new FileReader();
    reader.onload = function (ev: any) {
      setmapUrl(ev.target.result);
    };
    return reader;
  };

  const setMapFileUrl: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = updateMapFileReader();
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMapFileUrl(event);

    setLocation({
      ...location,
      map: event.target.files && event.target.files[0],
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        if (!location.campaignId) {
          location.campaignId = campaignId;
        }
        setLocation(location);
        console.log(location);
        await db.locations.put(location);

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
          <h3>{locationId ? "Editar" : "Criar"} Nota</h3>
        </Container>
      </header>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              value={location.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor escolha um nome.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="map">
            <Form.Label>Mapa</Form.Label>
            <Form.File
              id="map"
              name="map"
              onChange={handleFileChange}
              label="Selecione um mapa"
            />
          </Form.Group>
          <MapContainer
            crs={CRS.Simple}
            zoom={-1}
            minZoom={-1}
            center={[500, 500]}
            className="map"
            scrollWheelZoom={false}
          >
            <ImageOverlay
              bounds={new LatLngBounds([0, 0], [1000, 1000])}
              url={mapUrl}
            />
          </MapContainer>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default LocationCreateEdit;
