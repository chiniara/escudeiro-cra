import Document from "./Document";

export default class Campaign extends Document {
  name: string;

  constructor(name?: string, id?: string) {
    super(id);
    this.name = name ?? "";
  }
}
