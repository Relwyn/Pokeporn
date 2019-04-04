import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.page.html',
  styleUrls: ['./list-profil.page.scss'],
})
export class ListProfilPage implements OnInit {

  public profils:any;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  fight_page(){
    this.router.navigate(['/fight'])
  }

  pokemon = firebase.database().ref('pokedb/pokemon')

  getProfil(){
    this.pokemon.set({
      name: "test",
      desc: "gné"
    })
  }


}
