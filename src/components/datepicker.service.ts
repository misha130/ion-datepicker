import { nls } from './nls';

export class DateService {
    private static _local: string;
    public get locale() {
        return DateService._local || 'en-US';
    }
    public set locale(val: string) {
        if (!nls.checkExists(val)) {
            throw 'Locale not recognized as a valid value. Only en-US/he-IL/ru-RU/pt-BR/de avaliable';
        }
        DateService._local = val;
    }
    constructor() {
    }
    // private locale = ((<any>window).navigator['userLanguage'] || window.navigator.language).toLowerCase();

    public getDaysOfWeek() {
        return nls.getWeekdays(this.locale);
    }
    public getMonths() {
        return nls.getMonths(this.locale);
    }
    public getYears() {
        let years: Array<any> = [];
        for (var i = 1900; i < 2101; i++) years.push(i);
        return years;
    }
    public createDateList(currentDate: Date) {
        let firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
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
