import PouchDocument from "./PouchDocument";

export default class LocationMarker extends PouchDocument {
  description: string;
  coordinates: Coordinates;
  locationId: string;

  constructor(
    description?: string,
    coordinates?: Coordinates,
    locationId?: string,
    id?: string
  ) {
    super(id);
    this.description = description ?? "";
    this.locationId = locationId ?? "";
    this.coordinates = coordinates ?? { lat: 0, lng: 0 };
  }
}

export interface Coordinates {
  lat: number;
  lng: number;
}
