import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController, PopoverController, Platform } from 'ionic-angular';

import { GlobalVariables } from '../../providers/global-variables';
import { LoadFullReport } from '../../providers/load-full-report';
import { PopoverPage } from '../../pages/popover/popover';
import { Storage } from '@ionic/storage';

/*
  Generated class for the History page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  providers: [LoadFullReport]
})
export class HistoryPage {
  
  emplNum: any;

  type: any = 0;
  from: any;
  to: any;
  history: any;
  results: any=[];
  fullReport = false;
  noReport = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public platform: Platform, public viewCtrl: ViewController, public popoverCtrl: PopoverController, private globalVar: GlobalVariables, public alertCtrl: AlertController, private loadData: LoadFullReport, public loading: LoadingController) {
    this.emplNum = globalVar.getMyGlobalVar();
    this.from = this.navParams.get('startDate');
    this.to = this.navParams.get('endDate');
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
  
  presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverPage, {
    });

    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss((popoverData) => {
      this.filterHistory(popoverData);
    })
  }

  filterHistory(x){
    let loader = this.loading.create({
      content: 'Please wait....',
    });

    loader.present().then(() => {
      this.loadData.fullReport(this.emplNum, x, this.from, this.to).then(data =>{
        this.results = data;
        if(this.results.length > 0){
              this.noReport = false;
              this.fullReport = true;
              this.history = data;
        }else{
          this.noReport = true;
          this.fullReport = false;
        }
      });
      loader.dismiss();
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

  ionViewDidLoad() {
    let loader = this.loading.create({
      spinner: 'crescent',
      content: 'Getting Leave History....',
    });
  
    loader.present().then(() => {
      this.loadData.fullReport(this.emplNum, this.type, this.from, this.to).then(data =>{
        this.results = data;
        if(this.results.length > 0){
          this.noReport = false;
          this.fullReport = true;
          this.history = data;
        }else{
          this.noReport = true;
          this.fullReport = false;
        }
      });
      loader.dismiss();
    });
    console.log('ionViewDidLoad HistoryPage');
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Sorry!!!',
    subTitle: 'No Leave History Found...',
    buttons: ['Dismiss']
  });
  alert.present();
}

}
