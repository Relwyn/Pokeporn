import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import * as firebase from 'firebase';
@Component({
  selector: 'app-fight',
  templateUrl: './fight.page.html',
  styleUrls: ['./fight.page.scss'],
})
export class FightPage implements OnInit {

  constructor(
      private router: Router,
      private toast: ToastController,
      private localStorage: Storage,
  ) {
    this.getProfil()
  }

  ngOnInit() {
  }

  profil = firebase.database().ref('pokedb/profils')

  getProfil(){
    this.profil.set({
      name: "michel",
      desc: "moi les pokemon je les brules"
    })
  }

  setProfil(){
    this.profil.set({
      name: "michel",
      desc: "moi les pokemon je les brules"
    })
  }
}
