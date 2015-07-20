(function(module) {

  'use strict';

  angular.module('ionic-datepicker')
  .service('DatepickerService', function () {

    this.daysOfWeek = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
    this.months = [];
    this.years = [];

    this.populateMonths = function() {

      var today   = new Date()
        , locale  = window.navigator.userLanguage || window.navigator.language;

      for (var i = 0; i < 12; i++) {
        today.setDate(1);
        today.setMonth(i);
        this.months.push(today.toLocaleString(locale, { month: 'long' }));
      }
    };

    this.populateYears = function() {
      for (var i = 1900; i < 2101; i++) this.years.push(i);
    };

    this.createDateList = function(currentDate) {

      var firstDay  = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate()
        , lastDay   = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
        , dateList  = [];

      for (var i = firstDay; i <= lastDay; i++) {
        var tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        dateList.push(tempDate);
      }

      firstDay = dateList[0].getDay();
      for (var j = 0; j < firstDay; j++) {
        dateList.unshift(undefined);
      }
      return dateList;
    };

    this.initialize = function() {
      this.populateMonths();
      this.populateYears();
    };

    this.initialize();
  });
})();
