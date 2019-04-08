import { Injectable } from '@angular/core';
import * as firebase from 'firebase' ;

/*
  Generated class for the CondidatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CondidatProvider {
   Condidats : Array<any> = []  ;
   CondidatC =null ;
  constructor() {
    firebase.database().ref('/condidats')
    .on('value', (data: firebase.database.DataSnapshot) => {
      
      
      
      }
    );

  }
  getListCondidat() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/condidats').once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          } 
        );
      }
    );

  }

  setCondidatCourant(c) {
    this.CondidatC=c;
  }
  getCondidatCourant() {
    return this.CondidatC ;
  }

}
