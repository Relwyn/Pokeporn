import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PokeApiService } from "../poke-api.service";

//import { IonicStorageModule } from "@ionic/storage";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

    constructor (
        private router: Router,
        private pokeApiService: PokeApiService
    )
    {
        this.getPokemons()
    }

    getPokemons() {

      this.pokeApiService.getPokemons().subscribe((val) => {
          let result: any = val
          console.log(result)
      })
    }

}
