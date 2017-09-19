import { Component, EventEmitter, ViewEncapsulation, ElementRef } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';

import { DatePickerData, DatePickerView } from './datepicker.interface';
import { DateService } from '../services/datepicker.service';

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
                <div (tap)="setView(views.Month, getTempMonth(), months.length, yearScroll)" class="col datepicker-month">
                    {{limitTo(getTempMonth(),3)}}
                </div>
            </div>
            <div class="row">
                <div (tap)="setView(views.Day, getTempDate(),getDayList().length, dayScroll)" class="col datepicker-day-of-month ">
                    {{getTempDate()}}
                </div>
            </div>
            <div class="row">
                <div  (tap)="setView(views.Year, getTempYear() - 1901, years.length, yearScroll)" class="col datepicker-year ">
                    {{ getTempYear()}}
                </div>
            </div>
        </div>
    </div>
    <div class="datepicker-calendar" 
    *ngIf="view === views.Calendar"
        [ngClass]="config.bodyClasses">
        <div class="row col datepicker-controls">
            <button (tap)="prevMonth()"
                ion-button=""
                class="disable-hover button button-ios button-default button-default-ios">
                <span class="button-inner">
                    <ion-icon name="arrow-back" role="img" class="icon icon-ios ion-ios-arrow-back" aria-label="arrow-back" ng-reflect-name="arrow-back"></ion-icon></span><div class="button-effect"></div></button>            {{getTempMonth()}} {{getTempYear()}}
            <button (tap)="nextMonth()"
                ion-button=""
                class="disable-hover button button-ios button-default button-default-ios">
                <span class="button-inner">
                    <ion-icon name="arrow-forward" role="img" class="icon icon-ios ion-ios-arrow-forward" aria-label="arrow-forward" ng-reflect-name="arrow-forward"></ion-icon></span><div class="button-effect"></div></button>
        </div>
        <div class="weekdays-row row">
            <span class="col calendar-cell"
                *ngFor="let dayOfWeek of weekdays">
                    {{limitTo(dayOfWeek,3)}}
                </span>
        </div>
        <div class="calendar-wrapper">
            <div class="row calendar-row" *ngFor="let week of rows;let i = index;">
                <span class="col calendar-cell"
                    *ngFor="let day of cols;let j=index;"
                    [ngClass]="{
                  'datepicker-date-col': getDate(i, j) !== undefined,
                  'datepicker-selected': isSelectedDate(getDate(i, j)),
                  'datepicker-current' : isActualDate(getDate(i, j)),
                  'datepicker-disabled': isDisabled(getDate(i, j)),
                  'datepicker-temp': isTempDate(getDate(i, j)),
                  'datepicker-mark' : isMark(getDate(i, j))
                  }"
                    (tap)="selectDate(getDate(i, j))">
					{{getDateAsDay(i, j)}}
				</span>
            </div>
        </div>
    </div>
    <div [hidden]="view !== views.Year" #yearScroll class="datepicker-rows">
        <ng-container  *ngFor="let year of years">    
            <div  *ngIf="testYear(year) && view === views.Year" (tap)="setSelectedYear(year)" [class.active]="getTempYear() === year" [class.selected]="getSelectedYear() === year" class="row">
                {{year}}
            </div>
        </ng-container>
    </div>
        <div [hidden]="view !== views.Month" #monthScroll class="datepicker-rows">
        <ng-container *ngFor="let month of months;let i = index">
            <div  *ngIf="testMonth(i)  && view === views.Month" (tap)="setSelectedMonth(i)" [class.active]="getTempMonth() === month" [class.selected]="getSelectedMonth() === month"   class="row">
                {{month}}
            </div>
        </ng-container>
    </div>
    <div [hidden]="view !== views.Day" #dayScroll class="datepicker-rows">
       <ng-container *ngFor="let day of getDayList()">
            <div class="row" *ngIf="testDay(day)  && view === views.Day" [class.active]="getTempDate() === day" [class.selected]="getSelectedDate() === day" (tap)="setSelectedDay(day)" >
                {{day}}
            </div>
        </ng-container>
    </div>
    <div class="datepicker-footer">
        <button (tap)="onCancel($event)"
            ion-button=""
            class="button button-clear button-small col-offset-33 disable-hover button button-ios button-default button-default-ios">
            <span class="button-inner">{{config.cancelText || 'Cancel'}}</span><div class="button-effect"></div></button>
        <button (tap)="onDone($event)"
            ion-button=""
            class="button button-clear button-small disable-hover button button-ios button-default button-default-ios">
            <span class="button-inner">{{config.okText || 'OK'}}</span><div class="button-effect"></div></button>
    </div>
</div>
    `,
    styles: [`
    ionic2-datepicker .col {
        padding: 5px;
        position: relative;
        width: 100%;
        margin: 0;
        min-height: 1px;
        -webkit-flex-basis: 0;
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%;
    }
    ionic2-datepicker .row {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
      }
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

ionic2-datepicker .datepicker-rows {
    height: calc(100% - (35% + 60px));
    overflow-y:scroll;
    display:flex;
   flex-direction:column;
    align-items:center;
}
ionic2-datepicker .datepicker-rows .row {
    min-height: 30px;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

ionic2-datepicker .datepicker-rows .row.selected {
    background-color: #b6d9d6;
    border-radius: 20px;
}

ionic2-datepicker .datepicker-rows .row.active {
    background-color: #b6c2d9;
    border-radius: 20px;
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
  background-color:#5b6c6b;
  border-radius: 20px;
}
ionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-selected {
  background-color: #b6d9d6;
  border-radius: 20px;
}

ionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-temp {
    background-color: #b6c2d9;
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

    /**
     * 
     * @type {DatePickerData} 
     * @description - represents the configuration of the datepicker
     * @memberof DatePickerComponent
     */
    public config: DatePickerData;
    /**
     * 
     * @type {Date}
     * @description - The currently selected date when opening the datepicker
     * @memberof DatePickerComponent
     */
    public selectedDate: Date = new Date();
    /**
     * 
     * @type {Date[]}
     * @description - The whole list of dates in a month
     * @memberof DatePickerComponent
     */
    public dateList: Date[];
    /**
     * 
     * @type {number[]}
     * @description - The columns of a month
     * @memberof DatePickerComponent
     */
    public cols: number[];
    /**
     * 
     * @type {number[]}
     * @description - The rows in a month
     * @memberof DatePickerComponent
     */
    public rows: number[];
    /**
     * 
     * @type {string[]}
     * @description - An array of the weekday names
     * @memberof DatePickerComponent
     */
    public weekdays: string[];
    /**
     * 
     * @type {string[]}
     * @description - An array of month names
     * @memberof DatePickerComponent
     */
    public months: string[];
    /**
     * 
     * @type {number[]}
     * @description - An array of the years
     * @memberof DatePickerComponent
     */
    public years: number[];
    /**
    * 
    * @type {DatePickerView}
    * @description - Current view of picker
    * @memberof DatePickerComponent
    */
    public view: DatePickerView = DatePickerView.Calendar;
    /**
    * 
    * @type {tyepof DatePickerView}
    * @description - List of view types
    * @memberof DatePickerComponent
    */
    public views: typeof DatePickerView = DatePickerView;
    /**
     * 
     * @private
     * @type {Date}
     * @description - The selected date after opening the datepicker
     * @memberof DatePickerComponent
     */

    private tempDate: Date;
    /**
     * 
     * @private
     * @type {Date}
     * @description - Today's date
     * @memberof DatePickerComponent
     */
    private today: Date = new Date();
    /**
     * 
     * Creates an instance of DatePickerComponent.
     * @param {ViewController} viewCtrl - dismissing the modal
     * @param {NavParams} navParams - carrying the navigation parameters
     * @param {DateService} DatepickerService - services for various things
     * @memberof DatePickerComponent
     */
    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public DatepickerService: DateService) {
        this.config = this.navParams.data;
        if (!this.config.calendar)
            this.view = this.views.Day;
        this.selectedDate = this.navParams.data.date;
        this.initialize();
    }


    /**
     * 
     * @function initialize - Initializes date variables
     */
    public initialize(): void {
        if (this.config.min)
            this.config.min.setHours(0, 0, 0, 0);
        if (this.config.max)
            this.config.max.setHours(0, 0, 0, 0);
        this.tempDate = this.selectedDate;
        this.createDateList(this.selectedDate);
        this.weekdays = this.DatepickerService.getDaysOfWeek();
        this.months = this.DatepickerService.getMonths();
        this.years = this.DatepickerService.getYears();
    }

    /**
     * 
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
        return this.dateList[(row * 7 + col)];
    }

    /**
     * 
     * @function getDate - gets the actual number of date from the list of dates
     * @param row - the row of the date in a month. For instance 14 date would be 3rd or 2nd row
     * @param col - the column of the date in a month. For instance 1 would be on the column of the weekday.
     */
    public getDateAsDay(row: number, col: number): number {
        let date = this.getDate(row, col);
        if (date) return date.getDate();
    }

    /**
     * 
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

    /**
    * 
    * @function testYear - Checks whether the year should be disabled or not
    * @param year - the year to test against
    */
    public testYear(year: number): boolean {
        if (year === undefined) return false;
        let testDate = new Date(year, this.tempDate.getMonth(), this.tempDate.getDate());
        return !this.isDisabled(testDate);
    }

    /**
    * 
    * @function testMonth - Checks whether the year should be disabled or not
    * @param month - the month to test against
    */
    public testMonth(month: number): boolean {
        if (month  === undefined) return false;
        let testDate = new Date(this.tempDate.getFullYear(), month, this.tempDate.getDate());
        return !this.isDisabled(testDate);
    }

    /**
    * 
    * @function testMonth - Checks whether the year should be disabled or not
    * @param month - the month to test against
    */
    public testDay(day: number): boolean {
        if (day  === undefined) return false;
        let testDate = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), day);
        return !this.isDisabled(testDate);
    }

    /**
     * 
     * @function isMark - Checks whether the date should be marked
     * @param {Date} date - date to check
     * @returns {boolean} 
     * @memberof DatePickerComponent
     */
    public isMark(date: Date): boolean {
        if (!date) return false;
        if (this.config.markDates) {
            return this.config.markDates.some(markDate =>
                this.areEqualDates(new Date(markDate), date));
        }
        return false
    }
    /**
     * 
     * @function isActualDate - Checks whether the date is today's date.
     * @param {Date} date - date to check
     * @returns {boolean} 
     * @memberof DatePickerComponent
     */
    public isActualDate(date: Date): boolean {
        if (!date) return false;
        return this.areEqualDates(date, this.today);
    }

    /**
    * 
    * @function isSelectedDate - Checks whether the date is the selected date.
    * @param {Date} date - date to check
    * @returns {boolean} 
    * @memberof DatePickerComponent
    */
    public isSelectedDate(date: Date): boolean {
        if (!date) return false;
        return this.areEqualDates(date, this.selectedDate);
    }

    /**
    * 
    * @function isTempDate - Checks whether the date is the selected date.
    * @param {Date} date - date to check
    * @returns {boolean} 
    * @memberof DatePickerComponent
    */
    public isTempDate(date: Date): boolean {
        if (!date) return false;
        return this.areEqualDates(date, this.tempDate);
    }

    /**
     * 
     * @function selectDate - selects a date and emits back the date
     * @param {Date} date - date to select
     * @returns {void} 
     * @memberof DatePickerComponent
     */
    public selectDate(date: Date): void {
        if (this.isDisabled(date)) return;
        this.tempDate = date;
        this.tempDate.setHours(0, 0, 0, 0);
        this.config.ionSelected.emit(this.tempDate);
    }
    /**
     * 
     * @function getSelectedWeekday - Gets the selected date's weekday
     * @returns {string} 
     * @memberof DatePickerComponent
     */
    public getSelectedWeekday(): string {
        return this.weekdays[this.tempDate.getDay() + (this.DatepickerService.doesStartFromMonday() ? -1 : 0)];
    }

    /**
    * 
    * @function getSelectedMonth - Gets the selected date's name of month
    * @returns {string} 
    * @memberof DatePickerComponent
    */
    public getSelectedMonth(): string {
        return this.months[this.tempDate.getMonth()];
    }


    /**
    * 
    * @function getDayList - Gets the list of days
    * @returns {string[]} 
    * @memberof DatePickerComponent
    */
    public getDayList(): string[] {
        var date = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), 1);
        var days = [];
        while (date.getMonth() === this.tempDate.getMonth()) {
            days.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    /**
    * 
    * @function getTempMonth - Gets the temporary selected date's name of month
    * @returns {string} 
    * @memberof DatePickerComponent
    */
    public getTempMonth(): string {
        return this.months[this.tempDate.getMonth()];
    }

    /**
    * 
    * @function getTempYear - Gets the temporary selected date's year
    * @returns {number} 
    * @memberof DatePickerComponent
    */
    public getTempYear(): number {
        return (this.tempDate || this.selectedDate).getFullYear();
    }

    /**
    * 
    * @function getTempDate - Gets the temporary selected date's day
    * @returns {number} 
    * @memberof DatePickerComponent
    */
    public getTempDate(): number {
        return (this.tempDate || this.selectedDate).getDate();
    }

    /**
    * 
    * @function getSelectedDate - Gets selected date's date
    * @returns {number} 
    * @memberof DatePickerComponent
    */
    public getSelectedDate(): number {
        return (this.selectedDate || new Date()).getDate();
    }

    /**
    * 
    * @function getSelectedYear - Gets selected date's year
    * @returns {number} 
    * @memberof DatePickerComponent
    */
    public getSelectedYear(): number {
        return (this.selectedDate || new Date()).getFullYear();
    }

    /**
    * 
    * @function setSelectedMonth - Sets the selected month
    * @memberof DatePickerComponent
    */
    public setSelectedMonth(month: number): void {
        this.tempDate = new Date(this.tempDate.getFullYear(), month, this.tempDate.getDate());
        this.createDateList(this.tempDate);
        if (this.config.calendar)
            this.view = this.views.Calendar;
    }

    /**
    * 
    * @function setSelectedMonth - Sets the selected month
    * @memberof DatePickerComponent
    */
    public setSelectedDay(day: number): void {
        this.tempDate = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), day);
        if (this.config.calendar)
            this.view = this.views.Calendar;
    }

    /**
    * 
    * @function setSelectedYear - Sets the selected year
    * @memberof DatePickerComponent
    */
    public setSelectedYear(year: number): void {
        this.tempDate = new Date(year, this.tempDate.getMonth(), this.tempDate.getDate());
        this.createDateList(this.tempDate);
        if (this.config.calendar)
            this.view = this.views.Calendar;
    }
    /**
    * 
    * @function setView - Sets the view and scrolls to the relevant row
    * @param {DatePickerView} view - the view to set
    * @param {number} index - index of date/month/year
    * @param {number} total - total amount of items
    * @param {HTMLElement} scrolledElement - element to scroll upon
    * @memberof DatePickerComponent
    */
    public setView(view: DatePickerView, index: number, total: number, scrolledElement: HTMLElement): void {
        this.view = view;
        setTimeout(() => {
            scrolledElement.scrollTop = (scrolledElement.scrollHeight / total) * (index - 1);
        }, 10);
    }
    /**
     * 
     * @function onCancel - activates on cancel and emits a cancel event
     * @memberof DatePickerComponent
     */
    public onCancel(): void {
        if (this.config.date)
            this.selectedDate = this.config.date || new Date();
        this.config.ionCanceled.emit();
        this.viewCtrl.dismiss();
    };

    /**
    * 
    * @function onDone - activates on done and emits date 
    * @memberof DatePickerComponent
    */
    public onDone(): void {
        this.config.date = this.tempDate;
        this.config.ionChanged.emit(this.config.date);
        this.viewCtrl.dismiss();
    };

    /**
     * 
     * @function limitTo - removes part of the string depending on a language and its needs
     * @param {(Array<string> | string)} arr - the array of strings to limit
     * @param {number} limit - amount to limit
     * @returns {(Array<string> | string)} 
     * @memberof DatePickerComponent
     */
    public limitTo(arr: Array<string> | string, limit: number): Array<string> | string {
        if (this.DatepickerService.locale === 'custom') return arr;
        if (this.DatepickerService.locale === 'de') limit = 2;
        if (Array.isArray(arr))
            return arr.splice(0, limit);
        if (this.DatepickerService.locale === 'zh-CN' || this.DatepickerService.locale === 'zh-TW')
            arr = arr.replace("星期", "")
        return (<string>arr).slice(0, limit);
    }

    /**
     * 
     * @function nextMonth - moves the calendar to the next month
     * @memberof DatePickerComponent
     */
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

    /**
     * 
     * @function prevMonth - moves the calendar to the previous month
     * @memberof DatePickerComponent
     */
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

    /**
     * 
     * @function areEqualDates - compares 2 dates only by their month,date & year
     * @private
     * @param {Date} dateA - first date to compare
     * @param {Date} dateB - second date to compare
     * @returns 
     * @memberof DatePickerComponent
     */
    private areEqualDates(dateA: Date, dateB: Date): boolean {
        return dateA.getDate() === dateB.getDate() &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getFullYear() === dateB.getFullYear();
    }
}