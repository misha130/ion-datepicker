import { App, ModalOptions, ViewController } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation, forwardRef } from "@angular/core";

import { DatePickerController } from './datepicker.modal';
import { DatePickerData } from './datepicker.interface';
import { DatePipe } from "@angular/common";
import { DateService } from './datepicker.service';

export const DATEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerDirective),
  multi: true
};
@Directive({
  selector: '[ion-datepicker]',
  providers: [DATEPICKER_VALUE_ACCESSOR],
})
export class DatePickerDirective implements ControlValueAccessor {
  @Output('ionChanged') public changed: EventEmitter<string | Date> = new EventEmitter<string | Date>();
  @Input() public max: Date;
  @Input() public min: Date;
  @Input() public calendar: boolean;
  @Input() public full: boolean;
  @Input() public dclasses: Array<string>;
  @Input() public hclasses: Array<string>;
  @Input() public modalOptions: ModalOptions;

  public value: any;
  private _fn: any;
  constructor(public datepickerCtrl: DatePickerController) {
  }

  @HostListener('click', ['$event'])
  _click(ev: UIEvent) {
    this.open();
  }
  writeValue(val: any) {
    this.value = val;
  }
  registerOnChange(fn: Function): void {
    this._fn = fn;
    this.changed.subscribe((d: any) => {
      if (d) {
        this.value = d;
        fn(d);
      }
    });
  }

  registerOnTouched(fn: any) { this.onTouched = fn; }
  onTouched() { }

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