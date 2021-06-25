export default class Note {
  _id?: string;
  content: string;
  campaignId: string;

  constructor(content: string, campaignId: string, _id?: string) {
    this._id = _id;
    this.content = content;
    this.campaignId = campaignId;
  }
}
