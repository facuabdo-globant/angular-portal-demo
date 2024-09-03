import { Character } from './character';
import { Episode } from './episode';
import { Location } from './location';

export interface PaginationData {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RickAndMortyResponse<T> {
  info: PaginationData;
  results: T[];
}

export interface CharacterResponse extends RickAndMortyResponse<Character> {}
export interface EpisodeResponse extends RickAndMortyResponse<Episode> {}
export interface LocationResponse extends RickAndMortyResponse<Location> {}
