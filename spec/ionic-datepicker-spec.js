'use strict';

describe('ionicDatepickerSpec', function() {

  var elm
    , scope;

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

  describe('#link', function() {

    describe('when do not pass date to datepicker', function() {

      beforeEach(function() {
        compileDirective();
      });

      it('should have currentMonth equals today\'s month', function() {
        expect(scope.currentMonth).to.equals(new Date().getMonth());
      });

      it('should have currentYear equals today\'s year', function() {
        expect(scope.currentYear).to.equals(new Date().getFullYear());
      });
    });

    describe('when pass date to datepicker', function() {

      beforeEach(function() {
        scope.date = new Date(1982, 0, 28);
        var tpl = '<ionic-datepicker date="date" callback="callback"></ionic-datepicker>';
        compileDirective(tpl);
      });

      it('should have currentMonth equals January', function() {
        expect(scope.currentMonth).to.equals(0);
      });

      it('should have currentYear equals 1982', function() {
        expect(scope.currentYear).to.equals(1982);
      });
    });
  });
});
