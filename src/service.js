'use strict';

app
.service('DatepickerService', function () {

  this.daysOfWeek = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
  this.years = [];
  this.populateYears = function() {
    for (var i = 1900; i < 2101; i++) this.years.push(i);
  };
  this.populateYears();
});
