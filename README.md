## How to use ###

1) Install using or npm

```
    npm i datepicker-ionic2 --save
```

2) Add it to your ngModule in app.module

```
 import { DatePickerModule } from 'datepicker-ionic2/datepicker-ionic2';
```
```
   imports: [
        IonicModule.forRoot(App),
        DatePickerModule,
    ],
```
3) Use the directive in your html and give it the modal controller of your ionic app
```
	 <button iondatepicker  (onchange)="result($event)" [modal]="modalCtrl" ion-item>
      Click to show datepicker
    </button>
```

a) `[modal]` is a required controller from ionc2. The Modal Controller allows the datepicker to be displayed as part of your app.

b) `[date]` is the date object which we are passing to the `ionic-datepicker`. (not required)

c) `[min]` is minimum date that user is allowed to select.  (not required)

d) `[max]` is maximum date that user is allowed to select.  (not required)

e) `(onchange)` is an event emitter that returns the date as a $event.

f) `[hclasses]` is a bridge to the header classes of the directive using ngClass (string, array or object)  (not required)

g) `[dclasses]` is a bridge to the date classes of the directive using ngClass (string, array or object)  (not required)

4) Pictures

![date pick](https://i.gyazo.com/ffb3e4868567c92de9aac456eaf6b9a3.png)
![date pick](https://i.gyazo.com/a0d56b1238c239187878e8a1c7c57e24.png)
