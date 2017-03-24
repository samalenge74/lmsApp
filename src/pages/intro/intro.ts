import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
import { TabsPage } from '../../pages/tabs/tabs';
import { GlobalVariables } from '../../providers/global-variables';

/*
  Generated class for the Intro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVar: GlobalVariables, public storage: Storage, public alertCtrl: AlertController, public platform: Platform) {
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

  navHome(){
    this.storage.ready().then(() =>{
      this.storage.get('logged-in').then((val) => {
        if(val == false || !val){
          this.navCtrl.setRoot(LoginPage);
        }else{
          this.navCtrl.setRoot(TabsPage);
        }
      })
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
