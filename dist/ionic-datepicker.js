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

(function() {

  'use strict';

  angular
  .module('ionic-datepicker')
  .service('DatepickerNls', function () {

    var nls = {
      'en-us': {
        weekdays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
      },
      'pt-br': {
        weekdays: [ 'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado' ],
        months: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
      }
    };

    this.getWeekdays = function(locale) {
      return this._getNls(locale).weekdays;
    };

    this.getMonths = function(locale) {
      return this._getNls(locale).months;
    };

    this._getNls = function(locale) {
      return nls[locale] || nls['en-us'];
    };

  });

})();

(function() {

  'use strict';

  angular.module('ionic-datepicker')
  .service('DatepickerService', [ 'DatepickerNls', function (DatepickerNls) {

    var locale = window.navigator.userLanguage || window.navigator.language;
    locale = locale.toLowerCase();

    this.getDaysOfWeek = function() {
      return DatepickerNls.getWeekdays(locale);
    };

    this.getMonths = function() {
      return DatepickerNls.getMonths(locale);
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
  }]);
})();
