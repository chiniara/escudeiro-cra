export default class Character {
  _id?: string;
  name: string;
  sex: string;
  age: string;
  sheet: string;
  description: string;
  campaignId: string;

  constructor(
    name: string,
    sex: string,
    age: string,
    sheet: string,
    description: string,
    campaignId: string,
    _id?: string
  ) {
    this._id = _id;
    this.name = name;
    this.sex = sex;
    this.age = age;
    this.sheet = sheet;
    this.description = description;
    this.campaignId = campaignId;
  }
}
