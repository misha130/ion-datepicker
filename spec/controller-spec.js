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
      expect(controller.getDaysOfWeek()).to.be.ok;
    });

    it('should have months defined', function() {
      expect(controller.getMonths()).to.be.ok;
    });

    it('should have years defined', function() {
      expect(controller.getYears()).to.be.ok;
    });
  });

  describe('validate actual date', function() {

    it('isActualDate should be true', function() {
      expect(controller.isActualDate(today)).to.be.true;
    });

    it('isActualMonth should be true', function() {
      expect(controller.isActualMonth(today.getMonth())).to.be.true;
    });

    it('isActualYear should be true', function() {
      expect(controller.isActualYear(today.getFullYear())).to.be.true;
    });

    describe('when do NOT pass date', function() {

      it('selectedDate should be equals today', function() {
        expect(controller.selectedDate.getDate()).to.be.eq(today.getDate());
        expect(controller.selectedDate.getMonth()).to.be.eq(today.getMonth());
        expect(controller.selectedDate.getFullYear()).to.be.eq(today.getFullYear());
      });

      it('isSelectedDate() should be true', function() {
        expect(controller.isSelectedDate(today)).to.be.true;
      });

      it('isSelectedMonth() should be true', function() {
        expect(controller.isSelectedMonth(today.getMonth())).to.be.true;
      });

      it('isSelectedYear() should be true', function() {
        expect(controller.isSelectedYear(today.getFullYear())).to.be.true;
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

      it('isSelectedDate() should be equals specifc date', function() {
        expect(controller.isSelectedDate(date)).to.be.true;
      });

      it('isSelectedMonth() should be true', function() {
        expect(controller.isSelectedMonth(date.getMonth())).to.be.true;
      });

      it('isSelectedYear() should be true', function() {
        expect(controller.isSelectedYear(date.getFullYear())).to.be.true;
      });
    });
  });

  describe('#show', function() {

    it('should have initialize with date', function() {
      expect(controller.show('date')).to.be.true;
    });

    it('should show month', function() {
      controller.changeType('month');
      expect(controller.show('month')).to.be.true;
    });

    it('should show year', function() {
      controller.changeType('year');
      expect(controller.show('year')).to.be.true;
    });

    it('should show date', function() {
      controller.changeType('date');
      expect(controller.show('date')).to.be.true;
    });
  });

  describe('', function() {

    var spy;
    beforeEach(function() {
      spy = sinon.spy(controller, 'createDateList');
    });

    it('#selectDate', function() {
      var date = new Date(1987, 9, 5);
      controller.selectDate(date);
      expect(controller.selectedDate.getDate()).to.be.eq(date.getDate());
      expect(controller.selectedDate.getMonth()).to.be.eq(date.getMonth());
      expect(controller.selectedDate.getFullYear()).to.be.eq(date.getFullYear());
    });

    it('#selectMonth when it is first day of month', function() {
      controller.selectedDate.setDate(1);
      controller.selectMonth(0);
      expect(spy).to.have.been.called;
      expect(controller.selectedDate.getMonth()).to.be.eq(0);
      expect(controller.show('date')).to.be.true;
    });

    it('#selectMonth when it is last day of month', function() {
      controller.selectedDate = new Date(2015, 6, 31);
      controller.selectMonth(1);
      expect(spy).to.have.been.called;
      expect(controller.selectedDate.getDate()).to.be.eq(28);
      expect(controller.selectedDate.getMonth()).to.be.eq(1);
      expect(controller.show('date')).to.be.true;
    });

    it('#selectYear', function() {
      controller.selectYear(0);
      expect(spy).to.have.been.called;
      expect(controller.selectedDate.getFullYear()).to.be.eq(0);
      expect(controller.show('date')).to.be.true;
    });

    it('#createDateList', function() {
      var date = new Date(2015, 6, 1);
      var spyService = sinon.spy(DatepickerService, 'createDateList');
      controller.createDateList(date);
      expect(spyService).to.have.been.calledWith(date);
      expect(controller.cols.length).to.eq(7);
      expect(controller.rows.length).to.eq(5);
    });
  });
});
