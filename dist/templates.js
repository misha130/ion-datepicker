(function(module) {
try {
  module = angular.module('ionic-datepicker.templates');
} catch (e) {
  module = angular.module('ionic-datepicker.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template.html',
    '<div class="bar bar-header bar-balanced"><div class=title>{{selectedDate | date: \'EEEE\'}}</div></div><div class="row center balanced-light"><div class=col><div class=month ng-click="changeType(\'month\')">{{selectedDate | date: \'MMM\' | uppercase}}</div><div class=day-of-month ng-click="changeType(\'date\')">{{selectedDate | date: \'d\'}}</div><div class=year ng-click="changeType(\'year\')">{{selectedDate | date: \'yyyy\'}}</div></div></div><div class=content ng-show="show(\'month\')"><div class="row center" ng-repeat="month in months track by $index"><div class=col ng-class="{ \'selected\': isSelectedMonth($index), \'current\': isActualMonth($index) }" ng-click=selectMonth($index)>{{month | limitTo: 3}}</div></div></div><div class=content ng-show="show(\'date\')"><div class="row col center">{{selectedDate | date: \'MMMM yyyy\'}}</div><div class="row center"><div class="col bold" ng-repeat="dayOfWeek in daysOfWeek track by $index">{{dayOfWeek | limitTo: 1 | uppercase}}</div></div><div class="row center" ng-repeat="row in rows track by $index"><div class="col no-padding" ng-repeat="col in cols track by $index" ng-class="{\'date-col\': (dateList[$parent.$index * 7 + $index] != undefined), \'selected\': isSelectedDate(dateList[$parent.$index * 7 + $index]), \'current\' : isActualDate(dateList[$parent.$index * 7 + $index]) }"><div class=date-cell ng-click="selectDate(dateList[$parent.$index * 7 + $index])">{{ dateList[$parent.$index * 7 + $index] | date: \'d\' }}</div></div></div></div><div class=content ng-show="show(\'year\')"><div class="row center" ng-repeat="year in years track by $index"><div class=col ng-class="{ \'selected\': isSelectedYear(year), \'current\': isActualYear(year) }" ng-click=selectYear(year)>{{year}}</div></div></div>');
}]);
})();
