import { nls } from './nls';
export declare class DateService {
    private DatepickerNls;
    constructor(DatepickerNls: nls);
    private locale;
    getDaysOfWeek(): string[];
    getMonths(): string[];
    getYears(): any[];
    createDateList(currentDate: Date): Date[];
}
