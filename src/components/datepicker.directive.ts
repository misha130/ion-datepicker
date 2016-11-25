import { Directive, Input, Output, EventEmitter } from "@angular/core";
import { DatePickerComponent } from './datepicker.component';
@Directive({
    selector: '[iondatepicker]',
    host: {
        '(click)': 'openModal()',
    }
})

export class DatePickerDirective {

    public static config: any;
    @Input('date') public date: Date;
    @Input('min') public min: Date;
    @Input('max') public max: Date;
    @Output('onchange') public callback: EventEmitter<string | Date> = new EventEmitter<string | Date>();
    @Input('hclasses') public hClasses: any[] = [];
    @Input('dclasses') public dClasses: any[] = [];
    @Input('full') public full: boolean = false;
    @Input('calendar') public calendar: boolean = false;
    constructor() {
    }
    openModal() {
        DatePickerDirective.config =
            {
                date: this.date,
                min: this.min,
                max: this.min,
                callback: this.callback,
                headerClasses: this.hClasses,
                dateClasses: this.dClasses,
                fullScreen: this.full,
                calendar: this.calendar
            }
        // let modal = this.modalCtrl.create(DatePickerComponent
        // );
        // DatePickerDirective.config.modal = modal;
        // modal.present();

    }
}