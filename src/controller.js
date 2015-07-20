(function() {

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

    $scope.selectMonth = function(month) {
      $scope.selectedDate.setMonth(month);
      self.createDateList($scope.selectedDate);
      $scope.change('date');
    };

    $scope.selectYear = function(year) {
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
