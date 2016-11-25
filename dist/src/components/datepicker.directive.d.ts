import { EventEmitter } from "@angular/core";
export declare class DatePickerDirective {
    static config: any;
    date: Date;
    min: Date;
    max: Date;
    callback: EventEmitter<string | Date>;
    hClasses: any[];
    dClasses: any[];
    full: boolean;
    calendar: boolean;
    constructor();
    openModal(): void;
}
