import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AuthService {

  isLoggedin: any;
  http: any;
  data: any;
  AuthToken: any;
  static get parameters(){
    return [Http];
  }
  constructor(http) {
    this.http = http;
    this.isLoggedin = false;
    this.AuthToken = null;
  }

  storeUserCredentials(token){
    window.localStorage.setItem('jimmy', token);
    this.useCredentials(token);
  }
  
  useCredentials(token){
    this.isLoggedin = true;
    this.AuthToken = token;
  }

  loadUserCrendentials(){
    var token = window.localStorage.getItem('jimmy');
    this.useCredentials(token);
  }

  destroyUserCredentials(){
    this.isLoggedin = false;
    this.AuthToken = null;
    window.localStorage.clear();
  }


  authenticate(user){
    var username = user.username.toLowerCase();
    var password = user.password;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('http://matityah.co.za/lmsApp/login?id='+username+'&pw='+password)
      .map(res => res.json())
      .subscribe(data => {
       
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        
        this.data = data;
        resolve(this.data);
      });
    })
  }

}
