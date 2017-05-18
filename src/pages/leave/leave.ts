import { platform } from 'os';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ViewController, AlertController, ToastController, LoadingController, Loading, Platform } from 'ionic-angular';

import { GlobalVariables } from '../../providers/global-variables';
import { LoadLeaveTypes } from '../../providers/load-leave-types';
import { SendData } from '../../providers/send-data';

/*
  Generated class for the Leave page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html',
  providers: [[LoadLeaveTypes], [SendData]]
})
export class LeavePage {
  
  singleDay = false;
  sickLeave = false;
  emplNum: any;
  leaveTypes: any;
  leave: any;
  type: any;
  sDate: any;
  eDate: any;
  fhd: any;
  sTime: any;
  eTime: any;
  mc: any;
  reason: any;
  diff: any;
  dateDiff: any;
  days: any;
  buttonDisabled: any;
  disabled = true;
  loading: Loading;
  response: any;

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController, public viewCtrl: ViewController, private globalVar: GlobalVariables,public loadingCtrl: LoadingController, public alert: AlertController, public loadData: LoadLeaveTypes,public sendData: SendData, public toastCtrl: ToastController) {
   this.emplNum = globalVar.getMyGlobalVar();
   this.leave = {
     type: '',
     sDate: '',
     eDate: '',
     fhd: '',
     sTime: '',
     eTime: '',
     mc: '',
     reason: ''
   }
   this.loadData.load().then(data => {
        this.leaveTypes = data;
    });
    this.buttonDisabled = null;
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let alert = this.alertCtrl.create({
            title: 'Exit LMS',
            message: 'Do you want to exit App?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Yes',
                handler: () => {
                  this.globalVar.setMyGlobalVar("");
                  this.storage.set("logged-in", false);
                  navigator['app'].exitApp();
                }
              }
            ]
          });
          alert.present();
        
      });
    });
  }

  onChange(leaveType){
    if(leaveType == 1){
      this.sickLeave = true;
    }else{
      this.sickLeave = false;
    }
  }

  onChange1(dates){
    this.sDate = new Date(dates.sDate);
    this.eDate = new Date(dates.eDate);
    if(this.sDate > this.eDate){
      this.presentSDateToast();
      this.buttonDisabled = true;
    }else{
      this.buttonDisabled = null;
      
      this.diff = this.differenceInDays(this.sDate, this.eDate);
      console.log(this.eDate);
      console.log(this.diff);
      if (this.diff == 0){
        this.singleDay = true;
      }else{
        this.singleDay = false;
      }
      
    }
    
  }

  requestLeave(leave){
    this.showLoading();
    this.sendData.applyLeave(this.emplNum, leave).then(data => {
      this.response = data;
      if(this.response.response == "done"){
        this.loading.dismiss();
        this.leave = {
          type: '',
          sDate: '',
          eDate: '',
          fhd: '',
          sTime: '',
          eTime: '',
          mc: '',
          reason: ''
        } 
        this.sTime = "";
        this.eTime = "";
        this.presentSuccessToast(this.response.days);
      }else{
        if(this.response.response == "Not enough"){
          this.loading.dismiss();
          this.presentNotEnoughDaysToast(this.response.days);
        }else{
          if(this.response.response == "holiday"){
            this.loading.dismiss();
            this.presentHolidayToast();
          }else{
            this.loading.dismiss();
            this.presentNotDoneToast();
          }
          
        }
      }
    });
  }

   showLoading(){
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'Sending Request...' 
      });
      this.loading.present();
    }

  onChange2(dates){
    if(dates.sDate != ""){
      this.disabled = false;
    }else{
      this.disabled = true;
    }

    
    
  }

  onChange3(fhd){
    if(fhd == 1){
      this.sTime = "07:30:00";
      this.eTime = "16:30:00"
    }else{
      if (fhd == 2){
        this.sTime = "07:30:00";
        this.eTime = "11:45:00";
      }else{
        this.sTime = "11:45:00";
        this.eTime = "16:30:00";
      }
    }
    
  }



  closeModal(){
    let confirm = this.alert.create({
      title: 'Close Me?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirm.present();
  }

  differenceInDays(sD, eD){
    this.diff = new Date(eD - sD);
    this.days = this.diff/1000/60/60/24;
    return this.days;
  }


  presentSDateToast(){
    let toast = this.toastCtrl.create({
      message: 'Start Date cannot be after End Date.',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom'
    });
    toast.present();
  }

  presentNotDoneToast(){
    let toast = this.toastCtrl.create({
      message: 'There was a problem processing your request. Please try again!!!',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom'
    });
    toast.present();
  }

  presentHolidayToast(){
    let toast = this.toastCtrl.create({
      message: 'The selected date/s fall either over weekend or public holiday',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom'
    });
    toast.present();
  }

  presentSuccessToast(text){
    let toast = this.toastCtrl.create({
      message: 'Your '+text+' days leave request was successfully submitted.',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom'
    });
    toast.present();
  }

  presentNotEnoughDaysToast(text){
    let toast = this.toastCtrl.create({
      message: 'You only have '+text+' days for this leave type.',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom'
    });
    toast.present();
  }

  ionViewDidLoad() {
    // no reference yet
  }

}
