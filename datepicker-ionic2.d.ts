import { NgModule, ModuleWithProviders } from '@angular/core';
import { DatePickerComponent } from './src/components/datepicker.component';
import { DatePickerModal } from './src/components/datepicker.modal';


@NgModule({
    exports: [DatePickerComponent, DatePickerModal],
    entryComponents: [DatePickerComponent, DatePickerModal],
    declarations: [DatePickerComponent, DatePickerModal]
})
export class DatePicker {
    static forRoot(): ModuleWithProviders { return { ngModule: this }; }
};