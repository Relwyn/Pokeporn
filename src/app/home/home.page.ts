import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PokeApiService } from '../poke-api.service'
import { AlertController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { ToastController } from '@ionic/angular'

class Pokemon {
    id: number
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
        private pokeApiService: PokeApiService,
        private alert: AlertController,
        private localStorage: Storage,
        private toast: ToastController
    ) {
        this.getPokemons()
        this.getTeam()
    }

    inputSearch: string
    pokemons: Pokemon[] = []
    team: Pokemon[] = []

    getPokemons() {

        const self = this

        this.localStorage.get('pokemons').then((favoritePokemons) => {

            if (favoritePokemons)
                self.pokemons = favoritePokemons
            else
                self.pokemons = []
        })
    }

    getTeam() {

        const self = this

        this.localStorage.get('team').then((teamPokemons) => {

            if (teamPokemons)
                self.team = teamPokemons
            else
                self.team = []
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

        if (this.team.length < 6) {
            this.team.push(pokemon)
            this.showToast('Successfully added to team')
        } else
            this.showToast('Your team is full')

        this.saveItemInLocalStorage('team', this.team)
    }

    async searchByName(name = this.inputSearch, openPokedex = true) {

        this.pokeApiService.getPokemonByName(name).subscribe((pokemon) => {

            if(openPokedex)
                this.openPokedex(pokemon)

            return pokemon
        }, error => {
            console.log(error)
            this.showToast(JSON.stringify(error))
        })
    }

    async openPokedex(pokemon) {

        const alert = await this.alert.create({
            header: pokemon.name + '   n° ' + pokemon.id,
            subHeader: this.typesIntoString(pokemon),
            message:
                '<ion-list>' +
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
                        this.savePokemon(pokemon)
                    }
                }
            ]
        })

        await alert.present()
    }

    async openTeamScreen(pokemon = false) {

        let message: string =
            '<ion-grid>' +
                '<ion-row>'

        this.team.forEach(function(pokemon, index) {

            message+=
                '<ion-col>' +
                    '<ion-row>' +
                        '<span>' + pokemon.name + '</span>' +
                    '</ion-row>' +
                '<ion-row>' +
                    '<img src="' + pokemon.sprites.front_default + '">' +
                '</ion-row>' +
                    '<ion-row>' +
                        '<ion-button id="teamRemoveButton">Remove</ion-button>' +
                    '</ion-row>' +
                '</ion-col>'

        })

        message+=
                '</ion-row>' +
            '</ion-grid>'

        console.log(message)

        const alert = await this.alert.create({
            header: 'Team',
            message: message,
            buttons: [
                {
                    text: 'Close',
                    role: 'cancel',
                    cssClass: 'secondary'
                }
            ]
        })

        await alert.present();
    }

    async showToast(message) {
        const toast = await this.toast.create({
            message: `${message}`,
            duration: 10000,
            showCloseButton: true,
            position: 'top',
            closeButtonText: 'Done'
        })

        toast.present()
    }

    list_profil_page(){
        this.router.navigate(['/list-profil'])
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
