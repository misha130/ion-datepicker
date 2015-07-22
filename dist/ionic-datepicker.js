(function() {

  'use strict';
  angular.module('ionic-datepicker', [ 'ionic', 'ionic-datepicker.templates' ]);
})();

(function() {

  'use strict';

  angular.module('ionic-datepicker')
  .controller('DatepickerController', [ '$scope', 'DatepickerService', function ($scope, DatepickerService) {

    var type  = 'date'
      , today = new Date();

    this.selectedDate = new Date();

    this.getDaysOfWeek = DatepickerService.getDaysOfWeek;
    this.getMonths = DatepickerService.getMonths;
    this.getYears = DatepickerService.getYears;

    if ($scope.date) {
      this.selectedDate = angular.copy($scope.date);
    }

    this.isActualDate = function(date) {
      if (!date) return false;
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    };

    this.isActualMonth = function(month) {
      return month === today.getMonth();
    };

    this.isActualYear = function(year) {
      return year === today.getFullYear();
    };

    this.isSelectedDate = function(date) {
      if (!date) return false;
      return date.getDate() === this.selectedDate.getDate() &&
        date.getMonth() === this.selectedDate.getMonth() &&
        date.getFullYear() === this.selectedDate.getFullYear();
    };

    this.isSelectedMonth = function(month) {
      return month === this.selectedDate.getMonth();
    };

    this.isSelectedYear = function(year) {
      return year === this.selectedDate.getFullYear();
    };

    this.changeType = function(val) {
      type = val;
    };

    this.show = function(val) {
      return type === val;
    };

    this.selectDate = function (date) {
      this.selectedDate = date;
    };

    this.selectMonth = function(month) {
      this.selectedDate.setMonth(month);
      if (this.selectedDate.getMonth() !== month) {
        this.selectedDate.setDate(0);
      }
      this.createDateList(this.selectedDate);
      this.changeType('date');
    };

    this.selectYear = function(year) {
      this.selectedDate.setFullYear(year);
      this.createDateList(this.selectedDate);
      this.changeType('date');
    };

    this.createDateList = function(selectedDate) {

      this.dateList = DatepickerService.createDateList(selectedDate);

      this.cols = new Array(7);
      this.rows = new Array(parseInt(this.dateList.length / this.cols.length) + 1);
    };

  }]);
})();

(function() {

  'use strict';

  angular.module('ionic-datepicker')
  .directive('ionicDatepicker', ['$ionicPopup', function ($ionicPopup) {

    return {
      restrict: 'E',
      replace: true,
      controller: 'DatepickerController',
      controllerAs: 'datepickerCtrl',
      scope: {
        date: '=date',
        callback: '=callback'
      },
      link: function (scope, element, attrs) {

        var ctrl = scope.datepickerCtrl;

        var popupOpts = {
          templateUrl: 'template.html',
          scope: scope,
          buttons: [{
            text: 'CANCEL',
            type: 'button-clear col-offset-33',
            onTap: function (e) {
              ctrl.selectedDate = angular.copy(scope.date || new Date());
              scope.callback(undefined);
            }
          },
          {
            text: 'OK',
            type: 'button-clear color-balanced-light',
            onTap: function (e) {

              ctrl.selectedDate.setHours(0);
              ctrl.selectedDate.setMinutes(0);
              ctrl.selectedDate.setSeconds(0);
              ctrl.selectedDate.setMilliseconds(0);

              scope.date = angular.copy(ctrl.selectedDate);
              scope.callback(scope.date);
            }
          }]
        };

        element.on('click', function() {
          ctrl.createDateList(angular.copy(scope.date || new Date()));
          $ionicPopup.show(popupOpts);
        });
      }
    }
  }]);
})();

(function() {

  'use strict';

  angular.module('ionic-datepicker')
  .service('DatepickerService', function () {

    var locale = window.navigator.userLanguage || window.navigator.language;

    this.getDaysOfWeek = function() {
      var today     = new Date()
        , days      = []
        , firstDay  = today.getDate() - today.getDay()
        , lastDay   = firstDay + 6;
      for (var i = firstDay; i <= lastDay; i++) {
        today.setDate(i);
        days.push(today.toLocaleString(locale, { weekday: 'long' }));
      }
      return days;
    };

    this.getMonths = function() {
      var today   = new Date()
        , months  = [];
      for (var i = 0; i < 12; i++) {
        today.setDate(1);
        today.setMonth(i);
        months.push(today.toLocaleString(locale, { month: 'long' }));
      }
      return months;
    };

    this.getYears = function() {
      var years = [];
      for (var i = 1900; i < 2101; i++) years.push(i);
      return years;
    };

    this.createDateList = function(currentDate) {

      var firstDay  = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate()
        , lastDay   = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
        , dateList  = [];

      for (var i = firstDay; i <= lastDay; i++) {
        dateList.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
      }

      firstDay = dateList[0].getDay();
      for (var i = 0; i < firstDay; i++) {
        dateList.unshift(undefined);
      }
      return dateList;
    };
  });
})();
