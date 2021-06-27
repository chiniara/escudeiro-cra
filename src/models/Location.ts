import PouchDocument from "./PouchDocument";

export default class Location extends PouchDocument {
  name: string;
  map: unknown;
  campaignId: string;

  constructor(name?: string, map?: unknown, campaignId?: string, id?: string) {
    super(id);
    this.name = name ?? "";
    this.map = map;
    this.campaignId = campaignId ?? "";
  }
}
