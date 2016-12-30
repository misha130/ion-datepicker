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
	   <button full="true" [min]="now" calendar="true" [(ngModel)]="date"  ion-item  ion-datepicker>
      <ion-label>
        Results<ion-icon name="forward-arrow"></ion-icon>
      </ion-label>
      <div item-content>
        {{date | date}}
      </div>
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

e) `[modalOptions]` - a modal is used to display the picker to configure the animation or other options you may use this

### 4) Pictures ###

<img src="https://i.gyazo.com/e82a0746522873dd7bdfa6753c077445.png" height="450">
<img src="https://i.gyazo.com/53282273f3d645a0af2f3035bc7a3b99.png" height="450">
<img src="https://i.gyazo.com/a896872c388637c97dc21f0bb0391820.png" height="450">