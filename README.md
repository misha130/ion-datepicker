

## How to use ###

### 1) Install using npm ###

```
    npm i datepicker-ionic2 --save
```

### 2) Add it to your ngModule in app.module ###

```
 import { DatePickerModule } from 'datepicker-ionic2';
```
```
   imports: [
        IonicModule.forRoot(App),
        DatePickerModule,
    ],
```
### 3) Use the directive ion-datepicker in your html  ###
```
	<span ion-datepicker (ionChanged)="setDate($event);" [value]="localDate" [min]="localDate" clear class="ScheduleDate">
		<span>{{localDate | date}} <ion-icon name="clipboard" item-left ></ion-icon> </span>
	</span>
```

### Dismiss the datepicker from the class  ###

```

    import { DatePickerDirective } from 'datepicker-ionic2';

	@ViewChild(DatePickerDirective) private datepickerDirective:DatePickerDirective;

    public closeDatepicker(){
        this.datepickerDirective.dismiss();
    }
    
```

## Please note en-US locale starts the calendar with monday and en-UK starts it with sunday ###


a) `[value]` defines the initial value

b) `[min]` is minimum date that user is allowed to select.  (not required)

c) `[max]` is maximum date that user is allowed to select.  (not required)

d) `(ionChanged)` is an event emitter that returns the date as a $event.

e) `(ionCanceled)` is an event that is raised when the cancel button is activated. Returns no data.

f) `[headerClasses]` is a bridge to the header classes of the directive using ngClass (string, array or object)  (not required)

g) `[bodyClasses]` is a bridge to the date classes of the directive using ngClass (string, array or object)  (not required)

h) `[modalOptions]` - a modal is used to display the picker to configure the animation or other options you may use this

i) `[locale]` - for translating the calendar. Avaliable local is en-US, en-UK, he-IL, pt-BR, ru-RU, de, fi, zh-TW, zh-CN

j) `[okText]` - Text for the ok button

k) `[cancelText]` - Text for the cancel button


### 4) Pictures ###

<img src="https://i.gyazo.com/a896872c388637c97dc21f0bb0391820.png" height="450">