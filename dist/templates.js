(function(module) {
try {
  module = angular.module('ionic-datepicker.templates');
} catch (e) {
  module = angular.module('ionic-datepicker.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('date-picker-modal.html',
    '<div class="bar bar-header bar-balanced"><div class=title>{{selectedDate | date: \'EEEE\'}}</div></div><div class="row center balanced-light"><div class=col><div class=month ng-click="changeType(\'month\')">{{selectedDate | date: \'MMM\' | uppercase}}</div><div class=day-of-month ng-click="changeType(\'date\')">{{selectedDate | date: \'dd\'}}</div><div class=year ng-click="changeType(\'year\')">{{selectedDate | date: \'yyyy\'}}</div></div></div><div class=content ng-show="type === \'date\'"><div class="row center"><div class="col bold" ng-repeat="dayOfWeek in daysOfWeek track by $index">{{dayOfWeek}}</div></div><div class="row center" ng-repeat="row in rows track by $index"><div class="col no-padding" ng-repeat="col in cols track by $index" ng-class="{\'date-col\': (dayList[$parent.$index * numColumns + $index] != undefined), \'selected\': isSelectedDate(dayList[$parent.$index * numColumns + $index]), \'current\' : isCurrentDate(dayList[$parent.$index * numColumns + $index]) }"><div class=date-cell ng-click="selectDate(dayList[$parent.$index * numColumns + $index])">{{ dayList[$parent.$index * numColumns + $index] | date: \'d\' }}</div></div></div></div><div class=content ng-show="type === \'year\'"><div class="row center" ng-repeat="year in years track by $index"><div class=col ng-class="{ \'selected\': isSelectedYear(year), \'current\': isCurrentYear(year) }" ng-click=changeYear(year)>{{year}}</div></div></div>');
}]);
})();
