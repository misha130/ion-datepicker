(function() {

  'use strict';

  angular
  .module('ionic-datepicker')
  .controller('DatepickerCtrl', [ '$scope', 'DatepickerService', function ($scope, DatepickerService) {

    var type  = 'date'
      , today = new Date();

    this.getDaysOfWeek = function() {
      if (!this.weekdays) {
        this.weekdays = DatepickerService.getDaysOfWeek();
      }
      return this.weekdays;
    };

    this.getMonths = function() {
      if (!this.months) {
        this.months = DatepickerService.getMonths();
      }
      return this.months;
    };

    this.getYears = DatepickerService.getYears;

    this.initialize = function() {

      this.selectedDate = angular.copy($scope.date || new Date());
      this.tempDate = angular.copy(this.selectedDate);

      this.createDateList(this.selectedDate);
    };

    this.getDate = function(row, col) {
      return this.dateList[row * 7 + col];
    };

    this.isDefined = function(date) {
      return date !== undefined;
    };

    this.isDisabled = function(date) {
      if (!date) return true;
      if ($scope.min) {
        $scope.min.setHours(0, 0, 0, 0);
        if (date < $scope.min) return true;
      }
      if ($scope.max) {
        $scope.max.setHours(0, 0, 0, 0);
        if (date > $scope.max) return true;
      }
      return false;
    };

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
      return month === this.tempDate.getMonth();
    };

    this.isSelectedYear = function(year) {
      return year === this.tempDate.getFullYear();
    };

    this.changeType = function(val) {
      type = val;
    };

    this.showType = function(val) {
      return type === val;
    };

    this.selectDate = function (date) {
      if (this.isDisabled(date)) return;
      this.selectedDate = angular.copy(date);
      this.selectedDate.setHours(0, 0, 0, 0);
      this.tempDate = angular.copy(this.selectedDate);
    };

    this.selectMonth = function(month) {
      this.tempDate = angular.copy(this.tempDate);
      this.tempDate.setMonth(month);
      if (this.tempDate.getMonth() !== month) {
        this.tempDate.setDate(0);
      }
      this._selectMonthOrYear();
    };

    this.selectYear = function(year) {
      this.tempDate = angular.copy(this.tempDate);
      this.tempDate.setFullYear(year);
      this._selectMonthOrYear();
    };

    this._selectMonthOrYear = function() {
      this.changeType('date');
      this.createDateList(this.tempDate);
      if (this.isDisabled(this.tempDate)) return;
      this.selectedDate = this.tempDate;
    };

    this.createDateList = function(selectedDate) {
      this.dateList = DatepickerService.createDateList(selectedDate);
      this.cols = new Array(7);
      this.rows = new Array(parseInt(this.dateList.length / this.cols.length) + 1);
    };

    this.getSelectedWeekday = function() {
      if (!this.weekdays) this.getDaysOfWeek();
      return this.weekdays[this.selectedDate.getDay()];
    };

    this.getSelectedMonth = function() {
      if (!this.months) this.getMonths();
      return this.months[this.selectedDate.getMonth()];
    };

    this.getTempMonth = function() {
      if (!this.months) this.getMonths();
      return this.months[this.tempDate.getMonth()];
    };

    this.onCancel = function(e) {
      this.selectedDate = angular.copy($scope.date || new Date());
      $scope.callback(undefined);
    };

    this.onDone = function(e) {
      $scope.date = angular.copy(this.selectedDate);
      $scope.callback($scope.date);
    };

  }]);
})();
