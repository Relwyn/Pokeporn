import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PokeApiService } from '../poke-api.service'
import { AlertController } from '@ionic/angular'
import { Storage } from '@ionic/storage'

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
        private modal: AlertController,
        private localStorage: Storage
    ) {
        this.getPokemons()

        this.localStorage.set('favoritePokemons', [])

        this.localStorage.get('favoritePokemons').then((val) => {
            console.log(val)
        })
    }

    inputSearch: string
    pokemons: Pokemon[] = []
    favoritePokemonsSaved: Pokemon[] = []

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
        this.pokemons[this.getIndexWithId(id)].favorite = !this.pokemons[this.getIndexWithId(id)].favorite

        this.favoritePokemonsSaved.push(this.pokemons[this.getIndexWithId(id)])
        this.pushItemInLocalStorage('favoritePokemons', this.favoritePokemonsSaved)
    }

    pushItemInLocalStorage(name, item) {
        this.localStorage.set(name, item)
    }

    getIndexWithId(id) {
        return this.pokemons.findIndex(pokemon => pokemon.id === id);
    }

    searchByName(name = this.inputSearch) {

        this.pokeApiService.getPokemonByName(name).subscribe((val) => {
            this.openPokedex(val)
        })
    }

    async openPokedex(data) {

        const alert = await this.modal.create({
            header: data.name + '   n° ' + data.id,
            subHeader: this.typesIntoString(data),
            message: '<ion-list>' +
                '<ion-item>' +
                '<img src="' + data.sprites.front_default + '">' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>Weight: ' + data.weight + 'kg</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>hp: ' + data.stats[5].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>attack: ' + data.stats[4].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>defense: ' + data.stats[3].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>speed: ' + data.stats[0].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>special-attack: ' + data.stats[2].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>special-defense: ' + data.stats[1].base_stat + '</p>' +
                '</ion-item>' +
                '</ion-list>',
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
