import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../providers/global-variables';

/*
  Generated class for the LoadSummary provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoadSummary {
  
   data: any;
   emplNum: any;
   link: any;
   constructor(public http: Http, private globalVar: GlobalVariables) {
    this.emplNum = this.globalVar.getMyGlobalVar();
    this.link = this.globalVar.getMyGlobalLink();
  }

  load(){
    if(this.data){
      //already loaded data
      return Promise.resolve(this.data);
    }   
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(this.link+'getReport?id='+this.emplNum)
      .map(res => res.json())
      .subscribe(data => {
       
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        
        this.data = data;
        resolve(this.data);
        
      });
    });
  }

  reload(){
     return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('http://matityah.co.za/lmsApp/getReport?id='+this.emplNum)
      .map(res => res.json())
      .subscribe(data => {
       
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        
        this.data = data;
        resolve(this.data);
        
      });
    });
  }

}
