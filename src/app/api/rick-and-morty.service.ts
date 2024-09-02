import { CharacterResponse, EpisodeResponse } from './interfaces/reponse';

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
    return this.getUrl$<CharacterResponse>(
      `${this.apiURL}/character${page ? '?page=' + page : ''}`
    );
  }

  getEpisodes(page?: number): Observable<EpisodeResponse> {
    return this.getUrl$<EpisodeResponse>(
      `${this.apiURL}/episode${page ? '?page=' + page : ''}`
    );
  }

  getUrl$<T>(url: string) {
    return this.httpClient.get<T>(url);
  }
}
