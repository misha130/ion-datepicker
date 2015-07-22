(function() {

  'use strict';

  angular
  .module('ionic-datepicker')
  .directive('ionicDatepicker', function () {

    return {
      restrict: 'E',
      replace: true,
      controller: 'DatepickerCtrl',
      controllerAs: 'datepickerCtrl',
      scope: {
        date: '=date',
        callback: '=callback'
      },
      link: function (scope, element, attrs, controller) {
        element.on('click', function() {
          controller.show();
        });
      }
    }
  });
})();
