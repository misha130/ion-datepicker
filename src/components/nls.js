import { Injectable } from '@angular/core';
export var nls = (function () {
    function nls() {
        this._nls = {
            'en-us': {
                weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            'pt-br': {
                weekdays: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
            },
            'he-il': {
                weekdays: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
                months: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']
            },
        };
    }
    nls.prototype.getWeekdays = function (locale) {
        return this.getNls(locale).weekdays;
    };
    nls.prototype.getMonths = function (locale) {
        return this.getNls(locale).months;
    };
    nls.prototype.getNls = function (locale) {
        return this._nls[locale] || this._nls['en-us'];
    };
    nls.decorators = [
        { type: Injectable },
    ];
    nls.ctorParameters = [];
    return nls;
}());
//# sourceMappingURL=nls.js.map