import { DatePickerComponent } from './components/datepicker.component';
import { DatePickerDisplayer, DatePickerController } from './components/datepicker.modal';
import { DatePickerDirective } from './components/datepicker.directive';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DateService } from './components/datepicker.service';
import { nls } from './components/nls';
import { CommonModule } from '@angular/common';
import { ViewController } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';

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
