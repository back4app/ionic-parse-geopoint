import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import Parse from 'parse';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
  ) {
    Parse.initialize("YOUR-APP-ID", "YOUR-JS-KEY");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

}
