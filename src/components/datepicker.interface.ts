import { EventEmitter } from "@angular/core";
import { languages } from '../services/nls';

export interface DatePickerData {
    okText?: string,
    cancelText?: string,
    min?: Date,
    max?: Date,
    mode: 'single' | 'multiple' | 'range',
    ionChanged: EventEmitter<Date | Date[]>,
    ionSelected: EventEmitter<Date | Date[]>,
    ionCanceled: EventEmitter<void>,
    headerClasses?: string[],
    bodyClasses?: string[],
    date?: Date | Date[],
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