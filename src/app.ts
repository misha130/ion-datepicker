import {
    NgModule
} from '@angular/core';
import {
    BrowserModule
} from '@angular/platform-browser';
import {
    DatePickerComponent
} from './component';
import {
    nls
} from './nls';
import {
    DateService
} from './date.service';
@NgModule({
    imports: [BrowserModule],
    declarations: [DatePickerComponent, nls, DateService],
    bootstrap: [DatePickerComponent]
})
export class AppModule { }