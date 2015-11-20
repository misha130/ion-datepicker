(function() {

  'use strict';

  describe('DatepickerNlsSpec', function() {

    var DatepickerNls;

    beforeEach(module('ionic-datepicker'));

    beforeEach(inject(function(_DatepickerNls_) {
      DatepickerNls = _DatepickerNls_;
    }));

    context('when locale eq en-us', function() {

      it('.getDaysOfWeek', function() {
        var daysOfWeek = DatepickerNls.getWeekdays('en-us');
        expect(daysOfWeek.length).to.eq(7);
        expect(daysOfWeek[0]).to.be.eq('Sunday');
        expect(daysOfWeek[1]).to.be.eq('Monday');
        expect(daysOfWeek[2]).to.be.eq('Tuesday');
        expect(daysOfWeek[3]).to.be.eq('Wednesday');
        expect(daysOfWeek[4]).to.be.eq('Thursday');
        expect(daysOfWeek[5]).to.be.eq('Friday');
        expect(daysOfWeek[6]).to.be.eq('Saturday');
      });

      it('.getMonths', function() {
        var months = DatepickerNls.getMonths('en-us');
        expect(months.length).to.eq(12);
        expect(months[0]).to.be.eq('January');
        expect(months[1]).to.be.eq('February');
        expect(months[2]).to.be.eq('March');
        expect(months[3]).to.be.eq('April');
        expect(months[4]).to.be.eq('May');
        expect(months[5]).to.be.eq('June');
        expect(months[6]).to.be.eq('July');
        expect(months[7]).to.be.eq('August');
        expect(months[8]).to.be.eq('September');
        expect(months[9]).to.be.eq('October');
        expect(months[10]).to.be.eq('November');
        expect(months[11]).to.be.eq('December');
      });
    });

    context('when locale eq pt-br', function() {

      it('.getDaysOfWeek', function() {
        var daysOfWeek = DatepickerNls.getWeekdays('pt-br');
        expect(daysOfWeek.length).to.eq(7);
        expect(daysOfWeek[0]).to.be.eq('Domingo');
        expect(daysOfWeek[1]).to.be.eq('Segunda-Feira');
        expect(daysOfWeek[2]).to.be.eq('Terça-Feira');
        expect(daysOfWeek[3]).to.be.eq('Quarta-Feira');
        expect(daysOfWeek[4]).to.be.eq('Quinta-Feira');
        expect(daysOfWeek[5]).to.be.eq('Sexta-Feira');
        expect(daysOfWeek[6]).to.be.eq('Sábado');
      });

      it('.getMonths', function() {
        var months = DatepickerNls.getMonths('pt-br');
        expect(months.length).to.eq(12);
        expect(months[0]).to.be.eq('Janeiro');
        expect(months[1]).to.be.eq('Fevereiro');
        expect(months[2]).to.be.eq('Março');
        expect(months[3]).to.be.eq('Abril');
        expect(months[4]).to.be.eq('Maio');
        expect(months[5]).to.be.eq('Junho');
        expect(months[6]).to.be.eq('Julho');
        expect(months[7]).to.be.eq('Agosto');
        expect(months[8]).to.be.eq('Setembro');
        expect(months[9]).to.be.eq('Outubro');
        expect(months[10]).to.be.eq('Novembro');
        expect(months[11]).to.be.eq('Dezembro');
      });
    });

    context('when locale not found', function() {

      it('.getDaysOfWeek', function() {
        var daysOfWeek = DatepickerNls.getWeekdays('de-DE');
        expect(daysOfWeek.length).to.eq(7);
        expect(daysOfWeek[0]).to.be.eq('Sunday');
        expect(daysOfWeek[1]).to.be.eq('Monday');
        expect(daysOfWeek[2]).to.be.eq('Tuesday');
        expect(daysOfWeek[3]).to.be.eq('Wednesday');
        expect(daysOfWeek[4]).to.be.eq('Thursday');
        expect(daysOfWeek[5]).to.be.eq('Friday');
        expect(daysOfWeek[6]).to.be.eq('Saturday');
      });

      it('.getMonths', function() {
        var months = DatepickerNls.getMonths('de-DE');
        expect(months.length).to.eq(12);
        expect(months[0]).to.be.eq('January');
        expect(months[1]).to.be.eq('February');
        expect(months[2]).to.be.eq('March');
        expect(months[3]).to.be.eq('April');
        expect(months[4]).to.be.eq('May');
        expect(months[5]).to.be.eq('June');
        expect(months[6]).to.be.eq('July');
        expect(months[7]).to.be.eq('August');
        expect(months[8]).to.be.eq('September');
        expect(months[9]).to.be.eq('October');
        expect(months[10]).to.be.eq('November');
        expect(months[11]).to.be.eq('December');
      });
    });

  });

})();
