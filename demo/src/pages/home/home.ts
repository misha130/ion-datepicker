import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public localDate: Date = new Date();
  public initDate: Date = new Date(2015, 1, 1);
  public initDate2: Date = new Date(2015, 1, 1);

  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date()
  constructor(public navCtrl: NavController) {

  }
  public Log(stuff): void {
    console.log(stuff);
  }

  public event(data: Date): void {
    this.localDate = data;
  }
  setDate(date: Date) {
    console.log(date);
    this.initDate = date;
  }

}
