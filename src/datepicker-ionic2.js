import { DatePickerDirective } from './components/datepicker.directive';
import { DatePickerComponent } from './components/datepicker.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DateService } from './components/datepicker.service';
import { nls } from './components/nls';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
export var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    DatePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        BrowserModule
                    ],
                    exports: [DatePickerComponent, DatePickerDirective],
                    entryComponents: [DatePickerComponent],
                    declarations: [DatePickerComponent, DatePickerDirective],
                    providers: [DateService, nls],
                    schemas: [
                        CUSTOM_ELEMENTS_SCHEMA
                    ]
                },] },
    ];
    DatePickerModule.ctorParameters = [];
    return DatePickerModule;
}());
;
//# sourceMappingURL=datepicker-ionic2.js.map