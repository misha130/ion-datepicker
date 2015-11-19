(function() {

  'use strict';

  angular
  .module('ionic-datepicker')
  .service('DatepickerNls', function () {

    var locale = window.navigator.userLanguage || window.navigator.language;

    var nls = {
      'en-us': {
        weekdays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
      },
      'pt-br': {
        weekdays: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
        months: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
      }
    };

    this.getWeekdays = function() {
      return nls[locale.toLowerCase()].weekdays;
    };

    this.getMonths = function() {
      return nls[locale.toLowerCase()].months;
    };

  });

})();
