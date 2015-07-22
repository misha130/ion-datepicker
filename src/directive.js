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
