'use strict';

describe('ionicDatepickerSpec', function() {

  var elm
    , scope
    , today = new Date();

  beforeEach(module('ionic-datepicker'));
  beforeEach(module('ionic-datepicker.templates'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  function compileDirective(tpl) {

    if (!tpl) tpl = '<ionic-datepicker date="currentDate" callback="callback"></ionic-datepicker>';
    inject(function($rootScope, $compile) {
      elm = $compile(tpl)(scope);
    });
    scope.$apply();
    scope = elm.isolateScope();
  }

  describe('validate actual date', function() {

    beforeEach(function() {
      compileDirective();
    });

    it('$scope#isActualDate should be true', function() {
      expect(scope.isActualDate(today)).to.be.true;
    });

    it('$scope#isActualMonth should be true', function() {
      expect(scope.isActualMonth(today.getMonth())).to.be.true;
    });

    it('$scope#isActualYear should be true', function() {
      expect(scope.isActualYear(today.getFullYear())).to.be.true;
    });
  });

  describe('when do not pass date to datepicker', function() {

    beforeEach(function() {
      compileDirective();
    });

    it('$scope#currentDate should be equals today', function() {
      expect(scope.currentDate.getDate()).to.be.eq(today.getDate());
      expect(scope.currentDate.getMonth()).to.be.eq(today.getMonth());
      expect(scope.currentDate.getFullYear()).to.be.eq(today.getFullYear());
    });

    it('$scope#selectedDate should be equals today', function() {
      expect(scope.selectedDate.getDate()).to.be.eq(today.getDate());
      expect(scope.selectedDate.getMonth()).to.be.eq(today.getMonth());
      expect(scope.selectedDate.getFullYear()).to.be.eq(today.getFullYear());
    });
  });

  describe('when pass date to datepicker', function() {

    var date;
    beforeEach(function() {
      date = new Date(1982, 0, 28);
      scope.date = date;
      var tpl = '<ionic-datepicker date="date" callback="callback"></ionic-datepicker>';
      compileDirective(tpl);
    });

    it('$scope#currentDate should be equals specific date', function() {
      expect(scope.currentDate.getDate()).to.be.eq(date.getDate());
      expect(scope.currentDate.getMonth()).to.be.eq(date.getMonth());
      expect(scope.currentDate.getFullYear()).to.be.eq(date.getFullYear());
    });

    it('$scope#selectedDate should be equals specifc date', function() {
      expect(scope.selectedDate.getDate()).to.be.eq(date.getDate());
      expect(scope.selectedDate.getMonth()).to.be.eq(date.getMonth());
      expect(scope.selectedDate.getFullYear()).to.be.eq(date.getFullYear());
    });
  });
});
