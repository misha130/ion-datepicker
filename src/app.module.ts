import {
    NgModule
} from '@angular/core';
import {
    BrowserModule
} from '@angular/platform-browser';
import {
    DatePickerComponent
} from './datepicker.component';
import {
    nls
} from './nls';
import {
    DateService
} from './datepicker.service';
import {
    DatePicker
} from './app.component';
@NgModule({
    imports: [BrowserModule],
    declarations: [DatePickerComponent, nls, DateService],
    bootstrap: [DatePicker]
})
export class AppModule { }