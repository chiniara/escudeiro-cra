import { useParams } from "react-router-dom";

const CampaignItem = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  return <p>{campaignId}</p>;
};

export default CampaignItem;
