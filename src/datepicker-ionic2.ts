import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DatePickerController, DatePickerDisplayer } from './components/datepicker.modal';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './components/datepicker.component';
import { DatePickerDirective } from './components/datepicker.directive';
import { DateService } from './components/datepicker.service';
import { ViewController } from 'ionic-angular';
import { nls } from './components/nls';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule
    ],
    exports: [
        DatePickerComponent,
        DatePickerDirective],
    entryComponents: [DatePickerComponent],
    declarations: [DatePickerComponent, DatePickerDirective],
    providers: [
        DateService,
        nls,
        DatePickerController],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DatePickerModule {
};
