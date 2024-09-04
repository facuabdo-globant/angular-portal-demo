import { Character } from '../api/interfaces/character';

export type FlagMap = { [key: string]: boolean };
export type ResourceCharacterMap = { [key: string]: Character[] };
export type PromiseMap = { [key: string]: Promise<any> };
