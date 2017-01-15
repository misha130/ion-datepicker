import { App, ModalOptions, ViewController } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation, forwardRef } from "@angular/core";

import { DatePickerController } from './datepicker.modal';
import { DatePickerData } from './datepicker.interface';
import { DatePipe } from "@angular/common";
import { DateService } from './datepicker.service';

@Directive({
  selector: 'ion-datepicker,[ion-datepicker]',
})
export class DatePickerDirective {
  @Output('ionChanged') public changed: EventEmitter<string | Date> = new EventEmitter<string | Date>();
  @Input() public max: Date;
  @Input() public min: Date;
  @Input() public calendar: boolean;
  @Input() public full: boolean;
  @Input() public dclasses: Array<string>;
  @Input() public hclasses: Array<string>;
  @Input() public modalOptions: ModalOptions;
  @Input() public value: Date = new Date();
  private _fn: any;
  constructor(public datepickerCtrl: DatePickerController) {
    this.changed.subscribe((d: Date) => {
      console.log(d);
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
      date: this.value
    }
    let modal = this.datepickerCtrl.create(data, this.modalOptions);
    modal.present();
  }
}
