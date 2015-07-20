'use strict';

describe('ionicDatepickerSpec', function() {

  var elm
    , $controller
    , scope
    , today = new Date();

  beforeEach(module('ionic-datepicker'));
  beforeEach(module('ionic-datepicker.templates'));

  beforeEach(inject(function(_$controller_, $rootScope) {
    $controller = _$controller_;
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

    it('$scope#isSelectedDate() should be true', function() {
      expect(scope.isSelectedDate(today)).to.be.true;
    });

    it('$scope#isSelectedMonth() should be true', function() {
      expect(scope.isSelectedMonth(today.getMonth())).to.be.true;
    });

    it('$scope#isSelectedYear() should be true', function() {
      expect(scope.isSelectedYear(today.getFullYear())).to.be.true;
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

    it('$scope#isSelectedDate() should be equals specifc date', function() {
      expect(scope.isSelectedDate(date)).to.be.true;
    });

    it('$scope#isSelectedMonth() should be true', function() {
      expect(scope.isSelectedMonth(date.getMonth())).to.be.true;
    });

    it('$scope#isSelectedYear() should be true', function() {
      expect(scope.isSelectedYear(date.getFullYear())).to.be.true;
    });
  });

  describe('#show', function() {

    beforeEach(function() {
      compileDirective();
    });

    it('should have initialize with date', function() {
      expect(scope.show('date')).to.be.true;
    });

    it('should show month', function() {
      scope.change('month');
      expect(scope.show('month')).to.be.true;
    });

    it('should show year', function() {
      scope.change('year');
      expect(scope.show('year')).to.be.true;
    });

    it('should show date', function() {
      scope.change('date');
      expect(scope.show('date')).to.be.true;
    });
  });

  describe('', function() {

    var controller
      , spy;

    beforeEach(function() {
      compileDirective();

      controller = $controller('DatepickerController', { $scope: scope });
      spy = sinon.spy(controller, 'createDateList');
    });

    it('#selectDate', function() {
      var date = new Date(1987, 9, 5);
      scope.selectDate(date);
      expect(scope.currentDate.getDate()).to.be.eq(date.getDate());
      expect(scope.currentDate.getMonth()).to.be.eq(date.getMonth());
      expect(scope.currentDate.getFullYear()).to.be.eq(date.getFullYear());
    });

    it('#selectMonth', function() {
      scope.selectMonth(0);
      expect(spy).to.have.been.called;
      expect(scope.selectedDate.getMonth()).to.be.eq(0);
      expect(scope.show('date')).to.be.true;
    });

    it('#selectYear', function() {
      scope.selectYear(0);
      expect(spy).to.have.been.called;
      expect(scope.selectedDate.getFullYear()).to.be.eq(0);
      expect(scope.show('date')).to.be.true;
    });
  });
});
