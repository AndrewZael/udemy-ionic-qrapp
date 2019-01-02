import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ModalController, Platform, ToastController } from 'ionic-angular'
import { MapaPage } from '../../pages/mapa/mapa'

@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = []

  constructor(private iab: InAppBrowser,
              private modalCtrl: ModalController,
              private contacts: Contacts,
              private platform:Platform,
              private toast:ToastController) {}

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
      case 'mapa':
        this.modalCtrl.create(MapaPage, {'coords': scan.info}).present()
      break
      case 'vcard':
        this.crearContacto(scan.info)
      break
      case 'email':
        this.iab.create(this.mailTo(scan.info), '_system')
      break

      default:
        console.error('Tipo no soportado')
    }
  }
  

  private mailTo(info:string){
       let infoMailArray = info.split(';')
       let mail = infoMailArray[0].replace('MATMSG:TO:','')
       let subject = infoMailArray[1].replace('SUB:', '')
       let body = infoMailArray[2].replace('BODY:', '')
       return 'mailto: '+ mail + '?subject='+ subject + '&body='+ body
  }

  private crearContacto(texto:string){
      let campos:any = this.parse_vcard(texto)
      
      let nombre = campos['fn']
      let tel = campos.tel[0].value[0]

      if(!this.platform.is('cordova')){
        console.warn('Estoy en la computadora');  
        return
      }
      let contact:Contact = this.contacts.create()
      contact.name = new ContactName(null, nombre)
      contact.phoneNumbers = [ new ContactField('Mobile', tel) ]
      contact.save().then(
          ()=> this.crearToast('Contacto '+ nombre + ' Creado'),
          (error)=> this.crearToast('Error al crear contacto: '+ error)
      )
      
  }

  private crearToast(mensaje:string){
    this.toast.create({
        message: mensaje,
        duration: 2500
    }).present()
  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
};

  cargarHistorial(){
    return this._historial
  }

}
