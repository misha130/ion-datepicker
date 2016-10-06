import { Injectable } from '@angular/core';

@Injectable()
export class nls {
    private _nls =
    {
        'en-us': {
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        'pt-br': {
            weekdays: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        }
    };

    public getWeekdays(locale: 'en-us' | 'pt-br'): string[] {
        return this.getNls(locale).weekdays;
    }
    public getMonths(locale: 'en-us' | 'pt-br'): string[] {
        return this.getNls(locale).months;
    }
    private getNls(locale: 'en-us' | 'pt-br'): { weekdays: string[], months: string[] } {
        return this._nls[locale] || this._nls['en-us'];
    }
}
