import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PokeApiService } from '../poke-api.service'

//import { IonicStorageModule } from "@ionic/storage"

class Pokemon {
    id: number
    name: string
    url: string
    favorite: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor (
        private router: Router,
        private pokeApiService: PokeApiService
    ) {
        this.getPokemons()
    }

    pokemons: Pokemon[] = []

    getPokemons() {

        let self = this

      this.pokeApiService.getPokemons().subscribe((val) => {

          val.results.forEach(function(result, index) {
              result.id = index
              result.favorite = false
              self.pokemons.push(result)
          })

          console.log(this.pokemons)
      })
    }

    setPokemonAsFavorite(id) {
        this.pokemons[this.getIndexWithId(id)].favorite = !this.pokemons[this.getIndexWithId(id)].favorite
    }

    getIndexWithId(id) {
        return this.pokemons.findIndex(pokemon => pokemon.id === id)
    }

}
