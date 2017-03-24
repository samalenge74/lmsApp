import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { GlobalVariables } from '../../providers/global-variables';

/*
  Generated class for the Info page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public platform: Platform, public alertCtrl: AlertController, public globalVar: GlobalVariables) {
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
    console.log('ionViewDidLoad InfoPage');
  }

}
