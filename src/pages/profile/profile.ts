import { Component } from '@angular/core';
import {App, NavController, NavParams, LoadingController, ToastController, Loading, AlertController, Platform } from 'ionic-angular';

import { GlobalVariables } from '../../providers/global-variables';
import { LoadProfile } from '../../providers/load-profile';
import { SendData } from '../../providers/send-data';
import { LoginPage } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../../pages/intro/intro';
import { platform } from 'os';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [[LoadProfile], [SendData]]
})
export class ProfilePage {
  

  emplNum: any;
  p: any;

  profile: any;
  manName: any;
  buttonDisabled: any;
  btnValue: any;
  response: any;
  loading: Loading;
  constructor(public app: App, public storage: Storage, public alertCtrl: AlertController, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private globalVar: GlobalVariables, private LoadProfile: LoadProfile, public sendData: SendData, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.p = {
      password: '',
      confPassword: ''
    }
    this.emplNum = globalVar.getMyGlobalVar(); 
    this.buttonDisabled = null; 
    this.btnValue = 'Submit'; 
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let alert = this.alertCtrl.create({
            title: '',
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
    this.LoadProfile.load().then(data => {
      this.loading.dismiss();
      this.profile = data;
    });

    console.log('ionViewDidLoad ProfilePage');
  }
  
  viewIntro(){
    this.storage.get('intro-done').then(done => {
      
        this.storage.set('intro-done', true);
        this.app.getRootNav().setRoot(IntroPage);
      
    });
  } 
    showLoading(){
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'Sending request...' 
      });
      this.loading.present();
    }

}
