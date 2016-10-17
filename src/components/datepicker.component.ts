import { Component, Input, Output } from '@angular/core';
import { DateService } from './datepicker.service';
import { DatePickerDirective } from './datepicker.directive';
import { Modal } from "ionic-angular";

@Component({
    templateUrl: './datepicker.template.html',
    styles: [`.datepicker-modal-container,.datepicker-modal-container .datepicker-modal{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-moz-flex;display:-ms-flexbox}.datepicker-content{height:210px;overflow:auto}.visible-overflow{overflow:visible}.center{text-align:center}.bold{font-weight:700}.datepicker-day-of-month,.datepicker-month,.datepicker-year{margin-top:10px;margin-bottom:10px;color:#fff;cursor:pointer}.datepicker-selection{cursor:pointer}.datepicker-month,.datepicker-year{font-size:14px}.datepicker-day-of-month{font-size:60px;font-weight:700}.datepicker-balanced{background-color:#008d7f}.white{color:#fff}.datepicker-balanced-light{background-color:#009688}.datepicker-color-balanced-light{color:#009688!important}.datepicker-date-col:hover{background-color:rgba(56,126,245,.5);cursor:pointer}.no-padding{padding:0}.datepicker-date-cell{padding:5px}.datepicker-selected{background-color:rgba(182,217,214,1)}.datepicker-current{color:rgba(60,170,159,1)}.datepicker-disabled{color:rgba(170,170,170,1)}.datepicker-disabled:hover{background-color:transparent;cursor:default}.datepicker-modal-container{position:absolute;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0);display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;-moz-justify-content:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;-moz-align-items:center;align-items:center;z-index:12}.datepicker-modal-container .datepicker-modal{width:250px;max-width:100%;max-height:90%;border-radius:0;background-color:rgba(255,255,255,.9);display:flex;-webkit-box-direction:normal;-webkit-box-orient:vertical;-webkit-flex-direction:column;-moz-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.datepicker-modal{box-shadow:1px 1px 3px #888}.datepicker-modal-head{padding:8px 10px;text-align:center}.datepicker-modal-title{margin:0;padding:0;font-size:13px}.datepicker-modal-buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-moz-flex;display:-ms-flexbox;display:flex;-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-direction:row;-moz-flex-direction:row;-ms-flex-direction:row;flex-direction:row;padding:10px;min-height:65px;font-size:12px;font-weight:700}.datepicker-modal-buttons .button{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-moz-flex:1;-ms-flex:1;flex:1;display:block;min-height:45px;border-radius:2px;line-height:20px;margin-right:5px}.datepicker-modal-buttons .button:last-child{margin-right:0}`]
})

export class DatePickerComponent {
    private type: 'date' | 'string' = 'date';
    private today: Date = new Date();
    private selectedDate: Date = new Date();
    private tempDate: Date;
    private dateList: Date[];
    private cols: number[];
    private rows: number[];
    private weekdays: string[];
    private months: string[];
    private date: Date;
    private min: Date;
    private max: Date;
    private callback: (date: Date | undefined) => {};
    private modal:Modal;
    constructor(public DatepickerService: DateService) {
        this.date = DatePickerDirective.config.date;
        this.min = DatePickerDirective.config.min;
        this.max = DatePickerDirective.config.max;
        this.callback = DatePickerDirective.config.callback;
        this.modal = DatePickerDirective.config.modal;
        this.initialize();
    }
    public initialize(): void {
        this.selectedDate = new Date();
        this.tempDate = this.selectedDate;
        this.createDateList(this.selectedDate);
    }

    public getDaysOfWeek(): string[] {
        if (!this.weekdays) {
            this.weekdays = this.DatepickerService.getDaysOfWeek();
        }
        return this.weekdays;
    }

    public getMonths(): string[] {
        if (!this.months) {
            this.months = this.DatepickerService.getMonths();
        }
        return this.months;
    }

    public getYears(): Date[] {
        return this.DatepickerService.getYears();
    }

    public createDateList(selectedDate: Date): void {
        this.dateList = this.DatepickerService.createDateList(selectedDate);
        this.cols = new Array(7);
        this.rows = new Array(Math.round(this.dateList.length / this.cols.length) + 1);
    }

    public getDate(row: number, col: number): Date {
        return this.dateList[row * 7 + col];
    }

    public isDefined(date: Date | string): boolean {
        return date !== undefined;
    }

    public isDisabled(date: Date): boolean {
        if (!date) return true;
        if (this.min) {
            this.min.setHours(0, 0, 0, 0);
            if (date < this.min) return true;
        }
        if (this.max) {
            this.max.setHours(0, 0, 0, 0);
            if (date > this.max) return true;
        }
        return false;
    }

    public isActualDate(date: Date): boolean {
        if (!date) return false;
        return date.getDate() === this.today.getDate() &&
            date.getMonth() === this.today.getMonth() &&
            date.getFullYear() === this.today.getFullYear();
    }

    public isActualMonth(month: number): boolean {
        return month === this.today.getMonth();
    }

    public isActualYear(year: number): boolean {
        return year === this.today.getFullYear();
    }

    public isSelectedDate(date: Date): boolean {
        if (!date) return false;
        return date.getDate() === this.selectedDate.getDate() &&
            date.getMonth() === this.selectedDate.getMonth() &&
            date.getFullYear() === this.selectedDate.getFullYear();
    }

    public isSelectedMonth(month: number): boolean {
        return month === this.tempDate.getMonth();
    }

    public isSelectedYear(year: number): boolean {
        return year === this.tempDate.getFullYear();
    }

    public changeType(val: 'date' | 'string'): void {
        this.type = val;
    }

    public showType(val: 'date' | 'string'): boolean {
        return this.type === val;
    }

    public selectDate(date: Date): void {
        if (this.isDisabled(date)) return;
        this.selectedDate = date;
        this.selectedDate.setHours(0, 0, 0, 0);
        this.tempDate = this.selectedDate;
    }

    public selectMonth(month: number): void {
        this.tempDate.setMonth(month);
        if (this.tempDate.getMonth() !== month) {
            this.tempDate.setDate(0);
        }
        this.selectMonthOrYear();
    }

    public selectYear(year) {
        this.tempDate.setFullYear(year);
        this.selectMonthOrYear();
    }

    public getSelectedWeekday(): string {
        if (!this.weekdays) this.getDaysOfWeek();
        return this.weekdays[this.selectedDate.getDay()];
    }

    public getSelectedMonth(): string {
        if (!this.months) this.getMonths();
        return this.months[this.selectedDate.getMonth()];
    }

    public getTempMonth() {
        if (!this.months) this.getMonths();
        return this.months[this.tempDate.getMonth()];
    }

    public onCancel(e) {
        this.selectedDate = this.date || new Date();
        this.callback(undefined);
        this.modal.dismiss();
    };

    public onDone(e) {
        this.date = this.selectedDate;
        this.callback(this.date);
        this.modal.dismiss();
    };

    private selectMonthOrYear() {
        this.changeType('date');
        this.createDateList(this.tempDate);
        if (this.isDisabled(this.tempDate)) return;
        this.selectedDate = this.tempDate;
    }
    private limitTo(arr: Array<string> | string, limit: number): Array<string> | string {
        if (Array.isArray(arr))
            return arr.splice(0, limit);
        return (<string>arr).slice(0, limit);
    }
}