import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private allPokemonsUrl: string = "http://pokeapi.co/api/v2"

  constructor(private http: HttpClient) { }

  getPokemons() {
    return this.http.get(this.allPokemonsUrl)
  }
}
