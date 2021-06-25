import slugify from "slugify";

export default class Document {
  _id: string;
  _rev!: string;

  constructor(id?: string) {
    this._id =
      id ??
      slugify(new Date().toISOString(), { strict: true, replacement: "_" });
  }
}
