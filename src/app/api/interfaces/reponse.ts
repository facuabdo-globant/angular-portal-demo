import { Character } from './character';

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RickAndMortyResponse<T> {
  info: Info;
  results: T[];
}

export interface CharacterResponse extends RickAndMortyResponse<Character> {}
