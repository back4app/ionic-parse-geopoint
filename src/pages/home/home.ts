import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Geolocation, Geoposition} from "@ionic-native/geolocation";
import Parse from 'parse';
import {Marker} from "../maps/maps";
import {fromPromise} from "rxjs/observable/fromPromise";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  geoposition: Geoposition;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public geolocation: Geolocation,
  ) {
    this.getMyLocation();
  }

  getMyLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Current Position', resp.coords);
      this.geoposition = resp;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getClosestUser() {
    let geoPoint = new Parse.GeoPoint(this.geoposition.coords.latitude, this.geoposition.coords.longitude);
    let query = new Parse.Query(Parse.User);
    query.near('Location', geoPoint);
    query.limit(1);

    query.find().then(users => {
      let user = users[0];
      console.log('Closest user', user);

      let current:Marker = {
        lat: user.get('Location').latitude,
        lng: user.get('Location').longitude,
        label: user.get('name')
      };

      let me:Marker = {
        lat: this.geoposition.coords.latitude,
        lng: this.geoposition.coords.longitude,
        label: 'Me'
      };

      this.navCtrl.push('MapsPage', {data: {current, markers: [me, current]}});
    }, err => {
      console.log('Error getting closest user', err)
    })
  }

  getAllStores() {
    let query = new Parse.Query('Store');

    query.find().then(stores => {
      console.log('Stores', stores);

      let markers = stores.map(s => {
        return {
          lat: s.get('Location').latitude,
          lng: s.get('Location').longitude,
          label: s.get('name')
        };
      });

      this.navCtrl.push('MapsPage', {data: {current: markers[0], markers}});
    }, err => {
      console.log('Error getting closest user', err)
    })
  }

  getClosestStore() {
    let geoPoint = new Parse.GeoPoint(this.geoposition.coords.latitude, this.geoposition.coords.longitude);
    let query = new Parse.Query('Store');
    query.near('Location', geoPoint);
    query.limit(1);

    query.find().then(stores => {
      let store = stores[0];
      console.log('Closest user', store);

      let current:Marker = {
        lat: store.get('Location').latitude,
        lng: store.get('Location').longitude,
        label: store.get('name')
      };

      let me:Marker = {
        lat: this.geoposition.coords.latitude,
        lng: this.geoposition.coords.longitude,
        label: 'Me'
      };

      this.navCtrl.push('MapsPage', {data: {current, markers: [me, current]}});
    }, err => {
      console.log('Error getting closest user', err)
    })
  }

  findMyLocation() {
    let current:Marker = {
      lat: this.geoposition.coords.latitude,
      lng: this.geoposition.coords.longitude
    };

    this.navCtrl.push('MapsPage', {data: {current, markers: [current]}});
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.navCtrl.setRoot('LoginPage');
    }, err => {
      console.log('Error logging out', err);

      this.toastCtrl.create({
        message: 'Error logging out',
        duration: 2000
      }).present();
    })
  }
}
