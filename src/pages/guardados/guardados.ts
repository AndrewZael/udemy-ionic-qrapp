import { Component } from '@angular/core';
import { HistorialProvider } from '../../providers/historial/historial'
import { ScanData } from '../../models/scan-data.model'

@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  public historial:ScanData[] = []
  constructor(private _historialProvider: HistorialProvider) {

  }

  ionViewDidLoad() {
    this.historial = this._historialProvider.cargarHistorial()
  }

  abrirScan(index:number){
    this._historialProvider.abrirScan(index)
  }

}
