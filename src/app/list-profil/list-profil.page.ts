import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.page.html',
  styleUrls: ['./list-profil.page.scss'],
})
export class ListProfilPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  fight_page(){
    this.router.navigate(['/fight'])
  }



}
