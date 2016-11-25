import { Directive, Input, Output, EventEmitter } from "@angular/core";
export var DatePickerDirective = (function () {
    function DatePickerDirective() {
        this.callback = new EventEmitter();
        this.hClasses = [];
        this.dClasses = [];
        this.full = false;
        this.calendar = false;
    }
    DatePickerDirective.prototype.openModal = function () {
        DatePickerDirective.config =
            {
                date: this.date,
                min: this.min,
                max: this.min,
                callback: this.callback,
                headerClasses: this.hClasses,
                dateClasses: this.dClasses,
                fullScreen: this.full,
                calendar: this.calendar
            };
        // let modal = this.modalCtrl.create(DatePickerComponent
        // );
        // DatePickerDirective.config.modal = modal;
        // modal.present();
    };
    DatePickerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[iondatepicker]',
                    host: {
                        '(click)': 'openModal()',
                    }
                },] },
    ];
    /** @nocollapse */
    DatePickerDirective.ctorParameters = [];
    DatePickerDirective.propDecorators = {
        'date': [{ type: Input, args: ['date',] },],
        'min': [{ type: Input, args: ['min',] },],
        'max': [{ type: Input, args: ['max',] },],
        'callback': [{ type: Output, args: ['onchange',] },],
        'hClasses': [{ type: Input, args: ['hclasses',] },],
        'dClasses': [{ type: Input, args: ['dclasses',] },],
        'full': [{ type: Input, args: ['full',] },],
        'calendar': [{ type: Input, args: ['calendar',] },],
    };
    return DatePickerDirective;
}());
//# sourceMappingURL=datepicker.directive.js.map