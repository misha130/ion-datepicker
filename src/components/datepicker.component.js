import { Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { DateService } from './datepicker.service';
export var DatePickerComponent = (function () {
    function DatePickerComponent(DatepickerService) {
        this.DatepickerService = DatepickerService;
        this.callback = new EventEmitter();
        this.hClasses = [];
        this.dClasses = [];
        this.full = false;
        this.calendar = false;
        this.today = new Date();
        this.selectedDate = new Date();
        this.active = false;
        this.type = 'date';
        this.mode = 'calendar';
        if (this.calendar)
            this.type = 'calendar';
        this.initialize();
    }
    DatePickerComponent.prototype.initialize = function () {
        this.selectedDate = new Date();
        this.tempDate = this.selectedDate;
        this.createDateList(this.selectedDate);
    };
    DatePickerComponent.prototype.openModal = function () {
        this.active = !this.active;
    };
    DatePickerComponent.prototype.getDaysOfWeek = function () {
        if (!this.weekdays) {
            this.weekdays = this.DatepickerService.getDaysOfWeek();
        }
        return this.weekdays;
    };
    DatePickerComponent.prototype.ngAfterViewChecked = function () {
        if (this.dayscroll && this.type === 'date')
            this.dayscroll.nativeElement.scrollTop = this.selectedDate.getDate() * (this.dayscroll.nativeElement.scrollHeight / this.dateList.length);
        else if (this.yearscroll && this.type === 'year')
            this.yearscroll.nativeElement.scrollTop = (this.selectedDate.getFullYear() - 1900) * (this.yearscroll.nativeElement.scrollHeight / this.getYears().length);
    };
    DatePickerComponent.prototype.getMonths = function () {
        if (!this.months) {
            this.months = this.DatepickerService.getMonths();
        }
        return this.months;
    };
    DatePickerComponent.prototype.getYears = function () {
        return this.DatepickerService.getYears();
    };
    DatePickerComponent.prototype.createDateList = function (selectedDate) {
        this.dateList = this.DatepickerService.createDateList(selectedDate);
        this.cols = new Array(7);
        this.rows = new Array(Math.round(this.dateList.length / this.cols.length) + 1);
    };
    DatePickerComponent.prototype.getDate = function (row, col) {
        return this.dateList[row * 7 + col];
    };
    DatePickerComponent.prototype.isDefined = function (date) {
        return date !== undefined;
    };
    DatePickerComponent.prototype.isDisabled = function (date) {
        if (!date)
            return true;
        if (this.min) {
            this.min.setHours(0, 0, 0, 0);
            if (date < this.min)
                return true;
        }
        if (this.max) {
            this.max.setHours(0, 0, 0, 0);
            if (date > this.max)
                return true;
        }
        return false;
    };
    DatePickerComponent.prototype.isActualDate = function (date) {
        if (!date)
            return false;
        return date.getDate() === this.today.getDate() &&
            date.getMonth() === this.today.getMonth() &&
            date.getFullYear() === this.today.getFullYear();
    };
    DatePickerComponent.prototype.isActualMonth = function (month) {
        return month === this.today.getMonth();
    };
    DatePickerComponent.prototype.isActualYear = function (year) {
        return year === this.today.getFullYear();
    };
    DatePickerComponent.prototype.isSelectedDate = function (date) {
        if (!date)
            return false;
        return date.getDate() === this.selectedDate.getDate() &&
            date.getMonth() === this.selectedDate.getMonth() &&
            date.getFullYear() === this.selectedDate.getFullYear();
    };
    DatePickerComponent.prototype.isSelectedMonth = function (month) {
        return month === this.tempDate.getMonth();
    };
    DatePickerComponent.prototype.isSelectedYear = function (year) {
        return year === this.tempDate.getFullYear();
    };
    DatePickerComponent.prototype.changeType = function (val) {
        if (this.type === 'calendar')
            return;
        this.type = val;
    };
    DatePickerComponent.prototype.showType = function (val) {
        return this.type === val;
    };
    DatePickerComponent.prototype.selectDate = function (date) {
        if (this.isDisabled(date))
            return;
        this.selectedDate = date;
        this.selectedDate.setHours(0, 0, 0, 0);
        this.tempDate = this.selectedDate;
    };
    DatePickerComponent.prototype.selectMonth = function (month) {
        this.tempDate.setMonth(month);
        if (this.tempDate.getMonth() !== month) {
            this.tempDate.setDate(0);
        }
        this.changeType('date');
        this.selectMonthOrYear();
    };
    DatePickerComponent.prototype.selectYear = function (year) {
        this.tempDate.setFullYear(year);
        this.changeType('month');
        this.selectMonthOrYear();
    };
    DatePickerComponent.prototype.getSelectedWeekday = function () {
        if (!this.weekdays)
            this.getDaysOfWeek();
        return this.weekdays[this.selectedDate.getDay()];
    };
    DatePickerComponent.prototype.getSelectedMonth = function () {
        if (!this.months)
            this.getMonths();
        return this.months[this.selectedDate.getMonth()];
    };
    DatePickerComponent.prototype.getTempMonth = function () {
        if (!this.months)
            this.getMonths();
        return this.months[this.tempDate.getMonth()];
    };
    DatePickerComponent.prototype.getTempYear = function () {
        return this.tempDate.getFullYear() | this.selectedDate.getFullYear();
    };
    DatePickerComponent.prototype.onCancel = function (e) {
        this.selectedDate = this.date || new Date();
        this.callback.emit(this.date);
    };
    ;
    DatePickerComponent.prototype.onDone = function (e) {
        this.date = this.selectedDate;
        this.callback.emit(this.date);
    };
    ;
    DatePickerComponent.prototype.selectMonthOrYear = function () {
        this.createDateList(this.tempDate);
        if (this.isDisabled(this.tempDate))
            return;
        this.selectedDate = this.tempDate;
    };
    DatePickerComponent.prototype.limitTo = function (arr, limit) {
        if (Array.isArray(arr))
            return arr.splice(0, limit);
        return arr.slice(0, limit);
    };
    DatePickerComponent.prototype.getMonthRows = function () {
        return [];
    };
    DatePickerComponent.prototype.nextMonth = function () {
        if (this.tempDate.getMonth() === 11) {
            this.tempDate.setFullYear(this.tempDate.getFullYear() + 1);
            this.tempDate.setMonth(0);
        }
        else {
            this.tempDate.setMonth(this.tempDate.getMonth() + 1);
        }
        this.createDateList(this.tempDate);
    };
    DatePickerComponent.prototype.prevMonth = function () {
        if (this.tempDate.getMonth() === 0) {
            this.tempDate.setFullYear(this.tempDate.getFullYear() - 1);
            this.tempDate.setMonth(11);
        }
        else {
            this.tempDate.setMonth(this.tempDate.getMonth() - 1);
        }
        this.createDateList(this.tempDate);
    };
    DatePickerComponent.decorators = [
        { type: Component, args: [{
                    template: "<button aria-haspopup=\"true\" \n            type=\"button\" \n            ion-button=\"item-cover\"\n            class=\"item-cover\"> \n</button>\n<div [class.active]='active' class=\"datepicker-modal-container\">\n    <div class=\"datepicker-modal\" [style.width]=\"full?'100%':''\" [style.height]=\"full?'100%':''\">\n        <div class=\"datepicker-modal-head datepicker-balanced white bold\" [ngClass]=\"hClasses\">\n            <div class=\"datepicker-modal-title\">{{getSelectedWeekday()}}</div>\n        </div>\n        <div class=\"center datepicker-balanced-light\" [ngClass]=\"dClasses\">\n            <div class=\"row\">\n                <div class=\"col datepicker-month-js datepicker-month\" (click)=\"changeType('month')\">\n                    {{limitTo(getSelectedMonth(),3)}}\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col datepicker-day-of-month \" (click)=\"changeType('date')\">\n                    {{selectedDate | date: 'd'}}\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col datepicker-year-js datepicker-year \" (click)=\"changeType('year')\">\n                    {{selectedDate | date: 'yyyy'}}\n                </div>\n            </div>\n        </div>\n        <div class=\"datepicker-month-content-js datepicker-content\" *ngIf=\"showType('month')\">\n            <div class=\"row center\" *ngFor=\"let month of getMonths(); let i = index;\">\n                <div class=\"col datepicker-selection datepicker-date-cell\" [ngClass]=\"{\n                  'datepicker-selected': isSelectedMonth(i),\n                  'datepicker-current': isActualMonth(i)\n                  }\" (click)=\"selectMonth(i)\">\n                    {{limitTo(month,3)}}\n                </div>\n            </div>\n        </div>\n        <div #dayscroll class=\"datepicker-content\" *ngIf=\"showType('date')\">\n            <div class=\"row col center\">\n                {{getTempMonth()}} {{tempDate | date: 'yyyy'}}\n            </div>\n            <!--<div class=\"row center\">\n\t\t\t\t<div class=\"col bold\" *ngFor=\"let dayOfWeek of getDaysOfWeek(); let i = index;\">\n\t\t\t\t\t{{limitTo(dayOfWeek,3)}}\n\t\t\t\t</div>\n\t\t\t</div>-->\n            <div class=\"datepicker-content\">\n                <div class=\"row center\" *ngFor=\"let row of rows;let i = index\">\n                    <div class=\"col no-padding\" *ngFor=\"let col of cols;let j =index\" [ngClass]=\"{\n                  'datepicker-date-col': isDefined(getDate(i, j)),\n                  'datepicker-selected': isSelectedDate(getDate(i, j)),\n                  'datepicker-current' : isActualDate(getDate(i, j)),\n                  'datepicker-disabled': isDisabled(getDate(i, j))\n                  }\">\n                        <div class=\"datepicker-date-cell\" (click)=\"selectDate(getDate(i, j))\">\n                            {{ getDate(i, j) | date: 'd' }}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div #yearscroll class=\"datepicker-year-content-js datepicker-content\" *ngIf=\"showType('year')\">\n            <div class=\"row center\" *ngFor=\"let year of getYears();let i = index;\">\n                <div class=\"col datepicker-selection datepicker-date-cell\" [ngClass]=\"{\n                  'datepicker-selected': isSelectedYear(year),\n                  'datepicker-current': isActualYear(year)\n                  }\" (click)=\"selectYear(year)\">\n                    {{year}}\n                </div>\n            </div>\n        </div>\n        <div class=\"datepicker-calendar\" *ngIf=\"showType('calendar')\">\n            <div class=\"row col center\">\n                <button small ion-button clear (click)=\"prevMonth()\"><ion-icon name=\"arrow-back\"></ion-icon></button>{{getTempMonth()}}\n                {{getTempYear()}}\n                <button small ion-button clear (click)=\"nextMonth()\"><ion-icon name=\"arrow-forward\"></ion-icon></button>\n            </div>\n            <div *ngFor=\"let week of rows;let i = index;\" class=\"row calendar-row\">\n                <span class=\"col calendar-cell datepicker-selection datepicker-date-cell\" *ngFor=\"let day of cols;let j=index;\" [ngClass]=\"{\n                  'datepicker-date-col': isDefined(getDate(i, j)),\n                  'datepicker-selected': isSelectedDate(getDate(i, j)),\n                  'datepicker-current' : isActualDate(getDate(i, j)),\n                  'datepicker-disabled': isDisabled(getDate(i, j))\n                  }\" (click)=\"selectDate(getDate(i, j))\">\n\t\t\t\t\t{{getDate(i, j) | date:'d'}}\n\t\t\t\t</span>\n            </div>\n        </div>\n        <div class=\"datepicker-modal-buttons\">\n            <button ion-button (click)=\"onCancel($event)\" class=\"datepicker-cancel-js button button-clear button-small col-offset-33\">CANCEL</button>\n            <button ion-button (click)=\"onDone($event)\" class=\"datepicker-ok-js button button-clear button-small\">OK</button>\n        </div>\n    </div>\n</div>",
                    styles: ["\n    ion-datepicker{\n        overflow:auto;\n        }\n        .datepicker-modal-container{\n  opacity: 0;\n}\n.datepicker-modal-container,\n.datepicker-modal-container .datepicker-modal {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -moz-flex;\n  display: -ms-flexbox; \n}\n\n.datepicker-modal-container.active, {\n  opacity: 1!important;\n}\n\n.datepicker-content {\n  overflow: auto\n}\n\n.visible-overflow {\n  overflow: visible\n}\n\n.center {\n  text-align: center\n}\n\n.bold {\n  font-weight: 700\n}\n\n.datepicker-day-of-month,\n.datepicker-month,\n.datepicker-year {\n  margin-top: 10px;\n  margin-bottom: 10px;\n  color: #fff;\n  cursor: pointer\n}\n\n.datepicker-selection {\n  cursor: pointer\n}\n\n.datepicker-month,\n.datepicker-year {\n  font-size: 14px\n}\n\n.datepicker-day-of-month {\n  font-size: 60px;\n  font-weight: 700\n}\n\n.datepicker-balanced {\n  background-color: #008d7f\n}\n\n.white {\n  color: #fff\n}\n\n.datepicker-balanced-light {\n  background-color: #009688\n}\n\n.datepicker-color-balanced-light {\n  color: #009688!important\n}\n\n.datepicker-date-col:hover {\n  background-color: rgba(56, 126, 245, .5);\n  cursor: pointer\n}\n\n.no-padding {\n  padding: 0\n}\n\n.datepicker-date-cell {\n  padding: 5px\n}\n\n.datepicker-selected {\n  background-color: rgba(182, 217, 214, 1)\n}\n\n.datepicker-current {\n  color: rgba(60, 170, 159, 1)\n}\n\n.datepicker-disabled {\n  color: rgba(170, 170, 170, 1)\n}\n\n.datepicker-disabled:hover {\n  background-color: transparent;\n  cursor: default\n}\n\n.datepicker-modal-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0);\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -webkit-align-items: center;\n  -moz-align-items: center;\n  align-items: center;\n  z-index: 12\n}\n\n.datepicker-modal-container .datepicker-modal {\n  width: 250px;\n  max-width: 100%;\n  max-height: 100%;\n  border-radius: 0;\n  background-color: rgba(255, 255, 255, .9);\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column\n}\n\n.datepicker-modal {\n  box-shadow: 1px 1px 3px #888\n}\n\n.datepicker-modal-head {\n  padding: 8px 10px;\n  text-align: center\n}\n\n.datepicker-modal-title {\n  margin: 0;\n  padding: 0;\n  font-size: 13px\n}\n\n.datepicker-modal-buttons {\n  padding-top: 10%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  padding: 10px;\n  min-height: 65px;\n  font-size: 12px;\n  font-weight: 700\n}\n\n.datepicker-modal-buttons .button {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -moz-box-flex: 1;\n  -moz-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  display: block;\n  min-height: 45px;\n  border-radius: 2px;\n  line-height: 20px;\n  margin-right: 5px\n}\n\n.datepicker-modal-buttons .button:last-child {\n  margin-right: 0\n}\n\n.datepicker-calendar {\n  word-wrap: normal;\n}\n\n.calendar-row {\n  padding-top: 15px;\n  padding-bottom: 15px;\n  display: flex;\n  justify-content: space-around;\n}\n\n.calendar-cell {\n  height: 25px;\n  width: 25px;\n}"],
                    selector: 'ion-datepicker',
                    host: {
                        '(click)': 'openModal()',
                    }
                },] },
    ];
    DatePickerComponent.ctorParameters = [
        { type: DateService, },
    ];
    DatePickerComponent.propDecorators = {
        'date': [{ type: Input, args: ['date',] },],
        'min': [{ type: Input, args: ['min',] },],
        'max': [{ type: Input, args: ['max',] },],
        'callback': [{ type: Output, args: ['onchange',] },],
        'hClasses': [{ type: Input, args: ['hclasses',] },],
        'dClasses': [{ type: Input, args: ['dclasses',] },],
        'full': [{ type: Input, args: ['full',] },],
        'calendar': [{ type: Input, args: ['calendar',] },],
        'dayscroll': [{ type: ViewChild, args: ['dayscroll',] },],
        'yearscroll': [{ type: ViewChild, args: ['yearscroll',] },],
    };
    return DatePickerComponent;
}());
//# sourceMappingURL=datepicker.component.js.map