import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PokeApiService } from '../poke-api.service'

//import { IonicStorageModule } from "@ionic/storage"

class Pokemon {
    name: string
    url: string
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

          val.results.forEach(function(result) {
              self.pokemons.push(result)
          })

          console.log(this.pokemons)
      })
    }

}
