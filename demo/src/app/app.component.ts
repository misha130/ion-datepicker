import { Component } from '@angular/core';
import { HomePage } from '../pages/home/home';
import { Platform } from 'ionic-angular';

@Component({
  template: `<ion-nav [root]="'HomePage'"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
  }
}
