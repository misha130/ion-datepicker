import { DatePickerComponent } from './components/datepicker.component';
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
    exports: [DatePickerComponent],
    entryComponents: [DatePickerComponent],
    declarations: [DatePickerComponent],
    providers: [DateService, nls],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DatePickerModule {
};
