import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, ToastController, AlertController, App, Platform } from 'ionic-angular';
import { GlobalVariables } from '../../providers/global-variables';
import { SendData } from '../../providers/send-data';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Password page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
  providers: [SendData]
})
export class PasswordPage {

  emplNum: any;
  p: any;

  profile: any;
  manName: any;
  buttonDisabled: any;
  btnValue: any;
  response: any;
  loading: Loading;

  constructor(public app: App, public storage: Storage, public alertCtrl: AlertController, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private globalVar: GlobalVariables, public sendData: SendData, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
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

  checkPasswords(p){
    if (this.p.confPassword != this.p.password){
        this.buttonDisabled = true;
        this.btnValue = 'Passwords do not match';
    }else{
      this.buttonDisabled = null;
      this.btnValue = 'Submit';
    }
  }

  changePassword(p){
    if(this.p.password != "" && this.p.confPassword !=""){
      this.showWaiting();
      this.sendData.changePassword(this.emplNum, p.password).then(data => {
        
        this.response = data;
        console.log(JSON.stringify(this.response));
        if(this.response.response == "done"){
          this.loading.dismiss();
          this.p = {
            password: '',
            confPassword: ''
          }
          this.presentSuccessToast();
          
        }else{
          this.loading.dismiss();
          this.presentNoChangeToast();
        }
      });
    }else{
      this.presentNotEmptyFieldsToast();
    }
      
  }

    presentNoChangeToast(){
        let toast = this.toastCtrl.create({
          message: 'Password change was not successful.',
          showCloseButton: true,
          closeButtonText: 'Ok',
          cssClass: 'toast-message', 
          position: 'bottom'
        });
        toast.present();
      }

       presentSuccessToast(){
        let toast = this.toastCtrl.create({
          message: 'Password Successfully Changed',
          duration: 3000,
          cssClass: 'toast-message', 
          position: 'bottom'
        });
        toast.present();
      }

      presentNotEmptyFieldsToast(){
        let toast = this.toastCtrl.create({
          message: 'Both fields are required!!!',
          duration: 3000,
          cssClass: 'toast-message', 
          position: 'bottom'
        });
        toast.present();
      }
    
    showLoading(){
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'Sending request...' 
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

}
