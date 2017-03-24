import { Component, EventEmitter, Output } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadLeaveTypes } from '../../providers/load-leave-types';

/*
  Generated class for the Popover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
  providers: [LoadLeaveTypes]
})
export class PopoverPage {
  
  leaveTypes: any;
  selectedLeaveID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadData: LoadLeaveTypes) {
    this.loadData.load().then(data => {
        this.leaveTypes = data;
    });

    this.selectedLeaveID = 0;
  }

  onChange(leaveType){
    console.log(leaveType);
  }
  
  setSelectedleaveID(selectedItem){
    this.selectedLeaveID = selectedItem;
    this.viewCtrl.dismiss(this.selectedLeaveID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

}
