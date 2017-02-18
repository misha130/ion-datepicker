import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DatePickerController } from './datepicker.modal';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './datepicker.component';
import { DatePickerDirective } from './datepicker.directive';

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
        DatePickerController],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DatePickerModule {
};
