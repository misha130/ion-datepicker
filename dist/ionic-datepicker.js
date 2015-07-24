(function() {

  'use strict';
  angular.module('ionic-datepicker', [ 'ionic', 'ionic-datepicker.templates' ]);
})();

(function() {

  'use strict';

  angular
  .module('ionic-datepicker')
  .controller('DatepickerCtrl', [ '$scope', 'DatepickerService', function ($scope, DatepickerService) {

    var type  = 'date'
      , today = new Date();

    this.selectedDate = new Date();

    this.getDaysOfWeek = DatepickerService.getDaysOfWeek;
    this.getMonths = DatepickerService.getMonths;
    this.getYears = DatepickerService.getYears;

    if ($scope.date) {
      this.selectedDate = angular.copy($scope.date);
    }

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
      return month === this.selectedDate.getMonth();
    };

    this.isSelectedYear = function(year) {
      return year === this.selectedDate.getFullYear();
    };

    this.changeType = function(val) {
      type = val;
    };

    this.showType = function(val) {
      return type === val;
    };

    this.selectDate = function (date) {
      this.selectedDate = date;

      this.selectedDate.setHours(0);
      this.selectedDate.setMinutes(0);
      this.selectedDate.setSeconds(0);
      this.selectedDate.setMilliseconds(0);
    };

    this.selectMonth = function(month) {
      this.selectedDate.setMonth(month);
      if (this.selectedDate.getMonth() !== month) {
        this.selectedDate.setDate(0);
      }
      this.createDateList(this.selectedDate);
      this.changeType('date');
    };

    this.selectYear = function(year) {
      this.selectedDate.setFullYear(year);
      this.createDateList(this.selectedDate);
      this.changeType('date');
    };

    this.createDateList = function(selectedDate) {
      this.dateList = DatepickerService.createDateList(selectedDate);
      this.cols = new Array(7);
      this.rows = new Array(parseInt(this.dateList.length / this.cols.length) + 1);
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

          controller.createDateList(angular.copy(scope.date || new Date()));

          $ionicModal
          .fromTemplateUrl('template.html', { scope: scope })
          .then(scope.show);
        };

        element.on('click', scope.onDirectiveClick);
      }
    };
  }]);
})();

(function() {

  'use strict';

  angular.module('ionic-datepicker')
  .service('DatepickerService', function () {

    var locale = window.navigator.userLanguage || window.navigator.language;

    this.getDaysOfWeek = function() {
      var today     = new Date()
        , days      = []
        , firstDay  = today.getDate() - today.getDay()
        , lastDay   = firstDay + 6;
      for (var i = firstDay; i <= lastDay; i++) {
        today.setDate(i);
        days.push(today.toLocaleString(locale, { weekday: 'long' }));
      }
      return days;
    };

    this.getMonths = function() {
      var today   = new Date()
        , months  = [];
      for (var i = 0; i < 12; i++) {
        today.setDate(1);
        today.setMonth(i);
        months.push(today.toLocaleString(locale, { month: 'long' }));
      }
      return months;
    };

    this.getYears = function() {
      var years = [];
      for (var i = 1900; i < 2101; i++) years.push(i);
      return years;
    };

    this.createDateList = function(currentDate) {

      var firstDay  = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate()
        , lastDay   = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
        , dateList  = [];

      for (var i = firstDay; i <= lastDay; i++) {
        dateList.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
      }

      firstDay = dateList[0].getDay();
      for (var j = 0; j < firstDay; j++) {
        dateList.unshift(undefined);
      }
      return dateList;
    };
  });
})();
