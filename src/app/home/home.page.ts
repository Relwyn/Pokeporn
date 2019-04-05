import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PokeApiService } from '../poke-api.service'
import { AlertController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { ToastController } from '@ionic/angular'
import { HttpClient } from '@angular/common/http'

class Pokemon {
    id: number
    name: string
    sprites: any
    abilities: []
    types: any
}

class Types {
    name: string
    imageUrl: string
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
        private toast: ToastController,
        private http: HttpClient
    ) {
        this.getPokemons()
        this.getTeam()
    }

    inputSearch: string
    types: Types[] = [
        {
            name: 'normal',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/6/61/Type_Normal.gif'
        },
        {
            name: 'fire',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/4/4d/Type_Fire.gif'
        },
        {
            name: 'water',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/e/ed/Type_Water.gif'
        },
        {
            name: 'grass',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/4/46/Type_Grass.gif'
        },
        {
            name: 'dragon',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/2/26/Type_Dragon.gif'
        },
        {
            name: 'electric',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/a/aa/Type_Electric.gif'
        },
        {
            name: 'ice',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/8/84/Type_Ice.gif'
        },
        {
            name: 'fighting',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/6/6b/Type_Fighting.gif'
        },
        {
            name: 'poison',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/8/82/Type_Poison.gif'
        },
        {
            name: 'ground',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/1/1d/Type_Ground.gif'
        },
        {
            name: 'flying',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/4/4b/Type_Flying.gif'
        },
        {
            name: 'psychic',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/6/65/Type_Psychic.gif'
        },
        {
            name: 'bug',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/6/64/Type_Bug.gif'
        },
        {
            name: 'rock',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/b/b3/Type_Rock.gif'
        },
        {
            name: 'ghost',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/f/f2/Type_Ghost.gif'
        },
        {
            name: 'dark',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/0/0d/Type_Dark.gif'
        },
        {
            name: 'steel',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/a/ab/Type_Steel.gif'
        },
        {
            name: 'fairy',
            imageUrl: 'https://vignette.wikia.nocookie.net/pokemon/images/7/74/Type_Fairy.gif'
        }
    ]
    pokemons: Pokemon[] = []
    team: Pokemon[] = []
    teamScreen

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

    async savePokemon(pokemon) {

        const self = this

        if (this.isAlreadyInArray(this.pokemons, pokemon.id))
            this.showToast('Pokemon already in the list')
        else {

            new Promise(async(resolve, reject) => {

                for (let ability of pokemon.abilities) {

                    let index = 0
                    let id = ability.ability.url.split("/")[6]
                    let tempResult
                    let result = await self.getAbilityById(id)

                    tempResult = result

                    console.log("index:")
                    console.log(index)
                    console.log("pokemon :")
                    console.log(pokemon)
                    console.log("result :")
                    console.log(tempResult)
                    pokemon.abilities[index].ability.text = tempResult.effect_entries[0].effect

                    ++index
                }

                console.log("pokemon to push :")
                console.log(pokemon)

                this.pokemons.push(pokemon)
            })
        }

        this.saveItemInLocalStorage('pokemons', this.pokemons)
    }

    getAbilityById(id) {
        let result = this.http.get(this.pokeApiService.apiUrl + 'ability/' + id)
            console.log(result)
        return result
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

    removeFromTeam(index) {

        this.team.splice(index, 1)

        this.saveItemInLocalStorage('team', this.team)

        this.openTeamScreen()
        this.teamScreen.dismiss()
    }

    async searchByName(name = this.inputSearch, openPokedex = true) {

        this.pokeApiService.getPokemonByName(name).subscribe((pokemon) => {

            if(openPokedex)
                this.openPokedex(pokemon)

            return pokemon
        }, error => {
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

        return alert
    }

    async openTeamScreen() {

        let message: string =
            '<ion-grid>' +
                '<ion-row>'

        this.team.forEach(function(pokemon, index) {

            message+=
                '<ion-col>' +
                    '<ion-row>' +
                        '<span>' + (index + 1) + ' ' + pokemon.name + '</span>' +
                    '</ion-row>' +
                '<ion-row>' +
                    '<img src="' + pokemon.sprites.front_default + '">' +
                '</ion-row>' +
                    '<ion-row>' +
                        '<ion-button class="teamRemoveButton" id="'+ index + '">Remove</ion-button>' +
                    '</ion-row>' +
                '</ion-col>'

        })

        message+=
                '</ion-row>' +
            '</ion-grid>'

        this.teamScreen = await this.alert.create({
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

        this.launchListenerOnTeamRemoveButton()

        await this.teamScreen.present()
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

    launchListenerOnTeamRemoveButton() {

        const self = this

        let teamRemoveButtons = document.getElementsByClassName('teamRemoveButton')


        for (let teamRemoveButton of teamRemoveButtons as any) {
            teamRemoveButton.addEventListener('click', function() {
                self.removeFromTeam(teamRemoveButton.id)
            })
        }

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

    isAlreadyInArray(array, id) {

        let isAlreadyInArray: boolean = false

        array.forEach(function(item) {

            if (item.id == id)
                isAlreadyInArray = true
        })

        return isAlreadyInArray
    }
}
