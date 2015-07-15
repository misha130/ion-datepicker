'use strict';

app
.controller('DatepickerController', ['$scope', 'DatepickerService', function ($scope, DatepickerService) {

  var self  = this
    , type  = 'date'
    , today = new Date();

  $scope.daysOfWeek = DatepickerService.daysOfWeek;
  $scope.years = DatepickerService.years;

  $scope.selectedDate = new Date();
  if ($scope.date) $scope.selectedDate = $scope.date;

  $scope.isCurrentDate = function(date) {
    if (!date) return false;
    return
      date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear();
  };

  $scope.isCurrentYear = function(year) {
    if (!year) return false;
    return year === today.getFullYear();
  };

  $scope.isSelectedDate = function(date) {
    if (!date || !$scope.selectedDate) return false;
    return
      date.getDate() === $scope.selectedDate.getDate()
      && date.getMonth() === $scope.selectedDate.getMonth()
      && date.getFullYear() === $scope.selectedDate.getFullYear();
  };

  $scope.isSelectedYear = function(year) {
    if (!year || !$scope.selectedDate) return false;
    return year === $scope.selectedDate.getFullYear();
  };

  $scope.change = function(changedType) {
    type = changedType;
  };

  $scope.show = function(showType) {
    return type === showType;
  };

  $scope.selectDate = function (date) {
    $scope.selectedDate = date;
  };

  $scope.changeYear = function(year) {
    $scope.selectedDate.setFullYear(year);
    self.refreshDateList($scope.selectedDate);
    $scope.change('date');
  };

  this.refreshDateList = function(currentDate) {

    $scope.selectedDate = angular.copy(currentDate);

    var firstDay  = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate()
      , lastDay   = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    $scope.dayList = [];
    for (var i = firstDay; i <= lastDay; i++) {
      var tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      $scope.dayList.push(tempDate);
    }

    var firstDay = $scope.dayList[0].getDay();
    for (var j = 0; j < firstDay; j++) {
      $scope.dayList.unshift(undefined);
    }

    $scope.numColumns = $scope.daysOfWeek.length;
    $scope.rows = new Array(parseInt($scope.dayList.length / $scope.numColumns) + 1);
    $scope.cols = new Array($scope.numColumns);
  };

}]);
