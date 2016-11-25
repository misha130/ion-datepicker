import { Component, ViewChild } from '@angular/core';
import { DateService } from './datepicker.service';
import { DatePickerDirective } from './datepicker.directive';
export var DatePickerComponent = (function () {
    function DatePickerComponent(DatepickerService) {
        this.DatepickerService = DatepickerService;
        this.mode = 'calendar';
        this.type = 'date';
        this.today = new Date();
        this.selectedDate = new Date();
        this.hClasses = [];
        this.dClasses = [];
        this.full = false;
        this.date = DatePickerDirective.config.date;
        this.min = DatePickerDirective.config.min;
        this.max = DatePickerDirective.config.max;
        this.callback = DatePickerDirective.config.callback;
        this.hClasses = DatePickerDirective.config.headerClasses;
        this.dClasses = DatePickerDirective.config.dateClasses;
        this.full = DatePickerDirective.config.fullScreen;
        if (DatePickerDirective.config.calendar)
            this.type = 'calendar';
        this.initialize();
    }
    DatePickerComponent.prototype.initialize = function () {
        this.selectedDate = new Date();
        this.tempDate = this.selectedDate;
        this.createDateList(this.selectedDate);
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
        // this.modal.dismiss();
    };
    ;
    DatePickerComponent.prototype.onDone = function (e) {
        this.date = this.selectedDate;
        this.callback.emit(this.date);
        //  this.modal.dismiss();
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
                    templateUrl: './datepicker.template.html',
                    styles: [".datepicker-modal-container,.datepicker-modal-container .datepicker-modal{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-moz-flex;display:-ms-flexbox}.datepicker-content{overflow:auto}.visible-overflow{overflow:visible}.center{text-align:center}.bold{font-weight:700}.datepicker-day-of-month,.datepicker-month,.datepicker-year{margin-top:10px;margin-bottom:10px;color:#fff;cursor:pointer}.datepicker-selection{cursor:pointer}.datepicker-month,.datepicker-year{font-size:14px}.datepicker-day-of-month{font-size:60px;font-weight:700}.datepicker-balanced{background-color:#008d7f}.white{color:#fff}.datepicker-balanced-light{background-color:#009688}.datepicker-color-balanced-light{color:#009688!important}.datepicker-date-col:hover{background-color:rgba(56,126,245,.5);cursor:pointer}.no-padding{padding:0}.datepicker-date-cell{padding:5px}.datepicker-selected{background-color:rgba(182,217,214,1)}.datepicker-current{color:rgba(60,170,159,1)}.datepicker-disabled{color:rgba(170,170,170,1)}.datepicker-disabled:hover{background-color:transparent;cursor:default}.datepicker-modal-container{position:absolute;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0);display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;-moz-justify-content:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;-moz-align-items:center;align-items:center;z-index:12}.datepicker-modal-container .datepicker-modal{width:250px;max-width:100%;max-height:100%;border-radius:0;background-color:rgba(255,255,255,.9);display:flex;-webkit-box-direction:normal;-webkit-box-orient:vertical;-webkit-flex-direction:column;-moz-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.datepicker-modal{box-shadow:1px 1px 3px #888}.datepicker-modal-head{padding:8px 10px;text-align:center}.datepicker-modal-title{margin:0;padding:0;font-size:13px}.datepicker-modal-buttons{padding-top:10%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-moz-flex;display:-ms-flexbox;display:flex;-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-direction:row;-moz-flex-direction:row;-ms-flex-direction:row;flex-direction:row;padding:10px;min-height:65px;font-size:12px;font-weight:700}.datepicker-modal-buttons .button{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-moz-flex:1;-ms-flex:1;flex:1;display:block;min-height:45px;border-radius:2px;line-height:20px;margin-right:5px}.datepicker-modal-buttons .button:last-child{margin-right:0}.datepicker-calendar{word-wrap:normal;}.calendar-row{padding-top:15px;padding-bottom:15px;display:flex; justify-content:space-around;}.calendar-cell{height:25px;width;25px;}"]
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = [
        { type: DateService, },
    ];
    DatePickerComponent.propDecorators = {
        'dayscroll': [{ type: ViewChild, args: ['dayscroll',] },],
        'yearscroll': [{ type: ViewChild, args: ['yearscroll',] },],
    };
    return DatePickerComponent;
}());
//# sourceMappingURL=datepicker.component.js.map