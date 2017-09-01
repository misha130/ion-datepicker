import {Component, EventEmitter, ViewEncapsulation} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

import {DateService} from './datepicker.service';
import {FormControl} from '@angular/forms';

@Component({
    template: `
        <div class="datepicker-wrapper">
            <div class="datepicker-header"
                 [ngClass]="config.headerClasses">
                <div class="weekday-header">
                    <div class="weekday-title">{{getSelectedWeekday()}}</div>
                </div>
                <div class="date-header">
                    <div class="row">
                        <div class="col datepicker-month">
                            {{limitTo(getSelectedMonth(), 3)}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col datepicker-day-of-month ">
                            {{selectedDate | date: 'd'}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col datepicker-year ">
                            {{selectedDate | date: 'yyyy'}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="datepicker-calendar"
                 [ngClass]="config.bodyClasses">
                <div class="row col datepicker-controls">
                    <button (click)="prevMonth()" [disabled]="previousDisabled"
                            ion-button=""
                            class="disable-hover button button-ios button-default button-default-ios">
                <span class="button-inner">
                    <ion-icon name="arrow-back" role="img"
                              class="icon icon-ios ion-ios-arrow-back" aria-label="arrow-back" ng-reflect-name="arrow-back">

                    </ion-icon></span>
                        <div class="button-effect"></div>
                    </button>
                    <select title="Month" name="equiptype" class="form-control" [formControl]="monthChanged" [(ngModel)]="selectedMonth" required>
                        <option></option>
                        <option *ngFor="let mon of months" [ngValue]="mon">{{mon}}</option>
                    </select>
                    <select title="Month" name="equiptype" class="form-control" [formControl]="yearChanged" [(ngModel)]="selectedYear" required>
                        <option></option>
                        <option *ngFor="let yea of yearsMaxMin" [ngValue]="yea">{{yea}}</option>
                    </select>
                    <button (click)="nextMonth()" [disabled]="nextDisabled"
                            ion-button=""
                            class="disable-hover button button-ios button-default button-default-ios">
                <span class="button-inner">
                    <ion-icon name="arrow-forward" role="img"
                              class="icon icon-ios ion-ios-arrow-forward" aria-label="arrow-forward" ng-reflect-name="arrow-forward">
                    </ion-icon></span>
                        <div class="button-effect"></div>
                    </button>
                </div>
                <div class="weekdays-row row">
            <span class="col calendar-cell"
                  *ngFor="let dayOfWeek of weekdays">
                    {{limitTo(dayOfWeek, 3)}}
                </span>
                </div>
                <div class="calendar-wrapper">
                    <div class="row calendar-row"
                         *ngFor="let week of rows;let i = index;">
                <span class="col calendar-cell"
                      *ngFor="let day of cols;let j=index;"
                      [ngClass]="{
                  'datepicker-date-col': getDate(i, j) !== undefined,
                  'datepicker-selected': isSelectedDate(getDate(i, j)),
                  'datepicker-current' : isActualDate(getDate(i, j)),
                  'datepicker-disabled': isDisabled(getDate(i, j))
                  }"
                      (click)="selectDate(getDate(i, j))">
					{{getDate(i, j) | date:'d'}}
				</span>
                    </div>
                </div>
            </div>
            <div class="datepicker-footer">
                <button (click)="onCancel($event)"
                        ion-button=""
                        class="button button-clear button-small col-offset-33 disable-hover button button-ios button-default button-default-ios">
                    <span class="button-inner">{{config.cancelText || 'Cancel'}}</span>
                    <div class="button-effect"></div>
                </button>
                <button (click)="onDone($event)"
                        ion-button=""
                        class="button button-clear button-small disable-hover button button-ios button-default button-default-ios">
                    <span class="button-inner">{{config.okText || 'OK'}}</span>
                    <div class="button-effect"></div>
                </button>
            </div>
        </div>
    `,
    styles: [`
        ionic2-datepicker .datepicker-wrapper {
            height: 100%;
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        ionic2-datepicker .datepicker-wrapper .datepicker-header {
            color: white;
            background-color: #009688;
            display: flex;
            flex-flow: column;
            height: 35%;
        }

        ionic2-datepicker .datepicker-wrapper .datepicker-header .date-header {
            display: flex;
            flex-flow: column;
            text-align: center;
        }

        ionic2-datepicker .datepicker-wrapper .datepicker-header .date-header .datepicker-day-of-month {
            font-size: 60px;
            font-weight: 700;
        }

        ionic2-datepicker .datepicker-wrapper .datepicker-header .date-header .datepicker-year, ionic2-datepicker .datepicker-wrapper .datepicker-header .date-header .datepicker-month {
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        ionic2-datepicker .datepicker-wrapper .datepicker-header .weekday-header {
            padding: 8px 10px;
            background-color: #008d7f;
        }

        ionic2-datepicker .datepicker-wrapper .datepicker-header .weekday-header .weekday-title {
            font-weight: bold;
            text-align: center;
        }

        ionic2-datepicker .weekdays-row {
            text-align: center;
        }

        ionic2-datepicker .datepicker-calendar {
            height: calc(100% - (35% + 60px));
        }

        ionic2-datepicker .datepicker-calendar .datepicker-controls {
            align-items: center;
            justify-content: space-between;
        }

        ionic2-datepicker .datepicker-calendar .calendar-wrapper {
            height: calc(100% - 60px - 40px);
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

        ionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-mark {
            background-color: #5b6c6b;
            border-radius: 20px;
        }

        ionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-selected {
            background-color: #b6d9d6;
            border-radius: 20px;
        }

        ionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-current {
            color: #3caa9f;
            border-radius: 20px;
        }

        ionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-disabled {
            color: #aaaaaa;
        }

        ionic2-datepicker .datepicker-calendar .calendar-wrapper .calendar-cell {
            flex-flow: row wrap;
            text-align: center;
        }

        ionic2-datepicker .datepicker-footer {
            display: flex;
            justify-content: space-between;
            height: 60px;
        }

        ionic2-datepicker .datepicker-footer button {
            width: 100%;
        }

    `],
    selector: 'ionic2-datepicker',
    encapsulation: ViewEncapsulation.None,
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
        date: Date,
        disabledDates: Date[],
        markDates: Date[],
        showMaxAndMin: boolean;
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


    public yearsMaxMin: number[];
    public selectedMonth;
    public selectedYear;
    public monthChanged: FormControl;
    public yearChanged: FormControl;
    public nextDisabled: boolean = false;
    public previousDisabled: boolean = false;
    private maxYear: number;
    private minYear: number;

    constructor(public viewCtrl: ViewController,
                public navParams: NavParams,
                public DatepickerService: DateService) {
        this.config = this.navParams.data;
        this.selectedDate = this.navParams.data.date;
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
        this.initSelectBoxes();
        this.initSelectBoxListener();
    }

    /**
     * initializes the selectbox and considers max and min date
     */
    private initSelectBoxes() {
        let maxDate = this.config.max;
        let minDate = this.config.min;
        this.maxYear = Number.parseInt(this.years[this.years.length - 1]);
        this.minYear = Number.parseInt(this.years[0]);
        if (maxDate) {
            this.maxYear = maxDate.getFullYear();
        }
        if (minDate) {
            this.minYear = minDate.getFullYear();
        }
        this.yearsMaxMin = [];
        for (let _minYear = this.minYear; _minYear <= this.maxYear; _minYear++) {
            this.yearsMaxMin.push(_minYear);
        }
        this.selectedMonth = this.getSelectedMonth();
        this.selectedYear = this.getSelectedYear();
    }

    /**
     * initializes the listener to change the dategrid if that changes
     */
    private initSelectBoxListener() {
        this.monthChanged = new FormControl();
        this.monthChanged.valueChanges
            .subscribe(selectedMonth => {
                let monthAsNumber = this.months.indexOf(selectedMonth);
                let testDate: Date = new Date(this.tempDate.getTime());
                testDate.setMonth(monthAsNumber);
                this.tempDate = testDate;
                this.createDateList(this.tempDate);
                this.checkDisableButtons(monthAsNumber, testDate.getFullYear());
            });
        this.yearChanged = new FormControl();
        this.yearChanged.valueChanges
            .subscribe(selectedYear => {
                let testDate: Date = new Date(this.tempDate.getTime());
                testDate.setFullYear(selectedYear);
                this.tempDate = testDate;
                this.createDateList(this.tempDate);
                this.checkDisableButtons(testDate.getMonth(), selectedYear);
            });
    }

    /**
     * checks if the forward/previos buttons should be disabled or not
     * @param selectedMonth
     * @param selectedYear
     */
    checkDisableButtons(selectedMonth, selectedYear) {
        this.nextDisabled = selectedMonth == 11 && this.maxYear === selectedYear;
        this.previousDisabled = selectedMonth == 0 && this.minYear === selectedYear;
    }

    /**
     * @function createDateList - creates the list of dates
     * @param selectedDate - creates the list based on the currently selected date
     */
    public createDateList(selectedDate: Date): void {
        this.dateList = this.DatepickerService.createDateList(selectedDate);
        this.cols = new Array(7);
        this.rows = new Array(Math.ceil(this.dateList.length / this.cols.length));
    }

    /**
     * @function getDate - gets the actual date of date from the list of dates
     * @param row - the row of the date in a month. For instance 14 date would be 3rd or 2nd row
     * @param col - the column of the date in a month. For instance 1 would be on the column of the weekday.
     */
    public getDate(row: number, col: number): Date {
        /**
         * @description The locale en-US is noted for the sake of starting with monday if its in usa
         */
        return this.dateList[(row * 7 + col) + ((this.DatepickerService.doesStartFromMonday()) ? 1 : 0)];
    }

    /**
     * @function getDate - gets the actual number of date from the list of dates
     * @param row - the row of the date in a month. For instance 14 date would be 3rd or 2nd row
     * @param col - the column of the date in a month. For instance 1 would be on the column of the weekday.
     */
    public getDateAsDay(row: number, col: number): number {
        let date = this.getDate(row, col);
        if (date) return date.getDate();
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
        if (this.config.disabledDates) {
            return this.config.disabledDates.some(disabledDate =>
                this.areEqualDates(new Date(disabledDate), date));
        }
        return false;
    }

    public isMark(date: Date): boolean {
        if (!date) return false;
        if (this.config.markDates) {
            return this.config.markDates.some(markDate =>
                this.areEqualDates(new Date(markDate), date));
        }
        return false
    }

    public isActualDate(date: Date): boolean {
        if (!date) return false;
        return this.areEqualDates(date, this.today);
    }

    public isActualMonth(month: number): boolean {
        return month === this.today.getMonth();
    }

    public isActualYear(year: number): boolean {
        return year === this.today.getFullYear();
    }

    public isSelectedDate(date: Date): boolean {
        if (!date) return false;
        return this.areEqualDates(date, this.selectedDate);
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

    public getSelectedMonth(date?: Date): string {
        if (!date) {
            return this.months[this.selectedDate.getMonth()];
        } else {
            return this.months[date.getMonth()];
        }
    }

    public getTempMonth() {
        return this.months[this.tempDate.getMonth()];
    }

    public getTempYear() {
        return (this.tempDate || this.selectedDate).getFullYear();
    }

    public getSelectedDate() {
        return (this.selectedDate || new Date()).getDate();
    }

    public getSelectedYear() {
        return (this.selectedDate || new Date()).getFullYear();
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

    private areEqualDates(dateA: Date, dateB: Date) {
        return dateA.getDate() === dateB.getDate() &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getFullYear() === dateB.getFullYear();
    }

    public limitTo(arr: Array<string> | string, limit: number): Array<string> | string {
        if (this.DatepickerService.locale === 'custom') return arr;
        if (this.DatepickerService.locale === 'de') limit = 2;
        if (Array.isArray(arr))
            return arr.splice(0, limit);
        if (this.DatepickerService.locale === 'zh-CN' || this.DatepickerService.locale === 'zh-TW')
            arr = arr.replace('星期', '')
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
        if ((!this.config.max || this.config.max >= testDate) || this.config.showMaxAndMin) {
            this.setDateAfterSelection(testDate);
        }
    }

    public prevMonth() {
        let testDate: Date = new Date(this.tempDate.getTime());
        testDate.setDate(0);
        // testDate.setDate(this.tempDate.getDate());
        if ((!this.config.min ||
                (this.config.min <= testDate)) || this.config.showMaxAndMin) {
            this.setDateAfterSelection(testDate);
        }
    }

    /**
     * calls to create the days (list/grid) if applicable
     * @param {Date} testDate
     */
    private setDateAfterSelection(testDate: Date) {
        this.tempDate = testDate;
        this.createDateList(this.tempDate);
        this.selectedMonth = this.getSelectedMonth(this.tempDate);
        this.selectedYear = this.tempDate.getFullYear();
        this.checkDisableButtons(this.tempDate.getMonth(), this.selectedYear);
    }
}