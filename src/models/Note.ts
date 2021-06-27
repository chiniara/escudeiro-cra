import PouchDocument from "./PouchDocument";

export default class Note extends PouchDocument {
  title: string;
  content: string;
  campaignId: string;

  constructor(
    title?: string,
    content?: string,
    campaignId?: string,
    id?: string
  ) {
    super(id);
    this.title = title ?? "";
    this.content = content ?? "";
    this.campaignId = campaignId ?? "";
  }
}
