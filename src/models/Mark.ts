export default class Mark {
  _id?: string;
  description: string;
  locationId: string;

  constructor(description: string, locationId: string, _id?: string) {
    this._id = _id;
    this.description = description;
    this.locationId = locationId;
  }
}
