
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CinCheckPage } from '../../pages/cin-check/cin-check';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  constructor(public navCtrl: NavController) {
  }

  login(){
  this.navCtrl.push(LoginPage);
  }

  signup(){
  this.navCtrl.push(CinCheckPage);
  }
}