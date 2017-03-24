import { platform } from 'os';
import { emit } from '@ionic/app-scripts/dist/util/events';
import { Component, EventEmitter } from '@angular/core';
import {App, NavController, NavParams, ModalController, ToastController, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalVariables } from '../../providers/global-variables';
import { HistoryPage } from '../../pages/history/history';
import { LeavePage } from '../../pages/leave/leave';
import { LoginPage } from '../../pages/login/login';



/*
  Generated class for the Report page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  
  emplNum: any;
  leaveTypes: any;

  leaveHistory: any;
  event: any;
  constructor(public app: App, public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController, public platform: Platform, public navParams: NavParams, private globalVar: GlobalVariables, public modalCtrl: ModalController, public toastCtrl: ToastController) {
    this.event = {
      startDate: '',
      endDate: ''
    }
    this.emplNum = globalVar.getMyGlobalVar();
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let alert = this.alertCtrl.create({
            title: 'Exit LMS!!!',
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

  openModal(event){
     if(event.startDate == "" || event.endDate == ""){
      this.presentToast();
    }else{
      let historyModal = this.modalCtrl.create(HistoryPage, event);
      historyModal.present();
      this.event = {
        startDate: '',
        endDate: ''
      }
    }
  }

     presentToast(){
        let toast = this.toastCtrl.create({
          message: 'All fields are required',
          showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'bottom'
        });
        toast.present();
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

}
