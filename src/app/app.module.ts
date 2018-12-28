import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage, TabsPage, MapaPage, GuardadosPage } from '../pages/index.paginas'

//mapas
import { AgmCoreModule } from '@agm/core';

//Providers
import { HistorialProvider } from '../providers/historial/historial'

//Plugins
import { BarcodeScanner  } from '@ionic-native/barcode-scanner'
import { InAppBrowser } from '@ionic-native/in-app-browser'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MapaPage,
    GuardadosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBfVxSXd9TgtC_bmlx-0xqP2P9rg4DFHOc'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MapaPage,
    GuardadosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialProvider
  ]
})
export class AppModule {}
