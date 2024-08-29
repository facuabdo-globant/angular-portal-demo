import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  apiURL = 'https://rickandmortyapi.com/api/';

  constructor(private httpClient: HttpClient) {}

  getCharacters(page?: number) {
    return this.httpClient.get(
      `${this.apiURL}/character${page ? `?page=${page}` : ''}`
    );
  }
}
