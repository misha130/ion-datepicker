import { App, ModalOptions, ViewController } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation, forwardRef } from "@angular/core";

import { DatePickerController, DatePickerDisplayer } from './datepicker.modal';
import { DatePickerData } from './datepicker.interface';
import { DatePipe } from "@angular/common";
import { DateService } from './datepicker.service';

@Directive({
  selector: 'ion-datepicker,[ion-datepicker]',
})
export class DatePickerDirective {
  @Output('ionChanged') public changed: EventEmitter<string | Date> = new EventEmitter<string | Date>();
  @Output('ionCanceled') public canceled: EventEmitter<void> = new EventEmitter<void>();

  @Input() public max: Date;
  @Input() public min: Date;
  @Input() public calendar: boolean;
  @Input() public set locale(val: string) {
    if (val)
      this.dateService.locale = val;
  };
  @Input() public full: boolean;
  @Input() public okText: string;
  @Input() public cancelText: string;

  @Input() public dclasses: Array<string>;
  @Input() public hclasses: Array<string>;
  @Input() public modalOptions: ModalOptions;
  @Input() public value: Date = new Date();
  public dateSelected: EventEmitter<string | Date> = new EventEmitter<string | Date>();
  public modal: DatePickerDisplayer;
  public dateService: DateService = new DateService();
  private _fn: any;
  constructor(public datepickerCtrl: DatePickerController, ) {
    this.changed.subscribe((d: Date) => {
      this.value = d;
    });
  }

  @HostListener('click', ['$event'])
  _click(ev: UIEvent) {
    this.open();
  }

  public open() {
    const data = <DatePickerData>{
      min: this.min,
      max: this.max,
      calendar: this.calendar,
      full: this.full,
      dclasses: this.dclasses,
      hclasses: this.hclasses,
      changed: this.changed,
      canceled: this.canceled,
      date: this.value,
      okText: this.okText,
      cancelText: this.cancelText,
      dateSelected: this.dateSelected
    }
    this.modal = this.datepickerCtrl.create(data, this.modalOptions);
    this.modal.present();
  }
}
