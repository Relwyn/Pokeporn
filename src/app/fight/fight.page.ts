import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {TransfertDataService} from '../transfert-data.service'
import * as firebase from 'firebase';
@Component({
  selector: 'app-fight',
  templateUrl: './fight.page.html',
  styleUrls: ['./fight.page.scss'],
})
export class FightPage implements OnInit {
  USER = {
    name: 'Bastien'
  };
  data: any;
  turn: any;
  constructor(
      private router: Router,
      private toast: ToastController,
      private localStorage: Storage,
      private transfertDataService: TransfertDataService
  ) {
    //this.data = this.transfertDataService.getData();
    //this.fight()
  }

  ngOnInit() {
  }

  getTurn = firebase.database().ref('fightrooms/1')
/*


  getUser(name){
    return firebase.database().ref(`pokedb/users/${name}`).on('value', resp=>{
      console.log("getUser "+ JSON.stringify(resp.val()))
      return resp.val()
    })
  }

  getProfil(){
    return firebase.database().ref('pokedb/users/Nico/profils/unProfilToken').on('value', resp=>{
      return resp.val()
    })
  }
  getProfil2(){
    return firebase.database().ref('pokedb/users/Hugo/profils/unProfilToken').on('value', resp=>{
      return resp.val()
    })
  }
*/
  /*setProfil(name, desc, pokemon){
    this.profil.push();
    this.profil.set({
      name: "michel",
      desc: "moi les pokemon je les brules",
      pokemon: [1,2,3,4,5,6]
    })
    this.profil.push()
  }*/

  async showToast(message) {
    const toast = await this.toast.create({
      message: `${message}`,
      duration: 10000,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done'
    });

    toast.present()
  }

  async fight(){
    await this.getTurn.on('value', res => {
      this.turn = res.val().turn;
    })
    console.log(this.turn);
    console.log(this.data);
    //TODO: Check the name in the input
    /*if(!this.data[0].online || !this.data[1].online){
      this.showToast("Il y a un problème de connexion")
          .catch(error => {
            console.log("Impossible d'afficher le toast PB de connexion")
            console.log(JSON.stringify(error))
          })
    }
    let turn = Math.round(Math.random())
    console.log(turn)*/
    //check who start

  }

  myturn(){
    return true;
  }

  attack(){
    this.getTurn.on('value', res => {
      this.turn = res;
      console.log(this.turn)
    })
    console.log(this.data);

  }

  endGame(){
    //set turn to -1
  }



  checkTurn(){
    if(this.turn === -1){
      let turn = Math.round(Math.random())
      console.log("Reseult of random : " + turn)
    }
    else if (this) {
      console.log("test")
    }
    else{

    }
  }
}
