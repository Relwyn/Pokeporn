import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { stringify } from '@angular/core/src/util';
import {TransfertDataService} from '../transfert-data.service';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.page.html',
  styleUrls: ['./list-profil.page.scss'],
})
export class ListProfilPage implements OnInit {

  public users:any;
  public profil : any;
  public nameFighter: any;
  public Data : any;

  constructor(
    private router: Router,
    private transfertDataService: TransfertDataService) { 
    
  }

  ngOnInit() {
    this.getUsers()
  }

  login_page(){
    this.router.navigate(['/login'])
  }

  fight() {
    console.log("Fighting against : " + this.nameFighter + " !");
    this.sendData()
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

  sendData(){
    let unProfilToken = {
      name: "PD",
      desc: "Bois Tier",
      pokemon: [3, 1, 2]
      }
    let unProfilToken2 = {
      name: "unPD",
      desc: "Ciment Tier",
      pokemon: [4, 6, 5]
      }
    let tab = ['user1', unProfilToken, 'user2', unProfilToken2]
    this.transfertDataService.setData(tab);
    this.router.navigate(['/fight']);
  }

  

///////////////////////////////////////////////////////////////////////////////////////////////
//Update en base
async update(){

  let test: any[] = [];

  await firebase.database().ref('pokedb/users').on('value', resp=>{
    test = resp.val()
  })
  test.push({'test':'test'})
  console.log(test);

  let pokemon = firebase.database().ref('pokedb')
    pokemon.set({
      users: test
    });
  
}



//Ajout des données en base
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
        name : "Hugo",
        online: true,
        profils:[unProfilToken]
      },
      {
        name : "Helori",
        online: true,
        profils:[unProfilToken]
      },
      {
        name : "Nicolas",
        online: true,
        profils:[unProfilToken]
      }  
    ]
    })
  }
///////////////////////////////////////////////////////////////////////////////////////////////

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
