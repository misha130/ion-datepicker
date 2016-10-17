[![Circle CI](https://circleci.com/gh/celsomarques/ionic-datepicker.svg?style=svg)](https://circleci.com/gh/celsomarques/ionic-datepicker) [![Code Climate](https://codeclimate.com/github/celsomarques/ionic-datepicker/badges/gpa.svg)](https://codeclimate.com/github/celsomarques/ionic-datepicker) [![Test Coverage](https://codeclimate.com/github/celsomarques/ionic-datepicker/badges/coverage.svg)](https://codeclimate.com/github/celsomarques/ionic-datepicker/coverage) [![bitHound Score](https://www.bithound.io/github/celsomarques/ionic-datepicker/badges/score.svg)](https://www.bithound.io/github/celsomarques/ionic-datepicker/master)


## How to use ###

1) Install using or npm

```
    npm i datepicker-ionic2 --save
```

2) Add it to your ngModule in app.module

```` import { DatePickerModule } from 'datepicker-ionic2/datepicker-ionic2';

   imports: [
        IonicModule.forRoot(App),
        DatePickerModule.forRoot(),
    ],
````
3) Use the directive in your html and give it the modal controller of your ionic app
````
	 <button iondatepicker [modal]="modalCtrl" ion-item>
      Click to show datepicker
    </button>
````


a) `[date]` is the date object which we are passing to the `ionic-datepicker`.

b) `[min]` is minimum date that user is allowed to select.

c) `[max]` is maximum date that user is allowed to select.

d) `[callback]` is the callback function which we have to pass to the `ionic-datepicker`. This function takes an argument which will return `undefined` if the user didnot selected any date. And returns a `date` object, if the user selects any date.
