import PouchDocument from "./PouchDocument";

export default class GameSession extends PouchDocument {
  date: Date;
  before: string;
  during: string;
  after: string;
  campaignId: string;

  constructor(
    date?: Date,
    before?: string,
    during?: string,
    after?: string,
    campaignId?: string,
    id?: string
  ) {
    super(id);
    this.date = date ?? new Date();
    this.before = before ?? "";
    this.during = during ?? "";
    this.after = after ?? "";
    this.campaignId = campaignId ?? "";
  }
}
