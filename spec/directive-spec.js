'use strict';

describe('DatepickerDirectiveSpec', function() {

  var elm
    , scope
    , controller;

  beforeEach(module('ionic-datepicker'));
  beforeEach(module('ionic-datepicker.templates'));

  beforeEach(inject(function(ionicDatepickerDirective) {
    ionicDatepickerDirective[0].controller = function() {
      this.show = function() {};
      controller = this;
    };
  }));

  function compileDirective(tpl) {

    if (!tpl) tpl = '<ionic-datepicker date="currentDate" callback="callback"></ionic-datepicker>';
    inject(function($rootScope, $compile) {
      scope = $rootScope.$new();
      elm = $compile(tpl)(scope);
    });
    scope.$digest();
  }

  describe('when element is clicked', function() {

    beforeEach(function() {
      compileDirective();
    });

    it('should show Popup', function() {
      var spy = sinon.spy(controller, 'show');
      elm.triggerHandler('click');
      expect(spy).to.have.been.called;
    });
  });
});
