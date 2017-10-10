import { languages, nls } from './nls';

import { Injectable } from "@angular/core";

@Injectable()
export class DateService {
    /**
     * 
     * @description - The value that holds the locale
     * @private
     * @static
     * @type {languages} 
     * @memberof DateService
     */
    private static _local: languages = undefined;

    /**
     * 
     * @description - Returns the locale, defaults to en-UK
     * @type {languages}
     * @memberof DateService
     */
    public get locale(): languages {
        return DateService._local || 'en-UK';
    }

    /**
     * 
     * @description - A set for locale with a limit to only certain langauges
     * @memberof DateService
     */
    public set locale(val: languages) {
        if (!nls.checkExists(val)) {
            throw 'Locale not recognized as a valid value. Only ' + Object.keys(nls._nls).join('/') + ' avaliable';
        }
        DateService._local = val;
    }

    /**
     * 
     * @function setCustomNls - Sets a custom nls value
     * @param {{ weekdays: string[], months: string[] }} val 
     * @memberof DateService
     */
    public setCustomNls(val: { weekdays: string[], months: string[] }): void {
        nls._nls.custom = val;
    }

    /**
     * 
     * @function getDaysOfWeek - gets an array of all weekday names
     * @returns {string[]} 
     * @memberof DateService
     */
    public getDaysOfWeek(): string[] {
        return nls.getWeekdays(this.locale);
    }

    /**
    * 
    * @function getMonths - gets an array of all weekday names
    * @returns {string[]} 
    * @memberof DateService
    */
    public getMonths(): string[] {
        return nls.getMonths(this.locale);
    }

    /**
     * 
     * @function doesStartFromMonday - determines whether the nls should start from monday or not
     * @returns {boolean} 
     * @memberof DateService
     */
    public doesStartFromMonday(): boolean {
        return nls.getNls(this.locale).monday === true;
    }

    /**
     * 
     * @function getYears - returns all years from 1900 - 2101, this will stop working if you travel back in time or a 100 years have passed.
     * @returns {number[]} 
     * @memberof DateService
     */
    public getYears(): number[] {
        let years: Array<any> = [];
        for (var i = 1900; i < 2101; i++) years.push(i);
        return years;
    }

    /**
     * 
     * @function createDateList - creates a list of dates for the current date
     * @param {Date} currentDate - use to get the month for the list
     * @returns {Date[]} 
     * @memberof DateService
     */
    public createDateList(currentDate: Date): Date[] {
        let firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        // handle mondays
        if (this.doesStartFromMonday()) {
            if (firstDayOfWeek === 0)
                firstDayOfWeek = 6;
            else firstDayOfWeek--;
        }
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        let dateList: Date[] = [];

        // Empty placeholders so dates align with weekday columns
        for (var j = 0; j < firstDayOfWeek; j++) {
            dateList.push(undefined);
        }

        // Actual dates
        for (var i = firstDay; i <= lastDay; i++) {
            dateList.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }

        return dateList;
    }
}
