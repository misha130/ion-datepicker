import { Component, Input, Output } from '@angular/core';
import { DateService } from './date.service';
@Component({
    templateUrl: 'template.html',
    selector: 'ionicDatepicker'
})

export class DatePickerComponent {
    private type: 'date' | 'string' = 'date';
    private today: Date = new Date();
    private selectedDate: Date;
    private tempDate: Date;
    private dateList: Date[];
    private cols: number[];
    private rows: number[];
    private weekdays: string[];
    private months: string[];
    @Input('date') private date: Date;
    @Input('min') private min: Date;
    @Input('max') private max: Date;
    @Input('callback') private callback: (date: Date | undefined) => {};
    constructor(public DatepickerService: DateService) {
    }
    public initialize(): void {
        this.selectedDate = Object.assign({}, this.date || new Date());
        this.tempDate = Object.assign({}, this.selectedDate);
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

    public get years(): Date[] {
        return this.DatepickerService.getYears();
    }

    public createDateList(selectedDate: Date): void {
        this.dateList = this.DatepickerService.createDateList(selectedDate);
        this.cols = new Array(7);
        this.rows = new Array(+(this.dateList.length / this.cols.length) + 1);
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
        this.selectedDate = Object.assign({}, date);
        this.selectedDate.setHours(0, 0, 0, 0);
        this.tempDate = Object.assign({}, this.selectedDate);
    }

    public selectMonth(month: number): void {
        this.tempDate = Object.assign({}, this.tempDate);
        this.tempDate.setMonth(month);
        if (this.tempDate.getMonth() !== month) {
            this.tempDate.setDate(0);
        }
        this.selectMonthOrYear();
    }

    public selectYear(year) {
        this.tempDate = Object.assign({}, this.tempDate);
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
        this.selectedDate = Object.assign({}, this.date || new Date());
        this.callback(undefined);
    };

    public onDone(e) {
        this.date = Object.assign({}, this.selectedDate);
        this.callback(this.date);
    };

    private selectMonthOrYear() {
        this.changeType('date');
        this.createDateList(this.tempDate);
        if (this.isDisabled(this.tempDate)) return;
        this.selectedDate = this.tempDate;
    }
}