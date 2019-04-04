import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCejaK8XdI-d2Dyfdgiduygmn7npY4MLsk',
  authDomain: 'pokeporn-2650c.firebaseapp.com',
  databaseURL: 'https://pokeporn-2650c.firebaseio.com',
  projectId: 'pokeporn-2650c',
  storageBucket: 'pokeporn-2650c.appspot.com',
  messagingSenderId: '570977573792'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    firebase.initializeApp(config);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
