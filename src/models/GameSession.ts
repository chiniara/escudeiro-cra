export default class GameSession {
  _id?: string;
  date: Date;
  before: string;
  during: string;
  after: string;
  campaignId: string;

  constructor(
    date: Date,
    before: string,
    during: string,
    after: string,
    campaignId: string,
    _id?: string
  ) {
    this._id = _id;
    this.date = date;
    this.before = before;
    this.during = during;
    this.after = after;
    this.campaignId = campaignId;
  }
}
