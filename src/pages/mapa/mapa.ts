import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  public lat:number
  public lng:number

  constructor(public navParams: NavParams) {
    this.lat = -33.397250
    this.lng = -70.651070
  }

}
