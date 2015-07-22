'use strict';

describe('DatepickerDirectiveSpec', function() {

  var elm
    , scope
    , $ionicPopup;

  beforeEach(module('ionic-datepicker'));
  beforeEach(module('ionic-datepicker.templates'));

  beforeEach(inject(function(_$ionicPopup_) {
    compileDirective();
    $ionicPopup = _$ionicPopup_;
  }));

  function compileDirective(tpl) {

    if (!tpl) tpl = '<ionic-datepicker date="currentDate" callback="callback"></ionic-datepicker>';
    inject(function($rootScope, $compile) {
      scope = $rootScope.$new();
      elm = $compile(tpl)(scope);
    });
    scope.$digest();
    scope = elm.isolateScope();
  }

  describe('', function() {

    beforeEach(function() {
      compileDirective();
    });

    it('should show Popup', function() {
      var spy = sinon.spy($ionicPopup, 'show');
      elm.triggerHandler('click');
      expect(spy).to.have.been.called;
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

  });
});
