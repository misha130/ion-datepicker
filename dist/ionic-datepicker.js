'use strict';

angular
.module('ionic-datepicker', ['ionic', 'ionic-datepicker.templates'])
.service('DatepickerService', function () {

  this.daysOfWeek = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
  this.years = [];
  this.populateYears = function() {
    for (var i = 1900; i < 2101; i++) this.years.push(i);
  };
  this.populateYears();
})

.directive('ionicDatepicker', ['$ionicPopup', 'DatepickerService', function ($ionicPopup, DatepickerService) {

  return {
    restrict: 'AE',
    replace: true,
    scope: {
      date: '=date',
      callback: '=callback'
    },
    link: function (scope, element, attrs) {

      scope.daysOfWeek = DatepickerService.daysOfWeek;

      scope.selectedDate = new Date();
      if (scope.date) scope.selectedDate = scope.date;

      scope.today = new Date();
      scope.isToday = function(date) {
        if (!date) return false;
        return date.getDate() === scope.today.getDate()
          && date.getMonth() === scope.today.getMonth()
          && date.getFullYear() === scope.today.getFullYear();
      };

      scope.isSelected = function(date) {
        if (!date || !scope.selectedDate) return false;
        return date.getDate() === scope.selectedDate.getDate()
          && date.getMonth() === scope.selectedDate.getMonth()
          && date.getFullYear() === scope.selectedDate.getFullYear();
      };

      scope.selectDate = function (date) {
        scope.selectedDate = date;
      };

      var refreshDateList = function (currentDate) {

        scope.selectedDate = angular.copy(currentDate);

        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        scope.dayList = [];
        for (var i = firstDay; i <= lastDay; i++) {
          var tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
          scope.dayList.push(tempDate);
        }

        var firstDay = scope.dayList[0].getDay();
        for (var j = 0; j < firstDay; j++) {
          scope.dayList.unshift(undefined);
        }

        scope.cols = [];
        scope.rows = [];
        scope.numColumns = scope.daysOfWeek.length;
        scope.cols.length = scope.numColumns;
        scope.rows.length = parseInt(scope.dayList.length / scope.cols.length) + 1;
      };

      element.on('click', function () {
        if (!scope.date) {
          refreshDateList(new Date());
        } else {
          refreshDateList(angular.copy(scope.date));
        }

        $ionicPopup.show({
          templateUrl: 'date-picker-modal.html',
          scope: scope,
          buttons: [
            {
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

                scope.selectedDate.setHours(0);
                scope.selectedDate.setMinutes(0);
                scope.selectedDate.setSeconds(0);
                scope.selectedDate.setMilliseconds(0);

                scope.date = angular.copy(scope.selectedDate);
                scope.callback(scope.date);
              }
            }
          ]
        })
      })
    }
  }
}]);
