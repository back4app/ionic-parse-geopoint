import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  current: Marker;
  markers: Array<Marker> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    let data = this.navParams.get('data');
    this.current = data.current;
    this.markers = data.markers || [];

    console.log('Markers received', data);
  }
}

export interface Marker {
  lat?: number,
  lng?: number,
  label?: string
}
