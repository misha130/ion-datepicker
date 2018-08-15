import { EventEmitter } from "@angular/core";
import { languages } from '../services/nls';

export interface DatePickerData {
    okText?: string,
    cancelText?: string,
    min?: Date,
    max?: Date,
    ionChanged: EventEmitter<Date>,
    ionSelected: EventEmitter<Date>,
    ionCanceled: EventEmitter<void>,
    headerClasses?: string[],
    bodyClasses?: string[],
    date?: Date
    locale?: languages;
    disabledDates: Date[];
    calendar: boolean;
    markDates: Date[];
}

export enum DatePickerView {
    Calendar,
    Year,
    Month,
    Day
}