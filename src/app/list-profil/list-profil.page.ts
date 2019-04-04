import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { stringify } from '@angular/core/src/util';
import {TransfertDataService} from '../transfert-data.service';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.page.html',
  styleUrls: ['./list-profil.page.scss'],
})
export class ListProfilPage implements OnInit {

  public users:any;
  profil : any;
  public nameFighter: any;

  constructor(
    private router: Router,
    private transfertDataService: TransfertDataService) { 
    
  }

  ngOnInit() {
    this.getUsers()
  }

  fight_page(){
    //this.router.navigate(['/fight'])
  }
  login_page(){
    this.router.navigate(['/login'])
  }

  fight() {
    console.log(this.nameFighter);
  }

  getUsers(){
    var getUsers = firebase.database().ref('pokedb/users').on('value', resp=>{
      
      this.users = resp.val()
      console.log(this.users)

    })
  }

  selectProfil(profil){
    this.profil = profil
  }

  setProfil(){
    let pokemon = firebase.database().ref('pokedb')
    let unProfilToken = {
    name: "PD",
    desc: "Bois Tier",
    pokemon: [3, 1, 2]
    }
    pokemon.set({
      users:[
        {
        name : "Bastien",
        online: true,
        profils:[unProfilToken]
      },
      {
        name : "Gitan",
        online: true,
        profils:[unProfilToken]
      },
      {
        name : "Toto",
        online: true,
        profils:[unProfilToken]
      },
      {
        name : "Titi",
        online: true,
        profils:[unProfilToken]
      }  
    ]
    })
  }

  validPlayer(id){
    console.log(id)
  }


}


export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
