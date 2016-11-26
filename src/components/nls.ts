import { Injectable } from '@angular/core';

@Injectable()
export class nls {
    private _nls: any =
    {
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

    public getWeekdays(locale: 'en-us' | 'pt-br' | 'he-il'): string[] {
        return this.getNls(locale).weekdays;
    }
    public getMonths(locale: 'en-us' | 'pt-br' | 'he-il'): string[] {
        return this.getNls(locale).months;
    }
    private getNls(locale: 'en-us' | 'pt-br' | 'he-il'): { weekdays: string[], months: string[] } {
        return this._nls[locale] || this._nls['en-us'];
    }
}
