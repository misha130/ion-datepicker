(function() {

  'use strict';

  angular
  .module('ionic-datepicker')
  .directive('ionicDatepicker', [ '$ionicModal', function ($ionicModal) {

    return {
      restrict: 'E',
      replace: true,
      controller: 'DatepickerCtrl',
      controllerAs: 'datepickerCtrl',
      scope: {
        date: '=',
        min: '=',
        max: '=',
        callback: '='
      },
      link: function (scope, element, attrs, controller) {

        var scroll = function(el) {
          var $$container = $(el)
            , $$element   = $(el + ' .datepicker-selected')
            , offset      = $$element.offset().top + $$container.scrollTop() - $$container.offset().top - ($$container.height() / 2);
          if (offset === 0) return;
          $$container.animate({ scrollTop: offset });
        };

        scope.show = function(modal) {

          scope.modal = modal;
          controller.initialize();
          scope.modal.show();

          $('.datepicker-month-js').on('click', function() { scroll('.datepicker-month-content-js'); });
          $('.datepicker-year-js').on('click', function() { scroll('.datepicker-year-content-js'); });
          $('.datepicker-cancel-js').on('click', scope.onCancel);
          $('.datepicker-ok-js').on('click', scope.onDone);
        };

        scope.onCancel = function() {
          controller.onCancel();
          scope.modal.remove();
        };

        scope.onDone = function() {
          controller.onDone();
          scope.modal.remove();
        };

        scope.onDirectiveClick = function() {

          $ionicModal
          .fromTemplateUrl('template.html', { scope: scope, hideDelay: 1 })
          .then(scope.show);
        };

        element.on('click', scope.onDirectiveClick);
      }
    };
  }]);
})();
