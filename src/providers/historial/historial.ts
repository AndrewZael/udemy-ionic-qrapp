import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model'
import { InAppBrowser } from '@ionic-native/in-app-browser'

@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = []

  constructor(private iab: InAppBrowser) {}

  agregarHistorial(texto:string){
     let data = new ScanData(texto)
     this._historial.unshift(data)

     this.abrirScan(0)
  }

  abrirScan(index:number){
    let scan = this._historial[index]
    console.log(scan)

    switch(scan.tipo){
      case 'http':
        this.iab.create(scan.info, '_system')
      break

      default:
        console.error('Tipo no soportado')
    }
  }

  cargarHistorial(){
    return this._historial
  }

}
