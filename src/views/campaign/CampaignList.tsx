import { useEffect, useState } from "react";
import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import db from "../../config/database";
import Campaign from "../../models/Campaign";
import "./Campaign.scss";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const getCampaigns = async () => {
    const docs = await db.campaigns.allDocs<Campaign>({ include_docs: true });
    const rows = docs.rows;
    const campaigns = rows.map((row) => {
      return row.doc as Campaign;
    });

    setCampaigns(campaigns);
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <Container>
      <header>
        <Container>
          <Row>
            <Col>
              <h3>Campanhas</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/campaigns/new">
                <Button>+</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </header>
      <Container>
        <ListGroup>
          {campaigns &&
            campaigns.length > 0 &&
            campaigns
              .map((c, i) => {
                return (
                  <ListGroup.Item key={c._id + i}>
                    <Row>
                      <Col>
                        <Link to={`${c._id}`}>{c.name}</Link>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })
              .sort()}
        </ListGroup>
      </Container>
    </Container>
  );
};

export default CampaignList;
