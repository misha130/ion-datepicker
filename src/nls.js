(function() {

  'use strict';

  angular
  .module('ionic-datepicker')
  .service('DatepickerNls', function () {

    var nls = {
      'en-us': {
        weekdays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
      },
      'pt-br': {
        weekdays: [ 'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado' ],
        months: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
      }
    };

    this.getWeekdays = function(locale) {
      return this._getNls(locale).weekdays;
    };

    this.getMonths = function(locale) {
      return this._getNls(locale).months;
    };

    this._getNls = function(locale) {
      return nls[locale] || nls['en-us'];
    };

  });

})();
