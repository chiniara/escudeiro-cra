import CampaignView from "./views/campaign/CampaignView";
import CampaignList from "./views/campaign/CampaignList";
import CampaignCreateEdit from "./views/campaign/CampaignCreateEdit";

const routes = [
  {
    path: "/campaigns/new",
    component: CampaignCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/edit",
    component: CampaignCreateEdit,
  },
  {
    path: "/campaigns/:campaignId",
    component: CampaignView,
  },
  {
    path: "/campaigns",
    component: CampaignList,
  },
];

export default routes;
