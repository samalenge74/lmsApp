import * as ionic from 'Ionic';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {App, NavController, NavParams, ModalController, LoadingController, Loading, Platform, AlertController } from 'ionic-angular';
import { LeavePage } from '../../pages/leave/leave';
import { GlobalVariables } from '../../providers/global-variables';
import { LoadSummary } from '../../providers/load-summary';
import { LoginPage } from '../../pages/login/login';
import { CalendarPage } from '../calendar/calendar';
import { Action } from '../action/action';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LoadSummary]
})
export class HomePage {
  
  emplNum: any;
  managerVar: any;
  summary: any;
  nav: any;
  hide: any = false;

  loading: Loading;
  constructor(public app: App, public storage: Storage, public platform: Platform, public alertCtrl: AlertController, public navCtrl: NavController, private navParams: NavParams, private globalVar: GlobalVariables, private loadData: LoadSummary, public modalCtrl: ModalController, public loadingCtrl: LoadingController ) {
    
    this.emplNum = globalVar.getMyGlobalVar();
    this.managerVar = globalVar.getManagerVar();
    if(this.managerVar == 1){
      this.hide = false;
    }else{
      this.hide = true;
    }
    this.nav = navCtrl;
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

  openModal(){
    let myModal = this.modalCtrl.create(LeavePage);
    myModal.present();
  }

  openCalendar(){
    let myModal = this.modalCtrl.create(CalendarPage);
    myModal.present();
  }

  openActions(){
    let myModal = this.modalCtrl.create(Action);
    myModal.present();
  }

    ionViewDidLoad() {
      this.showLoading();
      this.loadData.load().then(data => {
        this.loading.dismiss();
        this.summary = data;
      });
      
    }

    doRefresh(refresher) {
       this.loadData.reload().then(data => {
          this.summary = data;
        refresher.complete();
      });
    }

    toggleDetails(data){
      if(data.showDetails){
        data.showDetails = false;
        data.icon = 'arrow-dropup-circle';
      } else {
        data.showDetails = true;
        data.icon = 'arrow-dropdown-circle';
      }
    }
    
    showLoading(){
      this.loading = this.loadingCtrl.create({
        content: 'Loading...' 
      });
      this.loading.present();
    }

  

}
