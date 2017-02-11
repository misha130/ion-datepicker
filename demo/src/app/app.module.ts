import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { DatePickerModule } from '../../../dist';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    DatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
