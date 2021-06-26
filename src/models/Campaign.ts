import PouchDocument from "./PouchDocument";

export default class Campaign extends PouchDocument {
  name?: string;

  constructor(name?: string, id?: string) {
    super(id);
    this.name = name;
  }
}
