import { CharacterResponse } from './interfaces/reponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  apiURL = 'https://rickandmortyapi.com/api/';

  constructor(private httpClient: HttpClient) {}

  getCharacters(page?: number): Observable<CharacterResponse> {
    return this.httpClient.get<CharacterResponse>(
      `${this.apiURL}/character${page ? `?page=${page}` : ''}`
    );
  }

  getUrl$(url: string) {
    return this.httpClient.get(url);
  }
}
