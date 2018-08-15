import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LazyPage } from './lazy';
import { DatePickerModule } from '../../datepicker';

@NgModule({
  declarations: [
    LazyPage,
  ],
  imports: [
    DatePickerModule,
    IonicPageModule.forChild(LazyPage),
  ],
})
export class LazyPageModule { }
