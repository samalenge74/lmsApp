import { platform } from 'os';
import { Component } from '@angular/core';
import {App, NavController, NavParams, LoadingController, Loading, ToastController, AlertController, Platform } from 'ionic-angular';

import { GlobalVariables } from '../../providers/global-variables';
import { LoadLeaveCancel } from '../../providers/load-leave-cancel';
import { SendData } from '../../providers/send-data';
import { LoginPage } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Cancel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cancel',
  templateUrl: 'cancel.html',
  providers: [[LoadLeaveCancel],[SendData]]
})
export class CancelPage {
  
  emplNum: any;
  cancel: any;
  loading: Loading;
  lCancel = true;
  noReport = false;
  results: any=[];
  response: any;

  constructor(public app: App, public storage: Storage, public platform: Platform, public navCtrl: NavController,public alertCtrl: AlertController, public toastCtrl: ToastController, public navParams: NavParams, private globalVar: GlobalVariables, private loadData: LoadLeaveCancel,private sendData: SendData, public loadingCtrl: LoadingController) {
    this.emplNum = globalVar.getMyGlobalVar();
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let alert = this.alertCtrl.create({
            title: 'Exit',
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
  
  ionViewDidLoad() {
    this.showLoading();
    this.loadData.load().then(data => {
      this.loading.dismiss();
      this.results = data;
      
      if(this.results.length > 0){
          this.cancel = data;
          this.lCancel = true;
          this.noReport = false;
      }else{
        this.lCancel = false;
        this.noReport = true;
      }
    });
    
    console.log('ionViewDidLoad CancelPage');
  }

  doRefresh(refresher) {
  this.loadData.reload().then(res => {
    this.cancel = res;
    refresher.complete();
  });
}

reloading() {
    this.showLoading();
    this.loadData.reload().then(data => {
      this.loading.dismiss();
      this.results = data;
      
      if(this.results.length > 0){
          this.cancel = data;
          this.lCancel = true;
          this.noReport = false;
      }else{
        this.lCancel = false;
        this.noReport = true;
      }
    });
    
    console.log('ionViewDidLoad CancelPage');
  }

removeItem(x){
  let alert = this.alertCtrl.create({
    title: 'Confirm Deletion',
    message: 'Do you want to delete this leave record?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        handler: () => {
          this.showWaiting();
          this.sendData.cancelLeave(this.emplNum, x).then(data => {
            this.response = data;
            if(this.response.response == "done"){
                this.loading.dismiss();
                this.reloading();
                this.presentSuccessToast();
              }else{
                this.loading.dismiss();
                this.presentNotDoneToast();
              }
          });
        }
      }
    ]
  });
  alert.present();
  
}
    
    showLoading(){
      this.loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Loading...' 
      });
      this.loading.present();
    }

    showReLoading(){
      this.loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Reloading...' 
      });
      this.loading.present();
    }

    showWaiting(){
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Please Wait...' 
      });
      this.loading.present();
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

  presentSuccessToast(){
    let toast = this.toastCtrl.create({
      message: 'Your leave cancellation request was successfully submitted.',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom'
    });
    toast.present();
  }

}
