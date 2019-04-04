import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemons() {
    return this.http.get(this.apiUrl + '?offset=0&limit=100');
  }

  getPokemonByName(name) {
    return this.http.get(this.apiUrl + name)
  }
}
