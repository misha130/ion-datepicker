##Introduction:

This is a `ionic-datepicker` bower component which can be used with any Ionic framework's application.

##How to use:

1) In your project repository install the ionic-datepicker using bower

    bower install ionic-datepicker --save

This will install the latest version released.
    
2) Then you can see the following directory structure see in your project folder

Give the path of  `style.css, templates.js and ionic-datepicker.js` in your `index.html` file.

````html
<link href="lib/ionic-datepicker/dist/style.css" rel="stylesheet"> 
<!-- path to ionic/angularjs js -->
<script src="lib/ionic-datepicker/dist/templates.js"></script>
<script src="lib/ionic-datepicker/dist/ionic-datepicker.js"></script>
````    
    
3) In your application module inject the dependency `ionic-datepicker`, in order to work with the ionic time picker
````javascript
angular.module('mainModuleName', ['ionic', 'ionic-datepicker']){
 //
}
````

4) Use the below format in your template's corresponding controller

````javascript
$scope.currentDate = new Date();

$scope.datePickerCallback = function (val) {
	if(typeof(val)==='undefined'){		
		console.log('Date not selected');
	}else{
		console.log('Selected date is : ', val);
	}
};
````

a) `currentDate` is the date object which we are passing to the `ionic-datepicker`.

b) `datePickerCallback` is the callback function which we have to pass to the `ionic-datepicker`. This function takes an argument which will return `undefined` if the user didnot selected any date. And returns a `date` object, if the user selects any date.


5) Then use the below format in your template / html file

````html
<ionic-datepicker idate="currentDate" disablepreviousdates="true"  callback="datePickerCallback">
    <button class="button button-block button-positive"> {{ currentDate | date:'dd - MMMM - yyyy' }} </button>
</ionic-datepicker>
````


a) `ionic-datepicker` is the directive, to which we can pass required vales.

b) `idate` takes date object. If we don't pass any value, the default value will be `new Date()`.

c) `disablepreviousdates` takes true or false. `true` disables the past dates, and `false` doesn't.

d) `callback` takes the callback function name which will be called once the date picker has been closed.
