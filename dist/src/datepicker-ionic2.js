import { DatePickerDirective } from './components/datepicker.directive';
import { DatePickerComponent } from './components/datepicker.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DateService } from './components/datepicker.service';
import { nls } from './components/nls';
import { CommonModule } from '@angular/common';
export var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    DatePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
    /** @nocollapse */
    DatePickerModule.ctorParameters = [];
    return DatePickerModule;
}());
;
//# sourceMappingURL=datepicker-ionic2.js.map