import { SendData } from '../../providers/send-data';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, Loading, LoadingController, AlertController } from 'ionic-angular';

/*
  Generated class for the ResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers: [SendData]
})
export class ResetPasswordPage {
  
  u: any;
  results: any=[];
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public loadingCtrl: LoadingController, public sendData: SendData, public viewCtrl: ViewController, public toastCtrl: ToastController) {
    this.u = {
      name: '',
      emplNum: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword(u){
    this.showLoading();
    this.sendData.resetPassword(u.emplNum, u.name).then(data => {
      this.results = data;
      if(this.results.response == 'done'){
        this.u = {
          name: '',
          emplNum: ''
        }
        this.loading.dismiss();
        this.presentSuccessToast();
      }else{
        this.loading.dismiss();
        this.presentFailedToast();
      }
    });
  }

  showLoading(){
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'Sending request...' 
      });
      this.loading.present();
    }

    presentSuccessToast(){
     setTimeout(() =>{
          this.loading.dismiss();
        })
        let toast = this.toastCtrl.create({
          message: 'Your password has been successfully reset and an email has been to your email address containing the new password.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }

      presentFailedToast(){
        setTimeout(() =>{
          this.loading.dismiss();
        })
        let toast = this.toastCtrl.create({
          message: 'Password Reset Failed. Please Contact System administrator.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
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

}
