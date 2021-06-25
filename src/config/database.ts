import PouchDB from "pouchdb";

const db = {
  campaigns: new PouchDB("_escudeiro_campaigns"),
  characters: new PouchDB("_escudeiro_characters"),
  locations: new PouchDB("_escudeiro_locations"),
  marks: new PouchDB("_escudeiro_marks"),
  sessions: new PouchDB("_escudeiro_sessions"),
  notes: new PouchDB("_escudeiro_notes"),
};

export default db;
