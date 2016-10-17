import { DatePickerDirective } from './src/components/datepicker.directive';
import { DatePickerComponent } from './src/components/datepicker.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DateService } from './src/components/datepicker.service';
import { nls } from './src/components/nls';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(DatePickerModule)
    ],
    exports: [DatePickerComponent, DatePickerDirective],
    entryComponents: [DatePickerComponent],
    declarations: [DatePickerComponent, DatePickerDirective],
    providers: [DateService, nls]
})
export class DatePickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: this
        };
    }
};