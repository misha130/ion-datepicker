import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public HerdDate: Date = new Date();
  constructor(public navCtrl: NavController) {

  }
  public Log(stuff): void {
    console.log(stuff);
  }
}
