'use strict';

describe('DatepickerCtrlSpec', function() {

  var controller
    , DatepickerService
    , scope
    , today = new Date();

  beforeEach(module('ionic-datepicker'));

  beforeEach(inject(function(_$controller_, _DatepickerService_,  $rootScope) {
    scope = $rootScope.$new();
    controller = _$controller_('DatepickerCtrl', {
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
        controller = _$controller_('DatepickerCtrl', {
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

  describe('#showType', function() {

    it('should have initialize with date', function() {
      expect(controller.showType('date')).to.be.true;
    });

    it('should showType month', function() {
      controller.changeType('month');
      expect(controller.showType('month')).to.be.true;
    });

    it('should showType year', function() {
      controller.changeType('year');
      expect(controller.showType('year')).to.be.true;
    });

    it('should showType date', function() {
      controller.changeType('date');
      expect(controller.showType('date')).to.be.true;
    });
  });

  describe('validate select methods', function() {

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

      expect(controller.selectedDate.getHours()).to.be.eq(0);
      expect(controller.selectedDate.getMinutes()).to.be.eq(0);
      expect(controller.selectedDate.getSeconds()).to.be.eq(0);
      expect(controller.selectedDate.getMilliseconds()).to.be.eq(0);
    });

    it('#selectMonth when it is first day of month', function() {
      controller.selectedDate.setDate(1);
      controller.selectMonth(0);
      expect(spy).to.have.been.called;
      expect(controller.selectedDate.getMonth()).to.be.eq(0);
      expect(controller.showType('date')).to.be.true;
    });

    it('#selectMonth when it is last day of month', function() {
      controller.selectedDate = new Date(2015, 6, 31);
      controller.selectMonth(1);
      expect(spy).to.have.been.called;
      expect(controller.selectedDate.getDate()).to.be.eq(28);
      expect(controller.selectedDate.getMonth()).to.be.eq(1);
      expect(controller.showType('date')).to.be.true;
    });

    it('#selectYear', function() {
      controller.selectYear(0);
      expect(spy).to.have.been.called;
      expect(controller.selectedDate.getFullYear()).to.be.eq(0);
      expect(controller.showType('date')).to.be.true;
    });
  });

  describe('#createDateList', function() {

    it('should delegate to service and validate cols and rows', function() {
      var date = new Date(2015, 6, 1);
      var spyService = sinon.spy(DatepickerService, 'createDateList');
      controller.createDateList(date);
      expect(spyService).to.have.been.calledWith(date);
      expect(controller.cols.length).to.eq(7);
      expect(controller.rows.length).to.eq(5);
    });
  });

  describe('validate callbacks', function() {

    var date
      , spy;
    beforeEach(function() {
      date = new Date(2011, 3, 18);
      scope.date = date;
      scope.callback = function(date) {};
      spy = sinon.spy(scope, 'callback');
    });

    it('#onCancel', function() {
      controller.selectDate(new Date(1987, 9, 5));
      controller.onCancel();
      expect(scope.date.getTime()).to.be.eq(date.getTime());
      expect(spy).to.have.been.calledWith(undefined);
    });

    it('#onDone', function() {
      var newDate = new Date(1987, 9, 5, 0, 0, 0, 0);
      controller.selectDate(newDate);
      controller.onDone();
      expect(scope.date.getTime()).to.be.eq(newDate.getTime());
      expect(spy).to.have.been.calledWith(newDate);
    });
  });
});
