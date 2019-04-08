import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GeneralProvider } from "../../providers/general/general";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
import { AngularFireDatabase } from "@angular/fire/database";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { DomSanitizer } from "@angular/platform-browser";
import * as firebase from "firebase";
import { LoginPage } from "../login/login";
/**
 * Generated class for the CommSuiviPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-comm-suivi",
  templateUrl: "comm-suivi.html"
})
export class CommSuiviPage {
  moniteurC;
  commList: any;
  items: Array<any> = [];
  ListCondidat: any[];
  response: any;
  commentaires: Array<any>;

  constructor(
    public condidat: CondidatProvider,
    public navCtrl: NavController,
    public MoniteurProvider: MoniteurProvider,
    public navParams: NavParams,
    public general: GeneralProvider,
    public afDB: AngularFireDatabase,
    public sanitizer: DomSanitizer
  ) {
    this.moniteurC = this.MoniteurProvider.getMoniteurCourant();
    this.init();
  }

  init() {
    this.afDB
      .list("commentaires")
      .valueChanges()
      .subscribe(data => {
        this.commList = data as Array<any>;
        this.commList.filter(word => word.moniteur + "" == this.moniteurC);
        console.log(this.commList);

        this.condidat.getListCondidat().then(data => {
          this.ListCondidat = data as Array<any>;
          this.ListCondidat.filter(
            word => word.moniteur + "" == this.moniteurC
          );
          console.log(this.ListCondidat);

          this.items = [];
          for (let i of this.commList) {
            let condidat = this.ListCondidat[Number(i.condidat)];

            let object = {
              image: condidat.photo,
              name: condidat.nom + " " + condidat.prenom,
              start: i.start,
              end: i.end,
              comment: i.commentaire,
              moniteur: i.moniteur,
              condidat: i.condidat,
              response: i.response
            };
            console.log(object);

            this.items.push(object);
          }
          console.log(this.items);
        });
      });
  }

  setDefaultPic(item: any) {
    this.items[this.items.indexOf(item)].photo = "assets/imgs/user.png";
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  validate(item) {
    console.log(item);

    let object = {
      start: item.start,
      end: item.end,
      moniteur: item.moniteur,
      condidat: item.condidat,
      commentaire: item.comment,
      response: this.response
    };
    console.log(object);
    this.general.getListCommantaires().then(data => {
      this.commentaires = data as Array<any>;
      console.log(this.commentaires);
      if (this.commentaires === null) {
        this.commentaires = [];
      } else {
        this.commentaires = data as Array<any>;
      }
      console.log(this.getIndex(item));

      this.commentaires[this.getIndex(item)] = object;
      console.log(this.commentaires);

      firebase
        .database()
        .ref("/commentaires")
        .set(this.commentaires);
    });
  }
  getIndex(item) {
    let index = 0;
    for (let i of this.commentaires) {
      if (i.start == item.start) {
        return index;
      }
      index++;
    }
  }
}
