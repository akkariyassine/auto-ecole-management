import { TabsPage } from '../tabs/tabs';
import { Tabs1Page } from '../tabs1/tabs1';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CondidatProvider } from '../../providers/condidat/condidat';
import { MoniteurProvider } from '../../providers/moniteur/moniteur';

import { WelcomePage } from '../welcome/welcome';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  condidats :any  ;
  moniteurs :any  ;
  checkcin : any;
  cin : any ;
  password : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public CondidatProvider : CondidatProvider , public MoniteurProvider:MoniteurProvider ) {

  }





    checkcin_pass( cin : any ,password : any) {

      console.log(this.cin);
      console.log(this.password);

  if(this.cin==undefined || this.password==undefined) {

    alert("you should defined your cin and password") ;
  }
  else if (this.cin && this.password && this.checkCin()!="user don't exist" )
  {

    this.CondidatProvider.getListCondidat().then(
      (condidats: any) => {
        this.condidats=condidats ;

        let index = this.condidats.findIndex(item => item.cin ==this.cin) ;
    if(index!=-1){
        this.CondidatProvider.setCondidatCourant(index) ;
        this.navCtrl.push(Tabs1Page);

    }else {
      this.MoniteurProvider.getListMoniteur().then(
        (moniteurs: any) => {
          this.moniteurs=moniteurs ;

          let index = this.moniteurs.findIndex(item => item.cin ==this.cin) ;
      if(index!=-1){
        this.MoniteurProvider.setMoniteurCourant(index) ;
        this.navCtrl.push(TabsPage );

      }else {
      alert("password don't exist") ;
      this.navCtrl.push(WelcomePage );

      }
        }
      );

    }

      }
    );


  }

  }
    checkCin(): any {
      console.log(this.cin);

      if(this.cin==undefined){
        alert("cin vide") ;
      }else {

        this.CondidatProvider.getListCondidat().then(
          (condidats: any) => {
            this.condidats=condidats ;

            let index = this.condidats.findIndex(item => item.cin ==this.cin) ;
        if(index!=-1){
          let object = {
            genre : 'condidat' ,
            item : this.condidats[index]
          }
           // this.navCtrl.push(TabsPage ,{object :object});

         //console.log( this.condidats[index]);
        }else {
          this.MoniteurProvider.getListMoniteur().then(
            (moniteurs: any) => {
              this.moniteurs=moniteurs ;
              console.log(this.moniteurs);

              let index = this.moniteurs.findIndex(item => item.cin ==this.cin) ;
          if(index!=-1){
            let object = {
              genre : 'moniteur' ,
              item : this.moniteurs[index]
            }
           // this.navCtrl.push(TabsPage,{object :object});

           //console.log( this.moniteurs[index]);
          }else {
          alert("user don't exist") ;
          this.navCtrl.push(WelcomePage );

          }
            }
          );

        }
          }
        );


      }
      }

    }