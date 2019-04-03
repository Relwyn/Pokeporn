import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PokeApiService } from "../poke-api.service";
import {TransferDataService} from "../../../../travel/src/app/transfer-data.service";

//import { IonicStorageModule } from "@ionic/storage";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

    constructor (
        private router: Router,
        private TransferDataService: TransferDataService
    ) {}

    

}
