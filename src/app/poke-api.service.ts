import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  public apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemons() {
    return this.http.get(this.apiUrl + 'pokemon/?offset=0&limit=100');
  }

  getPokemonByName(name) {
    return this.http.get(this.apiUrl + 'pokemon/' + name)
  }

  getAbilityBy(id) {
    return this.http.get(this.apiUrl + 'ability/' + id)
  }
}
