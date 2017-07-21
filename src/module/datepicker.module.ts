import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '../components/datepicker.component';
import { DatePickerController } from '../components/datepicker.modal';
import { DatePickerDirective } from '../components/datepicker.directive';
import { DateService } from '../services/datepicker.service';

@NgModule({
    imports: [
        CommonModule,
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
};
