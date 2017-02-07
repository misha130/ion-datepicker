
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
	<span ion-datepicker (ionChanged)="setDate($event);" [value]="localDate" [min]="localDate" full="true" calendar="true" clear class="ScheduleDate">
		<span>{{localDate | date}} <ion-icon name="clipboard" item-left ></ion-icon> </span>
	</span>
```
a) `[value]` defines the initial value

b) `[min]` is minimum date that user is allowed to select.  (not required)

c) `[max]` is maximum date that user is allowed to select.  (not required)

d) `(ionChanged)` is an event emitter that returns the date as a $event.

e) `(ionCanceled)` is an event that is raised when the cancel button is activated. Returns no data.

f) `[hclasses]` is a bridge to the header classes of the directive using ngClass (string, array or object)  (not required)

g) `[dclasses]` is a bridge to the date classes of the directive using ngClass (string, array or object)  (not required)

h) `[full]` - a boolean that determines whether the modal should be full screen or not (not required)

i) `[calendar]` - a boolean that makes the date picker display as a calendar

j) `[modalOptions]` - a modal is used to display the picker to configure the animation or other options you may use this

k) `[locale]` - for translating the calendar. Avaliable local is en-US, he-IL, pt-BR, ru-RU, de, fi

l) `[okText]` - Text for the ok button

m) `[cancelText]` - Text for the cancel button


### 4) Pictures ###

<img src="https://i.gyazo.com/e82a0746522873dd7bdfa6753c077445.png" height="450">
<img src="https://i.gyazo.com/53282273f3d645a0af2f3035bc7a3b99.png" height="450">
<img src="https://i.gyazo.com/a896872c388637c97dc21f0bb0391820.png" height="450">