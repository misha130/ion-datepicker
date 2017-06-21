import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';

import { DateService } from './datepicker.service';

@Component({
    templateUrl: 'datepicker.component.html',
    selector: 'ionic2-datepicker',
    encapsulation: ViewEncapsulation.Emulated,
})

export class DatePickerComponent {
    public config: {
        okText: string,
        cancelText: string,
        min: Date,
        max: Date,
        ionChanged: EventEmitter<Date>,
        ionSelected: EventEmitter<Date>,
        ionCanceled: EventEmitter<void>,
        headerClasses: string[],
        bodyClasses: string[],
        date: Date
    };
    public selectedDate: Date = new Date();
    public dateList: Date[];
    public cols: number[];
    public rows: number[];
    public weekdays: string[];
    public months: string[];
    public years: string[];
    public active: boolean = false;
    private tempDate: Date;
    private today: Date = new Date();

    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public DatepickerService: DateService) {
        this.config = this.navParams.data;
        this.initialize();
    }


    /**
     * @function initialize - Initializes date variables
     */
    public initialize(): void {
        this.tempDate = this.selectedDate;
        this.createDateList(this.selectedDate);
        this.weekdays = this.DatepickerService.getDaysOfWeek();
        this.months = this.DatepickerService.getMonths();
        this.years = this.DatepickerService.getYears();
    }

    /**
     * @function createDateList - creates the list of dates
     * @param selectedDate - creates the list based on the currently selected date
     */
    public createDateList(selectedDate: Date): void {
        this.dateList = this.DatepickerService.createDateList(selectedDate);
        this.cols = new Array(7);
        this.rows = new Array(Math.round(this.dateList.length / this.cols.length) + 1);
    }

    /**
     * @function getDate - gets the actual number of date from the list of dates
     * @param row - the row of the date in a month. For instance 14 date would be 3rd or 2nd row
     * @param col - the column of the date in a month. For instance 1 would be on the column of the weekday.
     */
    public getDate(row: number, col: number): Date {
        /**
         * @description The locale en-US is noted for the sake of starting with monday if its in usa
         */
        return this.dateList[(row * 7 + col) + ((this.DatepickerService.locale === 'en-US') ? 1 : 0)];
    }

    /**
     * @function isDisabled - Checks whether the date should be disabled or not
     * @param date - the date to test against
     */
    public isDisabled(date: Date): boolean {
        if (!date) return true;
        if (this.config.min) {
            this.config.min.setHours(0, 0, 0, 0);
            if (date < this.config.min) return true;
        }
        if (this.config.max) {
            this.config.max.setHours(0, 0, 0, 0);
            if (date > this.config.max) return true;
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



    public selectDate(date: Date): void {
        if (this.isDisabled(date)) return;
        this.selectedDate = date;
        this.selectedDate.setHours(0, 0, 0, 0);
        this.tempDate = this.selectedDate;
        this.config.ionSelected.emit(this.tempDate);
    }


    public getSelectedWeekday(): string {
        return this.weekdays[this.selectedDate.getDay()];
    }

    public getSelectedMonth(): string {
        return this.months[this.selectedDate.getMonth()];
    }

    public getTempMonth() {
        return this.months[this.tempDate.getMonth()];
    }
    public getTempYear() {
        return this.tempDate.getFullYear() || this.selectedDate.getFullYear();
    }
    public onCancel(e: Event) {
        if (this.config.date)
            this.selectedDate = this.config.date || new Date();
        this.config.ionCanceled.emit();
        this.viewCtrl.dismiss();
    };

    public onDone(e: Event) {
        this.config.date = this.selectedDate;
        this.config.ionChanged.emit(this.config.date);
        this.viewCtrl.dismiss();
    };

    public selectMonthOrYear() {

        this.createDateList(this.tempDate);
        if (this.isDisabled(this.tempDate)) return;
        this.selectedDate = this.tempDate;
    }
    public limitTo(arr: Array<string> | string, limit: number): Array<string> | string {
        if (Array.isArray(arr))
            return arr.splice(0, limit);
        if (this.DatepickerService.locale === 'zh-CN' || this.DatepickerService.locale === 'zh-TW')
            arr = arr.replace("星期", "")
        return (<string>arr).slice(0, limit);
    }
    public getMonthRows(): {}[] {
        return [];
    }
    public nextMonth() {
        //if (this.max.getMonth() < this.tempDate.getMonth() + 1 && this.min.getFullYear() === this.tempDate.getFullYear()) return;
        let testDate: Date = new Date(this.tempDate.getTime());
        testDate.setDate(1);

        if (testDate.getMonth() === 11) {
            testDate.setFullYear(testDate.getFullYear() + 1);
            testDate.setMonth(0);
        }
        else {
            testDate.setMonth(testDate.getMonth() + 1);
        }
        if (!this.config.max || this.config.max >= testDate) {
            this.tempDate = testDate;
            this.createDateList(this.tempDate);
        }
    }
    public prevMonth() {
        let testDate: Date = new Date(this.tempDate.getTime());
        testDate.setDate(0);
        // testDate.setDate(this.tempDate.getDate());
        if (!this.config.min ||
            (this.config.min <= testDate)) {
            this.tempDate = testDate;
            this.createDateList(this.tempDate);
        }
    }
}