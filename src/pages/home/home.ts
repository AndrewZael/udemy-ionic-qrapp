import { Component } from '@angular/core';
import { BarcodeScanner  } from '@ionic-native/barcode-scanner'
import { ToastController, Platform } from 'ionic-angular'
import { HistorialProvider } from '../../providers/historial/historial'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform,
    private _historialProvider: HistorialProvider
    ) {

  }

  scan(){
    if(!this.platform.is('cordova')){
      //this._historialProvider.agregarHistorial('http://www.google.com')
      //this._historialProvider.agregarHistorial('geo:-33.397250,-70.651070')
      /*this._historialProvider.agregarHistorial( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );*/
      return
    }
    console.log('Realizando scanner')

    this.barcodeScanner.scan().then(result => {
      console.log(
      "Result: " + result.text + "\n" + 
      "Format: " + result.format + "\n" +
      "Cancelled: " + result.cancelled)

      if(result.cancelled == false && result.text != null){
        this._historialProvider.agregarHistorial(result.text)
      }

     }).catch(err => {
         this.messageError('Esta funcionalidad no esta disponible en un navegador.')
     });
  }

  messageError(mensaje:string){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    })
    toast.present()
  }

}
