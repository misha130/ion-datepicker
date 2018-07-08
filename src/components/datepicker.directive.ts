import { App, ModalOptions, ViewController } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerController } from './datepicker.modal';
import { DatePickerDisplayer } from './datepicker.displayer';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation, forwardRef } from "@angular/core";

import { DatePickerData } from './datepicker.interface';
import { DateService } from '../services/datepicker.service';

@Directive({
  selector: 'ion-datepicker,[ion-datepicker]',
})
export class DatePickerDirective {
  @Output('ionSelected') public selected: EventEmitter<string | Date> = new EventEmitter<string | Date>();
  @Output('ionChanged') public changed: EventEmitter<string | Date> = new EventEmitter<string | Date>();
  @Output('ionCanceled') public canceled: EventEmitter<void> = new EventEmitter<void>();

  @Input() public max: Date;
  @Input() public min: Date;
  @Input() public set locale(val: string) {
    if (val)
      this.dateService.locale = val;
  };
  @Input() public set localeStrings(val: { weekdays: string[], months: string[] }) {
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
  @Input() public mode: 'single' | 'multiple' | 'range' = 'single';
  @Output() public valueChange: EventEmitter<string | Date> = this.changed;
  @Input() public disabledDates: Date[] = [];
  @Input() public markDates: Date[] = [];
  @Input() public calendar: boolean = true;
  public modal: DatePickerDisplayer;
  private _fn: any;
  constructor(
    public datepickerCtrl: DatePickerController,
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
    if (this.mode !== undefined && this.mode !== 'single' && this.mode !== 'multiple' && this.mode !== 'range') {
      throw new Error('Unrecognized mode in datepicker');
    }
    const data = <DatePickerData>{
      min: this.min,
      max: this.max,
      mode: this.mode,
      bodyClasses: this.bodyClasses,
      headerClasses: this.headerClasses,
      ionChanged: this.changed,
      ionCanceled: this.canceled,
      ionSelected: this.selected,
      date: Array.isArray(this.value) ? [...this.value] : Object.assign({}, this.value),
      okText: this.okText,
      cancelText: this.cancelText,
      disabledDates: this.disabledDates,
      markDates: this.markDates,
      calendar: this.calendar,
    }
    this.modal = this.datepickerCtrl.create(data, this.modalOptions);
    this.modal.present();
  }
}
