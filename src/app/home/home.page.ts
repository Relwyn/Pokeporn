import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PokeApiService } from '../poke-api.service'
import { AlertController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import {calculateSizes} from "@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator";

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

    inputSearch: string
    pokemons: Pokemon[] = []
    team: Pokemon[] = []

    getPokemons() {

        const self = this

        this.localStorage.get('pokemons').then((favoritePokemons) => {

            self.pokemons = favoritePokemons
        })
    }

    savePokemon(pokemon) {

        this.pokemons.push(pokemon)

        this.saveItemInLocalStorage('pokemons', this.pokemons)
    }

    removePokemon(pokemon) {

        let index = this.getIndexWithId(this.pokemons, pokemon.id)

        this.pokemons.splice(index, 1)

        this.saveItemInLocalStorage('pokemons', this.pokemons)
    }

    addToTeam(pokemon) {

        if (this.team.length < 6)
            this.team.push(pokemon)
        //else


        this.saveItemInLocalStorage('team', this.team)
    }

    async searchByName(name = this.inputSearch, openPokedex = true) {

        this.pokeApiService.getPokemonByName(name).subscribe((pokemon) => {

            if(openPokedex)
                this.openPokedex(pokemon)

            return pokemon
        })
    }

    async openPokedex(pokemon) {

        const self = this

        const alert = await this.modal.create({
            header: pokemon.name + '   n° ' + pokemon.id,
            subHeader: this.typesIntoString(pokemon),
            message: '<ion-list>' +
                '<ion-item>' +
                '<img src="' + pokemon.sprites.front_default + '">' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>Weight: ' + pokemon.weight + 'kg</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>hp: ' + pokemon.stats[5].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>attack: ' + pokemon.stats[4].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>defense: ' + pokemon.stats[3].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>speed: ' + pokemon.stats[0].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>special-attack: ' + pokemon.stats[2].base_stat + '</p>' +
                '</ion-item>' +
                '<ion-item>' +
                '<p>special-defense: ' + pokemon.stats[1].base_stat + '</p>' +
                '</ion-item>' +
                '</ion-list>',
            buttons: [
                {
                    text: 'Close',
                    role: 'cancel',
                    cssClass: 'secondary'
                },
                {
                    text: 'Save',
                    cssClass: 'primary',
                    handler: () => {
                        self.savePokemon(pokemon)
                    }
                }
            ]
        });

        await alert.present();
    }

    saveItemInLocalStorage(name, item) {
        this.localStorage.set(name, item)
    }

    getIndexWithId(array, id) {

        let index = array.findIndex(item => item.id === id)

        if (index === -1)
            return false
        else
            return index
    }

    typesIntoString(pokemon) {

        let types: string = ""

        pokemon.types.forEach(function(element) {
            types += element.type.name + ', '
        })

        types.substring(0, types.length - 1)

        return types
    }
}
