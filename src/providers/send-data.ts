import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariables } from './global-variables';

/*
  Generated class for the SendData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SendData {
  
  data: any;
  link: any;
  constructor(public http: Http, public globalVar: GlobalVariables) {
    console.log('Hello SendData Provider');
    this.link = this.globalVar.getMyGlobalLink();
  }

   applyLeave(emplNum, leave){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(this.link+'leaveRequest?id='+emplNum+'&type='+leave.type+'&fd='+leave.sDate+'&td='+leave.eDate+'&fhDay='+leave.fhd+'&reason='+leave.reason+'&medCert='+leave.mc)
      .map(res => res.json())
      .subscribe(data => {
       
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        
        this.data = data;
        resolve(this.data);
        
      });
    })
  }

  changePassword(emplNum, opw, pw){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(this.link+'changePassword?id='+emplNum+'&opw='+opw+'&pw='+pw)
      .map(res => res.json())
      .subscribe(data => {
       
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        
        this.data = data;
        resolve(this.data);
        
      });
    })
  }

  resetPassword(emplNum, name){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(this.link+'resetPassword?id='+emplNum+'&name='+name)
      .map(res => res.json())
      .subscribe(data => {
       
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        
        this.data = data;
        resolve(this.data);
        
      });
    })
  }

  cancelLeave(emplNum, id, reason){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(this.link+'cancelLeave?id='+id+'&emplNum='+emplNum+'&reason='+reason)
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
