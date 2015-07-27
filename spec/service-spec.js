(function() {

  'use strict';

  describe('DatepickerServiceSpec', function() {

    var DatepickerService;

    beforeEach(module('ionic-datepicker'));

    beforeEach(inject(function(_DatepickerService_) {
      DatepickerService = _DatepickerService_;
    }));

    it('#getDaysOfWeek', function() {
      var daysOfWeek = DatepickerService.getDaysOfWeek();
      expect(daysOfWeek.length).to.eq(7);
    });

    it('#getMonths', function() {
      var months = DatepickerService.getMonths();
      expect(months.length).to.eq(12);
    });

    it('#getYears', function() {
      var years = DatepickerService.getYears();
      expect(years.length).to.eq(201);
    });

    it('#createDateList', function() {

      var date = new Date(2015, 6, 1);
      var dateList = DatepickerService.createDateList(date);
      expect(dateList.length).to.eq(34);
      expect(dateList[0]).to.be.undefined;
      expect(dateList[1]).to.be.undefined;
      expect(dateList[2]).to.be.undefined;
      expect(dateList[3].getDate()).to.be.eq(1);
    });
  });

})();
