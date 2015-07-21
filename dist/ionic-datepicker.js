(function() {

  'use strict';
  angular.module('ionic-datepicker', [ 'ionic', 'ionic-datepicker.templates' ]);
})();

(function() {

  'use strict';

  angular.module('ionic-datepicker')
  .controller('DatepickerController', [ '$scope', 'DatepickerService', function ($scope, DatepickerService) {

    var self  = this
      , type  = 'date'
      , today = new Date();

    $scope.selectedDate = new Date();

    $scope.daysOfWeek = DatepickerService.getDaysOfWeek();
    $scope.months = DatepickerService.getMonths();
    $scope.years = DatepickerService.getYears();

    if ($scope.date) {
      $scope.selectedDate = angular.copy($scope.date);
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

    $scope.changeType = function(val) {
      type = val;
    };

    $scope.show = function(val) {
      return type === val;
    };

    $scope.selectDate = function (date) {
      $scope.selectedDate = date;
    };

    $scope.selectMonth = function(month) {
      $scope.selectedDate.setMonth(month);
      if ($scope.selectedDate.getMonth() !== month) {
        $scope.selectedDate.setDate(0);
      }
      self.createDateList($scope.selectedDate);
      $scope.changeType('date');
    };

    $scope.selectYear = function(year) {
      $scope.selectedDate.setFullYear(year);
      self.createDateList($scope.selectedDate);
      $scope.changeType('date');
    };

    this.createDateList = function(selectedDate) {

      $scope.dateList = DatepickerService.createDateList(selectedDate);

      $scope.cols = new Array(7);
      $scope.rows = new Array(parseInt($scope.dateList.length / $scope.cols.length) + 1);
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
                scope.selectedDate = angular.copy(scope.date || new Date());
                scope.callback(undefined);
              }
            },
            {
              text: 'OK',
              type: 'button-clear color-balanced-light',
              onTap: function (e) {

                scope.selectedDate.setHours(0);
                scope.selectedDate.setMinutes(0);
                scope.selectedDate.setSeconds(0);
                scope.selectedDate.setMilliseconds(0);

                scope.date = angular.copy(scope.selectedDate);
                scope.callback(scope.date);
              }
            }]
          });
        });
      }
    };
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
        var tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        dateList.push(tempDate);
      }

      firstDay = dateList[0].getDay();
      for (var j = 0; j < firstDay; j++) {
        dateList.unshift(undefined);
      }
      return dateList;
    };
  });
})();
