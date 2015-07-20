(function(module) {

  'use strict';
  module = angular.module('ionic-datepicker', [ 'ionic', 'ionic-datepicker.templates' ]);
})();

(function(module) {

  'use strict';

  angular.module('ionic-datepicker')
  .controller('DatepickerController', [ '$scope', 'DatepickerService', function ($scope, DatepickerService) {

    var self  = this
      , type  = 'date'
      , today = new Date();

    $scope.currentDate = new Date();
    $scope.selectedDate = new Date();

    $scope.daysOfWeek = DatepickerService.daysOfWeek;
    $scope.months = DatepickerService.months;
    $scope.years = DatepickerService.years;

    if ($scope.date) {
      $scope.selectedDate = angular.copy($scope.date);
      $scope.currentDate = angular.copy($scope.date);
    }

    $scope.isActualDate = function(date) {
      if (!date) return false;
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    };

    $scope.isActualMonth = function(month) {
      return month === today.getMonth();
    };

    $scope.isActualYear = function(year) {
      return year === today.getFullYear();
    };

    $scope.isSelectedDate = function(date) {
      if (!date) return false;
      return date.getDate() === $scope.selectedDate.getDate() &&
        date.getMonth() === $scope.selectedDate.getMonth() &&
        date.getFullYear() === $scope.selectedDate.getFullYear();
    };

    $scope.isSelectedMonth = function(month) {
      return month === $scope.selectedDate.getMonth();
    };

    $scope.isSelectedYear = function(year) {
      return year === $scope.selectedDate.getFullYear();
    };

    $scope.change = function(val) {
      type = val;
    };

    $scope.show = function(val) {
      return type === val;
    };

    $scope.selectDate = function (date) {
      $scope.currentDate = date;
    };

    $scope.changeMonth = function(month) {
      $scope.selectedDate.setMonth(month);
      self.createDateList($scope.selectedDate);
      $scope.change('date');
    };

    $scope.changeYear = function(year) {
      $scope.selectedDate.setFullYear(year);
      self.createDateList($scope.selectedDate);
      $scope.change('date');
    };

    this.createDateList = function(currentDate) {

      $scope.dateList = DatepickerService.createDateList(currentDate);

      $scope.numColumns = 7;
      $scope.rows = new Array(parseInt($scope.dateList.length / $scope.numColumns) + 1);
      $scope.cols = new Array($scope.numColumns);
    };

  }]);
})();

(function(module) {

  'use strict';

  angular.module('ionic-datepicker')
  .directive('ionicDatepicker', ['$ionicPopup', function ($ionicPopup) {

    return {
      restrict: 'E',
      replace: true,
      controller: 'DatepickerController',
      controllerAs: 'DatepickerCtrl',
      scope: {
        date: '=date',
        callback: '=callback'
      },
      link: function (scope, element, attrs) {

        var controller = scope.DatepickerCtrl;

        element.on('click', function () {
          if (!scope.date) {
            controller.createDateList(new Date());
          } else {
            controller.createDateList(angular.copy(scope.date));
          }

          $ionicPopup.show({
            templateUrl: 'template.html',
            scope: scope,
            buttons: [{
              text: 'CANCEL',
              type: 'button-clear col-offset-33',
              onTap: function (e) {
                scope.callback(undefined);
              }
            },
            {
              text: 'OK',
              type: 'button-clear color-balanced-light',
              onTap: function (e) {

                scope.currentDate.setHours(0);
                scope.currentDate.setMinutes(0);
                scope.currentDate.setSeconds(0);
                scope.currentDate.setMilliseconds(0);

                scope.date = angular.copy(scope.currentDate);
                scope.callback(scope.date);
              }
            }]
          });
        });
      }
    };
  }]);
})();

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
