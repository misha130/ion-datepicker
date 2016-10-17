import { Directive, Input } from "@angular/core";
import { ModalController } from "ionic-angular";
import { DatePickerComponent } from './datepicker.component';
//was a directive changed to component
// TO DO: FIGURE OUT HOW TO MAKE THIS A DIRECTIVE
@Directive({
    selector: '[iondatepicker]',
    host: {
        '(click)': 'openModal()',
    }
})

export class DatePickerDirective {

    public static config:any;
    @Input('date') private date: Date;
    @Input('min') private min: Date;
    @Input('max') private max: Date;
    @Input('callback') private callback: (date: Date | undefined) => {};
    @Input('modal') private modalCtrl: ModalController;
    constructor() {
    }
    openModal() {
        DatePickerDirective.config =
            {
                date: this.date,
                min: this.min,
                max: this.min,
                callback: this.callback
            }
        this.modalCtrl.create(DatePickerComponent
        ).present();
    }
}