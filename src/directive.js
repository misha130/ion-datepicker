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
