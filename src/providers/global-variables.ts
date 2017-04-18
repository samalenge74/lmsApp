import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalVariables {

  myGlobalVar: any;
  myGlobalLink: any;
  constructor(public http: Http) {
    this.myGlobalVar = "";
    this.myGlobalLink = "http://lms.wecaretrading.co.za/lmsApp/";

    //console.log('Hello GlobalVariables Provider');
  }

  setMyGlobalVar(value) {
    this.myGlobalVar = value;
  }

  getMyGlobalVar() {
    return this.myGlobalVar;
  }

  getMyGlobalLink(){
    return this.myGlobalLink;
  }

}
