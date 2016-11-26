import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { DateService } from './datepicker.service';

@Component({
    template: `<button aria-haspopup="true" 
            type="button" 
            ion-button="item-cover"
            class="item-cover"> 
</button>
<div [class.active]='active' class="datepicker-modal-container">
    <div class="datepicker-modal" [style.width]="full?'100%':''" [style.height]="full?'100%':''">
        <div class="datepicker-modal-head datepicker-balanced white bold" [ngClass]="hClasses">
            <div class="datepicker-modal-title">{{getSelectedWeekday()}}</div>
        </div>
        <div class="center datepicker-balanced-light" [ngClass]="dClasses">
            <div class="row">
                <div class="col datepicker-month-js datepicker-month" (click)="changeType('month')">
                    {{limitTo(getSelectedMonth(),3)}}
                </div>
            </div>
            <div class="row">
                <div class="col datepicker-day-of-month " (click)="changeType('date')">
                    {{selectedDate | date: 'd'}}
                </div>
            </div>
            <div class="row">
                <div class="col datepicker-year-js datepicker-year " (click)="changeType('year')">
                    {{selectedDate | date: 'yyyy'}}
                </div>
            </div>
        </div>
        <div class="datepicker-month-content-js datepicker-content" *ngIf="showType('month')">
            <div class="row center" *ngFor="let month of getMonths(); let i = index;">
                <div class="col datepicker-selection datepicker-date-cell" [ngClass]="{
                  'datepicker-selected': isSelectedMonth(i),
                  'datepicker-current': isActualMonth(i)
                  }" (click)="selectMonth(i)">
                    {{limitTo(month,3)}}
                </div>
            </div>
        </div>
        <div #dayscroll class="datepicker-content" *ngIf="showType('date')">
            <div class="row col center">
                {{getTempMonth()}} {{tempDate | date: 'yyyy'}}
            </div>
            <!--<div class="row center">
				<div class="col bold" *ngFor="let dayOfWeek of getDaysOfWeek(); let i = index;">
					{{limitTo(dayOfWeek,3)}}
				</div>
			</div>-->
            <div class="datepicker-content">
                <div class="row center" *ngFor="let row of rows;let i = index">
                    <div class="col no-padding" *ngFor="let col of cols;let j =index" [ngClass]="{
                  'datepicker-date-col': isDefined(getDate(i, j)),
                  'datepicker-selected': isSelectedDate(getDate(i, j)),
                  'datepicker-current' : isActualDate(getDate(i, j)),
                  'datepicker-disabled': isDisabled(getDate(i, j))
                  }">
                        <div class="datepicker-date-cell" (click)="selectDate(getDate(i, j))">
                            {{ getDate(i, j) | date: 'd' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div #yearscroll class="datepicker-year-content-js datepicker-content" *ngIf="showType('year')">
            <div class="row center" *ngFor="let year of getYears();let i = index;">
                <div class="col datepicker-selection datepicker-date-cell" [ngClass]="{
                  'datepicker-selected': isSelectedYear(year),
                  'datepicker-current': isActualYear(year)
                  }" (click)="selectYear(year)">
                    {{year}}
                </div>
            </div>
        </div>
        <div class="datepicker-calendar" *ngIf="showType('calendar')">
            <div class="row col center">
                <button small ion-button clear (click)="prevMonth()"><ion-icon name="arrow-back"></ion-icon></button>{{getTempMonth()}}
                {{getTempYear()}}
                <button small ion-button clear (click)="nextMonth()"><ion-icon name="arrow-forward"></ion-icon></button>
            </div>
            <div *ngFor="let week of rows;let i = index;" class="row calendar-row">
                <span class="col calendar-cell datepicker-selection datepicker-date-cell" *ngFor="let day of cols;let j=index;" [ngClass]="{
                  'datepicker-date-col': isDefined(getDate(i, j)),
                  'datepicker-selected': isSelectedDate(getDate(i, j)),
                  'datepicker-current' : isActualDate(getDate(i, j)),
                  'datepicker-disabled': isDisabled(getDate(i, j))
                  }" (click)="selectDate(getDate(i, j))">
					{{getDate(i, j) | date:'d'}}
				</span>
            </div>
        </div>
        <div class="datepicker-modal-buttons">
            <button ion-button (click)="onCancel($event)" class="datepicker-cancel-js button button-clear button-small col-offset-33">CANCEL</button>
            <button ion-button (click)="onDone($event)" class="datepicker-ok-js button button-clear button-small">OK</button>
        </div>
    </div>
</div>`,
    styles: [`
    ion-datepicker{
        overflow:auto;
        }
        .datepicker-modal-container{
  opacity: 0;
}
.datepicker-modal-container,
.datepicker-modal-container .datepicker-modal {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -moz-flex;
  display: -ms-flexbox; 
}

.datepicker-modal-container.active, {
  opacity: 1!important;
}

.datepicker-content {
  overflow: auto
}

.visible-overflow {
  overflow: visible
}

.center {
  text-align: center
}

.bold {
  font-weight: 700
}

.datepicker-day-of-month,
.datepicker-month,
.datepicker-year {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
  cursor: pointer
}

.datepicker-selection {
  cursor: pointer
}

.datepicker-month,
.datepicker-year {
  font-size: 14px
}

.datepicker-day-of-month {
  font-size: 60px;
  font-weight: 700
}

.datepicker-balanced {
  background-color: #008d7f
}

.white {
  color: #fff
}

.datepicker-balanced-light {
  background-color: #009688
}

.datepicker-color-balanced-light {
  color: #009688!important
}

.datepicker-date-col:hover {
  background-color: rgba(56, 126, 245, .5);
  cursor: pointer
}

.no-padding {
  padding: 0
}

.datepicker-date-cell {
  padding: 5px
}

.datepicker-selected {
  background-color: rgba(182, 217, 214, 1)
}

.datepicker-current {
  color: rgba(60, 170, 159, 1)
}

.datepicker-disabled {
  color: rgba(170, 170, 170, 1)
}

.datepicker-disabled:hover {
  background-color: transparent;
  cursor: default
}

.datepicker-modal-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
  z-index: 12
}

.datepicker-modal-container .datepicker-modal {
  width: 250px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 0;
  background-color: rgba(255, 255, 255, .9);
  display: flex;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column
}

.datepicker-modal {
  box-shadow: 1px 1px 3px #888
}

.datepicker-modal-head {
  padding: 8px 10px;
  text-align: center
}

.datepicker-modal-title {
  margin: 0;
  padding: 0;
  font-size: 13px
}

.datepicker-modal-buttons {
  padding-top: 10%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-direction: normal;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 10px;
  min-height: 65px;
  font-size: 12px;
  font-weight: 700
}

.datepicker-modal-buttons .button {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: block;
  min-height: 45px;
  border-radius: 2px;
  line-height: 20px;
  margin-right: 5px
}

.datepicker-modal-buttons .button:last-child {
  margin-right: 0
}

.datepicker-calendar {
  word-wrap: normal;
}

.calendar-row {
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-around;
}

.calendar-cell {
  height: 25px;
  width: 25px;
}`],
    selector: 'ion-datepicker',
    host: {
        '(click)': 'openModal()',
    }
})

export class DatePickerComponent {

    public static config: any;
    @Input('date') public date: Date;
    @Input('min') public min: Date;
    @Input('max') public max: Date;
    @Output('onchange') public callback: EventEmitter<string | Date> = new EventEmitter<string | Date>();
    @Input('hclasses') public hClasses: any[] = [];
    @Input('dclasses') public dClasses: any[] = [];
    @Input('full') public full: boolean = false;
    @Input('calendar') public calendar: boolean = false;
    @ViewChild('dayscroll') public dayscroll: ElementRef;
    @ViewChild('yearscroll') public yearscroll: ElementRef;
    public today: Date = new Date();
    public selectedDate: Date = new Date();
    public tempDate: Date;
    public dateList: Date[];
    public cols: number[];
    public rows: number[];
    public weekdays: string[];
    public months: string[];
    public active: boolean = false;
    public type: 'date' | 'string' | 'year' | 'month' | 'calendar' = 'date';
    public mode: 'calendar' | undefined = 'calendar';
    constructor(public DatepickerService: DateService) {
        if (this.calendar) this.type = 'calendar';
        this.initialize();
    }

    public initialize(): void {
        this.selectedDate = new Date();
        this.tempDate = this.selectedDate;
        this.createDateList(this.selectedDate);
    }
    openModal() {
        this.active = !this.active;
    }
    public getDaysOfWeek(): string[] {
        if (!this.weekdays) {
            this.weekdays = this.DatepickerService.getDaysOfWeek();
        }
        return this.weekdays;
    }
    public ngAfterViewChecked() {
        if (this.dayscroll && this.type === 'date')
            this.dayscroll.nativeElement.scrollTop = this.selectedDate.getDate() * (this.dayscroll.nativeElement.scrollHeight / this.dateList.length);
        else if (this.yearscroll && this.type === 'year')
            this.yearscroll.nativeElement.scrollTop = (this.selectedDate.getFullYear() - 1900) * (this.yearscroll.nativeElement.scrollHeight / this.getYears().length);
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

    public changeType(val: 'date' | 'string' | 'year' | 'month' | 'calendar'): void {
        if (this.type === 'calendar') return;
        this.type = val;
    }

    public showType(val: 'date' | 'string' | 'year' | 'month' | 'calendar'): boolean {
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
        this.changeType('date');
        this.selectMonthOrYear();
    }

    public selectYear(year: number) {
        this.tempDate.setFullYear(year);
        this.changeType('month');
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
    public getTempYear() {
        return this.tempDate.getFullYear() | this.selectedDate.getFullYear();
    }
    public onCancel(e: Event) {
        this.selectedDate = this.date || new Date();
        this.callback.emit(this.date);
        // this.modal.dismiss();
    };

    public onDone(e: Event) {
        this.date = this.selectedDate;
        this.callback.emit(this.date);
        //  this.modal.dismiss();
    };

    public selectMonthOrYear() {

        this.createDateList(this.tempDate);
        if (this.isDisabled(this.tempDate)) return;
        this.selectedDate = this.tempDate;
    }
    public limitTo(arr: Array<string> | string, limit: number): Array<string> | string {
        if (Array.isArray(arr))
            return arr.splice(0, limit);
        return (<string>arr).slice(0, limit);
    }
    public getMonthRows(): {}[] {
        return [];
    }
    public nextMonth() {
        if (this.tempDate.getMonth() === 11) {
            this.tempDate.setFullYear(this.tempDate.getFullYear() + 1);
            this.tempDate.setMonth(0);
        }
        else {
            this.tempDate.setMonth(this.tempDate.getMonth() + 1);
        }
        this.createDateList(this.tempDate);
    }
    public prevMonth() {
        if (this.tempDate.getMonth() === 0) {
            this.tempDate.setFullYear(this.tempDate.getFullYear() - 1);
            this.tempDate.setMonth(11);
        }
        else {
            this.tempDate.setMonth(this.tempDate.getMonth() - 1);
        }
        this.createDateList(this.tempDate);
    }
}