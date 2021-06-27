import PouchDB from "pouchdb";
import PouchFind from "pouchdb-find";

PouchDB.plugin(PouchFind);

const db = {
  campaigns: new PouchDB("_escudeiro_campaigns"),
  characters: new PouchDB("_escudeiro_characters"),
  locations: new PouchDB("_escudeiro_locations"),
  marks: new PouchDB("_escudeiro_marks"),
  gameSessions: new PouchDB("_escudeiro_game_sessions"),
  notes: new PouchDB("_escudeiro_notes"),
};

export default db;
