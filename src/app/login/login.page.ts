import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

var cpt: 0

export class User{
  email : string;
  nom : string
  password: string;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

 user = new User();

  constructor() { }
  
  async update(){

    let test: any[] = [];
  
    await firebase.database().ref('pokedb/users').on('value', resp=>{
      test = resp.val()
    })
    test.push({'test':'test'})
    console.log(test);
  
    // let pokemon = firebase.database().ref('pokedb')
    //   pokemon.set({
    //     users: test
    //   });
    
  }

  
}
