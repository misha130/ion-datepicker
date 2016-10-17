import { Directive, Input } from "@angular/core";
import { ModalController } from "ionic-angular";
import { DatePickerModal } from './datepicker.modal';
@Directive({
    selector: 'ionDatePicker',
    host: {
        '(click)': 'openModal()',

    }
})

export class DatePickerComponent {
    @Input('date') private date: Date;
    @Input('min') private min: Date;
    @Input('max') private max: Date;
    @Input('callback') private callback: (date: Date | undefined) => {};
    constructor(private modalCtrl: ModalController) {
    }
    openModal() {
        this.modalCtrl.create(DatePickerComponent,
            {
                date: this.date,
                min: this.min,
                max: this.min,
                callback: this.callback
            });
    }
}