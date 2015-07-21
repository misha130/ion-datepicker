'use strict';

describe('DatepickerControllerSpec', function() {

  var controller
    , DatepickerService
    , scope
    , today = new Date();

  beforeEach(module('ionic-datepicker'));

  beforeEach(inject(function(_$controller_, _DatepickerService_,  $rootScope) {
    scope = $rootScope.$new();
    controller = _$controller_('DatepickerController', {
      $scope: scope,
      DatepickerService: _DatepickerService_
    });
    DatepickerService = _DatepickerService_;
  }));

  describe('initialize', function() {

    it('should have daysOfWeek defined', function() {
      expect(scope.daysOfWeek).to.be.ok;
    });

    it('should have months defined', function() {
      expect(scope.months).to.be.ok;
    });

    it('should have years defined', function() {
      expect(scope.years).to.be.ok;
    });
  });

  describe('validate actual date', function() {

    it('$scope#isActualDate should be true', function() {
      expect(scope.isActualDate(today)).to.be.true;
    });

    it('$scope#isActualMonth should be true', function() {
      expect(scope.isActualMonth(today.getMonth())).to.be.true;
    });

    it('$scope#isActualYear should be true', function() {
      expect(scope.isActualYear(today.getFullYear())).to.be.true;
    });

    describe('when do NOT pass date', function() {

      it('selectedDate should be equals today', function() {
        expect(scope.selectedDate.getDate()).to.be.eq(today.getDate());
        expect(scope.selectedDate.getMonth()).to.be.eq(today.getMonth());
        expect(scope.selectedDate.getFullYear()).to.be.eq(today.getFullYear());
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
      beforeEach(inject(function(_$controller_, _DatepickerService_, $rootScope) {
        date = new Date(1982, 0, 28);
        scope = $rootScope.$new();
        scope.date = date;
        controller = _$controller_('DatepickerController', {
          $scope: scope,
          DatepickerService: _DatepickerService_
        });
      }));

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
  });

  describe('#show', function() {

    it('should have initialize with date', function() {
      expect(scope.show('date')).to.be.true;
    });

    it('should show month', function() {
      scope.changeType('month');
      expect(scope.show('month')).to.be.true;
    });

    it('should show year', function() {
      scope.changeType('year');
      expect(scope.show('year')).to.be.true;
    });

    it('should show date', function() {
      scope.changeType('date');
      expect(scope.show('date')).to.be.true;
    });
  });

  describe('', function() {

    var spy;
    beforeEach(function() {
      spy = sinon.spy(controller, 'createDateList');
    });

    it('#selectDate', function() {
      var date = new Date(1987, 9, 5);
      scope.selectDate(date);
      expect(scope.selectedDate.getDate()).to.be.eq(date.getDate());
      expect(scope.selectedDate.getMonth()).to.be.eq(date.getMonth());
      expect(scope.selectedDate.getFullYear()).to.be.eq(date.getFullYear());
    });

    it('#selectMonth when it is first day of month', function() {
      scope.selectedDate.setDate(1);
      scope.selectMonth(0);
      expect(spy).to.have.been.called;
      expect(scope.selectedDate.getMonth()).to.be.eq(0);
      expect(scope.show('date')).to.be.true;
    });

    it('#selectMonth when it is last day of month', function() {
      scope.selectedDate = new Date(2015, 6, 31);
      scope.selectMonth(1);
      expect(spy).to.have.been.called;
      expect(scope.selectedDate.getDate()).to.be.eq(28);
      expect(scope.selectedDate.getMonth()).to.be.eq(1);
      expect(scope.show('date')).to.be.true;
    });

    it('#selectYear', function() {
      scope.selectYear(0);
      expect(spy).to.have.been.called;
      expect(scope.selectedDate.getFullYear()).to.be.eq(0);
      expect(scope.show('date')).to.be.true;
    });

    it('#createDateList', function() {
      var date = new Date(2015, 6, 1);
      var spyService = sinon.spy(DatepickerService, 'createDateList');
      controller.createDateList(date);
      expect(spyService).to.have.been.calledWith(date);
      expect(scope.cols.length).to.eq(7);
      expect(scope.rows.length).to.eq(5);
    });
  });
});
