import { HomePage, GuardadosPage } from '../index.paginas';
import { Component } from '@angular/core';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any
  tab2:any
  constructor() {
    this.tab1 = HomePage
    this.tab2 = GuardadosPage
  }


}
