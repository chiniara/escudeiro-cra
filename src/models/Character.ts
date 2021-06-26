import PouchDocument from "./PouchDocument";

export default class Character extends PouchDocument {
  name: string;
  sex: string;
  age: number;
  sheet: string;
  description: string;
  campaignId?: string;

  constructor(
    name?: string,
    sex?: string,
    age?: number,
    sheet?: string,
    description?: string,
    id?: string
  ) {
    super(id);
    this.name = name ?? "";
    this.sex = sex ?? "";
    this.age = age ?? 0;
    this.sheet = sheet ?? "";
    this.description = description ?? "";
  }
}
