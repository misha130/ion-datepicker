## How to use ###

### 1) Install using npm ###

```
    npm i datepicker-ionic2 --save
```

### 2) Add it to your ngModule in app.module ###

```
 import { DatePickerModule } from 'datepicker-ionic2/datepicker-ionic2';
```
```
   imports: [
        IonicModule.forRoot(App),
        DatePickerModule,
    ],
```
### 3) Use the directive in your html and give it the modal controller of your ionic app ###
```
	 <button iondatepicker   ion-item>
      Click to show datepicker
    </button>
```

a) `[(ngModel)]` is used to have the value as any other angular2 component

a) `[min]` is minimum date that user is allowed to select.  (not required)

b) `[max]` is maximum date that user is allowed to select.  (not required)

c) `(ionChanged)` is an event emitter that returns the date as a $event.

d) `[hclasses]` is a bridge to the header classes of the directive using ngClass (string, array or object)  (not required)

e) `[dclasses]` is a bridge to the date classes of the directive using ngClass (string, array or object)  (not required)

f) `[full]` - a boolean that determines whether the modal should be full screen or not (not required)

g) `[calendar]` - a boolean that makes the date picker display as a calendar

### 4) Pictures ###

<img src="https://i.gyazo.com/ffb3e4868567c92de9aac456eaf6b9a3.png" height="450">
<img src="https://i.gyazo.com/47da6eb564fc369f15ce765644b69987.png" height="450">
<img src="https://i.gyazo.com/8a6ab4eaaf0eaff1191a5adf29ca4b5a.png" height="450">