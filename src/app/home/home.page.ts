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
    }

    list_profil_page(){
        this.router.navigate(['/list-profil'])
    }

    inputSearch: string
    pokemons: Pokemon[] = []
    favoritePokemonsSaved: Pokemon[] = []

    getPokemons() {

        const self = this

      this.pokeApiService.getPokemons().subscribe((val) => {

          const res: any = val

          res.results.forEach(function(element, index) {
              element.id = index

              self.localStorage.get('favoritePokemons').then((favoritePokemons) => {

                  self.favoritePokemonsSaved = favoritePokemons

                  self.favoritePokemonsSaved.forEach(function(favoritePokemon) {

                      if(favoritePokemon.name === element.name)
                          element.favorite = true

                  })
              })

              self.pokemons.push(element)
          })
      })
    }

    setPokemonAsFavorite(id) {

        let index = this.getIndexWithId(this.pokemons, id)

        this.pokemons[index].favorite = !this.pokemons[index].favorite

        if (this.pokemons[index].favorite)
            this.favoritePokemonsSaved.push(this.pokemons[index])
        else
            this.favoritePokemonsSaved.splice(this.getIndexWithId(this.favoritePokemonsSaved, id), 1)

        console.log(this.favoritePokemonsSaved)

        this.pushItemInLocalStorage('favoritePokemons', this.favoritePokemonsSaved)
    }

    pushItemInLocalStorage(name, item) {
        this.localStorage.set(name, item)
    }

    getIndexWithId(array, id) {
        return array.findIndex(item => item.id === id)
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
