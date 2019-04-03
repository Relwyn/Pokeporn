import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PokeApiService } from '../poke-api.service'
import { AlertController } from '@ionic/angular';

class Pokemon {
    id: number;
    name: string;
    url: string;
    favorite: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor (
        private router: Router,
        private pokeApiService: PokeApiService,
        private modal: AlertController
    ) {
        this.getPokemons();
    }

    inputSearch: string;
    pokemons: Pokemon[] = [];

    getPokemons() {

        const self = this;

      this.pokeApiService.getPokemons().subscribe((val) => {
          const res: any = val;
          res.results.forEach(function(result, index) {
              result.id = index;
              result.favorite = false;
              self.pokemons.push(result);
          });

          res.results.forEach(function(element, index) {
              element.id = index
              element.favorite = false
              self.pokemons.push(element)
          })
      })
    }

    setPokemonAsFavorite(id) {
        this.pokemons[this.getIndexWithId(id)].favorite = !this.pokemons[this.getIndexWithId(id)].favorite;
    }

    getIndexWithId(id) {
        return this.pokemons.findIndex(pokemon => pokemon.id === id);
    }

    searchByName() {

        this.pokeApiService.getPokemonByName(this.inputSearch).subscribe((val) => {
            console.log(val)

            this.openPokedex(val)
        })
    }

    async openPokedex(data) {

        const alert = await this.modal.create({
            header: data.name + '   n° ' + data.id,
            subHeader: this.typesIntoString(data),
            message: '<div>' +
            '<img src="' + data.sprites.front_default + '">' +
            '</div>',
            buttons: ['OK']
        });

        await alert.present();
    }

    typesIntoString(data) {

        let types: string = ""

        data.types.forEach(function(element) {
            types += element.type.name + ', '
        })

        types.substring(0, types.length - 1)

        return types
    }

}
