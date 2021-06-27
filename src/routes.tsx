import CampaignView from "./views/campaign/CampaignView";
import CampaignList from "./views/campaign/CampaignList";
import CampaignCreateEdit from "./views/campaign/CampaignCreateEdit";
import CharacterList from "./views/character/CharacterList";
import CharacterCreateEdit from "./views/character/CharacterCreateEdit";
import GameSessionList from "./views/game-session/GameSessionList";
import GameSessionCreateEdit from "./views/game-session/GameSessionCreateEdit";
import NoteList from "./views/note/NoteList";
import NoteCreateEdit from "./views/note/NoteCreateEdit";
import LocationList from "./views/location/LocationList";
import LocationCreateEdit from "./views/location/LocationCreateEdit";
import LocationView from "./views/location/LocationView";

const routes = [
  {
    path: "/campaigns/new",
    component: CampaignCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/locations/:locationId/view",
    component: LocationView,
  },
  {
    path: "/campaigns/:campaignId/sessions/:gameSessionId/edit",
    component: GameSessionCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/sessions/:gameSessionId/edit",
    component: GameSessionCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/characters/:characterId/edit",
    component: CharacterCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/locations/new",
    component: LocationCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/notes/new",
    component: NoteCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/sessions/new",
    component: GameSessionCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/characters/new",
    component: CharacterCreateEdit,
  },
  {
    path: "/campaigns/:campaignId/notes",
    component: NoteList,
  },
  {
    path: "/campaigns/:campaignId/locations",
    component: LocationList,
  },
  {
    path: "/campaigns/:campaignId/sessions",
    component: GameSessionList,
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
