import { Button, Container, ListGroup } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

const CampaignList = () => {
  let match = useRouteMatch();

  return (
    <Container>
      <header>
        <h2>Campanhas</h2>
        <Button>Criar Nova</Button>
      </header>
      <Container>
        <ListGroup>
          <ListGroup.Item>
            <Link to={`${match.url}/1`}>Campanha 1</Link>
          </ListGroup.Item>
          <ListGroup.Item>Campanha 2</ListGroup.Item>
          <ListGroup.Item>Campanha 3</ListGroup.Item>
        </ListGroup>
      </Container>
    </Container>
  );
};

export default CampaignList;
