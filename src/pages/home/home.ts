import { Component } from '@angular/core';
import { BarcodeScanner  } from '@ionic-native/barcode-scanner'
import { ToastController, Platform } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform
    ) {

  }

  scan(){
    if(this.platform.is('cordova')){
      return
    }
    console.log('Realizando scanner')

    this.barcodeScanner.scan().then(result => {
      console.log(
      "Result: " + result.text + "\n" + 
      "Format: " + result.format + "\n" +
      "Cancelled: " + result.cancelled)
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
