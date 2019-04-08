import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the RemarquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-remarque",
  templateUrl: "remarque.html"
})
export class RemarquePage {
  event: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get("event");
    console.log(this.event);
  }
}
