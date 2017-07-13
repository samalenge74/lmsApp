import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Loading, LoadingController, Platform, ToastController } from 'ionic-angular';
import { LoadCancels } from '../../providers/load-cancels';
import { SendData } from '../../providers/send-data';
import { GlobalVariables } from '../../providers/global-variables';
import { platform } from 'os';
import { Storage } from '@ionic/storage';
import { LoadRequests } from '../../providers/load-requests';
/**
 * Generated class for the Action page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
  providers: [[LoadCancels],[SendData], [LoadRequests]]
})
export class Action {

  emplNum: any;
  cancels: any;
  loading: Loading;
  lCancel = true;
  lRequest = true;
  noReport = false;
  noReport2 = false;
  results: any=[];
  results2: any=[];
  response: any;
  requests: any;
  actions: any;
  constructor(public navCtrl: NavController, public platform: Platform, public storage: Storage, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController, private loadData: LoadCancels, private loadData2: LoadRequests,private sendData: SendData, public globalVar: GlobalVariables, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.emplNum = globalVar.getMyGlobalVar();
    this.actions = "lrequests";
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
      
      this.results = data;
      
      if(this.results.length > 0){
          this.cancels = data;
          this.lCancel = true;
          this.noReport = false;
      }else{
        this.lCancel = false;
        this.noReport = true;
      }
    });

    this.loadData2.load().then(data => {
      
      this.results2 = data;
      
      if(this.results2.length > 0){
          this.requests = data;
          this.lRequest = true;
          this.noReport2 = false;
      }else{
        this.lRequest = false;
        this.noReport2 = true;
      }
    });

    this.loading.dismiss();
  }

  doRefresh(refresher) {
      this.loadData.reload().then(data => {
        this.loading.dismiss();
      this.results = data;
      
      if(this.results.length > 0){
          this.cancels = data;
          this.lCancel = true;
          this.noReport = false;
      }else{
        this.lCancel = false;
        this.noReport = true;
      }
        refresher.complete();
      });

      this.loadData2.reload().then(data => {
      this.loading.dismiss();
      this.results2 = data;
      
      if(this.results2.length > 0){
          this.requests = data;
          this.lRequest = true;
          this.noReport2 = false;
      }else{
        this.lRequest = false;
        this.noReport2 = true;
      }
      refresher.complete();
    });
    }

  reloading() {
    this.showLoading();
    this.loadData.reload().then(data => {
      this.loading.dismiss();
      this.results = data;
      
      if(this.results.length > 0){
          this.cancels = data;
          this.lCancel = true;
          this.noReport = false;
      }else{
        this.lCancel = false;
        this.noReport = true;
      }
    });

    this.loadData2.reload().then(data => {
      this.loading.dismiss();
      this.results2 = data;
      
      if(this.results2.length > 0){
          this.requests = data;
          this.lRequest = true;
          this.noReport2 = false;
      }else{
        this.lRequest = false;
        this.noReport2 = true;
      }
    });
    
  }
  

  closeModal(){
    let confirm = this.alertCtrl.create({
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

  lDecline(x, y){
  let alert = this.alertCtrl.create({
    title: 'Provide a Reason',
    inputs: [
      {
        name: 'reason',
        placeholder: 'Reason'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // when cancel is clicked....
        }
      },
      {
        text: 'Delete',
        handler: data => {
          if(data.reason != ""){
              this.showWaiting();
              this.sendData.declineLeave(x, y, this.emplNum, data.reason).then(data => {
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
          }else{
            return false;
          }
        }
      }
    ]
  });
  alert.present();  
}

  lApprove(x, y){

    let alert = this.alertCtrl.create({
      title: 'Confirm Approval',
      message: 'Do you want to approve this leave?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.showWaiting();
            this.sendData.approveLeave(x, y, this.emplNum).then(data => {
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


  cDecline(x, y){
  let alert = this.alertCtrl.create({
    title: 'Provide a Reason',
    inputs: [
      {
        name: 'reason',
        placeholder: 'Reason'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // when cancel is clicked....
        }
      },
      {
        text: 'Delete',
        handler: data => {
          if(data.reason != ""){
              this.showWaiting();
              this.sendData.declineCancel(x, y, this.emplNum, data.reason).then(data => {
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
          }else{
            return false;
          }
        }
      }
    ]
  });
  alert.present();  
}

  cApprove(x, y){

    let alert = this.alertCtrl.create({
      title: 'Confirm Approval',
      message: 'Do you want to approve this leave?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.showWaiting();
            this.sendData.approveCancel(x, y, this.emplNum).then(data => {
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

}
