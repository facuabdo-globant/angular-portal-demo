export interface OriginRef {
  name: string;
  url: string;
}

export interface LocationRef {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginRef;
  location: LocationRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
