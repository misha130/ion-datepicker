import { nls } from './nls';
import { Injectable } from '@angular/core';

/**
 * DateService
 */
@Injectable()
export class DateService {
    constructor(private DatepickerNls: nls) {
    }
    private locale = ((<any>window).navigator['userLanguage'] || window.navigator.language).toLowerCase();

    public getDaysOfWeek() {
        return this.DatepickerNls.getWeekdays(this.locale);
    }
    public getMonths() {
        return this.DatepickerNls.getMonths(this.locale);
    }
    public getYears() {
        let years: Array<any> = [];
        for (var i = 1900; i < 2101; i++) years.push(i);
        return years;
    }
    public createDateList(currentDate: Date) {
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
        let dateList: Date[] = [];

        for (var i = firstDay; i <= lastDay; i++) {
            dateList.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }

        firstDay = dateList[0].getDay();
        // for (var j = 0; j < firstDay; j++) {
        //     dateList.unshift(undefined);
        // }
        return dateList;
    }
}
