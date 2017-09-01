import {ModalOptions} from 'ionic-angular';
import {DatePickerController, DatePickerDisplayer} from './datepicker.modal';
import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

import {DatePickerData} from './datepicker.interface';
import {DateService} from './datepicker.service';

@Directive({
    selector: 'ion-datepicker,[ion-datepicker]',
})
export class DatePickerDirective {
    @Output('ionChanged') public changed: EventEmitter<string | Date> = new EventEmitter<string | Date>();
    @Output('ionCanceled') public canceled: EventEmitter<void> = new EventEmitter<void>();

    @Input() public max: Date;
    @Input() public min: Date;

    @Input()
    public set locale(val: string) {
        if (val)
            this.dateService.locale = val;
    };

    @Input()
    public set localeStrings(val: { weekdays: string[], months: string[] }) {
        if (val) {
            this.dateService.locale = 'custom';
            this.locale = 'custom';
            this.dateService.setCustomNls(val);
        }
    };

    @Input() public okText: string;
    @Input() public cancelText: string;
    @Input() public bodyClasses: Array<string>;
    @Input() public headerClasses: Array<string>;
    @Input() public modalOptions: ModalOptions;
    @Input() public value: Date = new Date();
    @Input() public disabledDates: Date[] = [];
    @Input() public markDates: Date[] = [];
    @Input() public showMaxAndMin: boolean = false;
    public dateSelected: EventEmitter<string | Date> = new EventEmitter<string | Date>();
    public modal: DatePickerDisplayer;
    private _fn: any;

    constructor(public datepickerCtrl: DatePickerController,
                public dateService: DateService) {
        this.changed.subscribe((d: Date) => {
            this.value = d;
        });
    }

    @HostListener('tap', ['$event'])
    _click(ev: UIEvent) {
        this.open();
    }

    public open() {
        const data = <DatePickerData>{
            min: this.min,
            max: this.max,
            bodyClasses: this.bodyClasses,
            headerClasses: this.headerClasses,
            ionChanged: this.changed,
            ionCanceled: this.canceled,
            ionSelected: this.dateSelected,
            date: this.value,
            okText: this.okText,
            cancelText: this.cancelText,
            disabledDates: this.disabledDates,
            markDates: this.markDates,
            showMaxAndMin: this.showMaxAndMin
        };
        this.modal = this.datepickerCtrl.create(data, this.modalOptions);
        this.modal.present();
    }
}
