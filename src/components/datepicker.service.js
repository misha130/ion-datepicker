import { nls } from './nls';
import { Injectable } from '@angular/core';
/**
 * DateService
 */
export var DateService = (function () {
    function DateService(DatepickerNls) {
        this.DatepickerNls = DatepickerNls;
        this.locale = (window.navigator['userLanguage'] || window.navigator.language).toLowerCase();
    }
    DateService.prototype.getDaysOfWeek = function () {
        return this.DatepickerNls.getWeekdays(this.locale);
    };
    DateService.prototype.getMonths = function () {
        return this.DatepickerNls.getMonths(this.locale);
    };
    DateService.prototype.getYears = function () {
        var years = [];
        for (var i = 1900; i < 2101; i++)
            years.push(i);
        return years;
    };
    DateService.prototype.createDateList = function (currentDate) {
        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        var dateList = [];
        for (var i = firstDay; i <= lastDay; i++) {
            dateList.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }
        firstDay = dateList[0].getDay();
        // for (var j = 0; j < firstDay; j++) {
        //     dateList.unshift(undefined);
        // }
        return dateList;
    };
    DateService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DateService.ctorParameters = [
        { type: nls, },
    ];
    return DateService;
}());
//# sourceMappingURL=datepicker.service.js.map