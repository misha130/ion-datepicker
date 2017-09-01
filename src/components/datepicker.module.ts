import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {DatePickerComponent} from './datepicker.component';
import {DatePickerController} from './datepicker.modal';
import {DatePickerDirective} from './datepicker.directive';
import {DateService} from './datepicker.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule
    ],
    exports: [
        DatePickerComponent,
        DatePickerDirective],
    entryComponents: [DatePickerComponent],
    declarations: [DatePickerComponent, DatePickerDirective],
    providers: [
        DatePickerController,
        DateService],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DatePickerModule {
}
