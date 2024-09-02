import { Character } from './character';
import { Episode } from './episode';

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
