import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  apiURL = 'https://rickandmortyapi.com/api/';
  characterSegment = 'character';
  locationSegment = 'location';

  constructor(private httpClient: HttpClient) {}

  getCharacters() {
    return this.httpClient.get(`${this.apiURL}/${this.characterSegment}`);
  }
}
