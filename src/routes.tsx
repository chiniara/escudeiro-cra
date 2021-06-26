import CampaignView from "./views/campaign/CampaignView";
import CampaignList from "./views/campaign/CampaignList";
import CampaignCreateEdit from "./views/campaign/CampaignCreateEdit";
import CharacterList from "./views/character/CharacterList";
import CharacterCreateEdit from "./views/character/CharacterCreateEdit";

const routes = [
  {
    path: "/campaigns/new",
    component: CampaignCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/characters/new",
    component: CharacterCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/characters",
    component: CharacterList,
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
