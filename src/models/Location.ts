export default class Location {
  _id?: string;
  name: string;
  description: string;
  map: unknown;
  campaignId: string;

  constructor(
    name: string,
    description: string,
    map: unknown,
    campaignId: string,
    _id?: string
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.map = map;
    this.campaignId = campaignId;
  }
}
