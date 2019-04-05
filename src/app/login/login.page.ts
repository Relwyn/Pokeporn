import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  public email : string;
  public name : string
  public password: string;
  public test: any;
  //user = new User();

  constructor() { 
    this.getUsers()
  }
  
 async update(){
    await this.getUsers()
    let unProfilToken = {
      name: "PD",
      desc: "Bois Tier",
      pokemon: [3, 1, 2]
      }
    this.test.push({
      name : "Bastien",
      online: true,
      profils:[unProfilToken]
    })
  
    let pokemon = firebase.database().ref('pokedb')
      pokemon.set({
        users: this.test
      });
    }

  getUsers() {
    firebase.database().ref('pokedb/users').on('value', resp=>{
      this.test = resp.val()
      console.log(this.test)
    })
  }

  
}
