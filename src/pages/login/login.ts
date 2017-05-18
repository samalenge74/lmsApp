import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController, ToastController, LoadingController, Loading, Platform, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GlobalVariables } from '../../providers/global-variables';
import { TabsPage } from '../../pages/tabs/tabs';
import { IntroPage } from '../../pages/intro/intro';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';



/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService],
 
})
export class LoginPage {
  
  service: any;
  nav: any;
  usercreds: any;
  results: any=[];

  loading: Loading;
  iconname: any;
  status: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modelCtrl: ModalController, public alertCtrl: AlertController, public platform: Platform, public authservice: AuthService,public loadingCtrl: LoadingController, public globalVar: GlobalVariables, public storage: Storage, public toastCtrl: ToastController) {
    this.usercreds = {
      username: '',
      password: ''
    }
    this.iconname = 'eye';
    this.service = authservice;
    this.nav = navCtrl;
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let alert = this.alertCtrl.create({
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

  ionViewDidLoad(){
    this.storage.get('intro-done').then(done => {
      if(!done){
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
      }
    });
  }

  showPassword(input: any): any {
   input.type = input.type === 'password' ?  'text' : 'password';
   this.iconname = this.iconname === 'eye' ? 'eye-off' : 'eye';
  }

  presentResetPassordModal(){
    let modal = this.modelCtrl.create(ResetPasswordPage);
    modal.present();
  }
  login(user){
    this.showAuthenticating();
    if(user.username == "" || user.password == ""){
      this.presentToast();
    }else{
      this.service.authenticate(user).then(data => {
        this.status = data.status;
        this.results = data;
        if(this.results.length > 0){
          this.globalVar.setMyGlobalVar(data[0].emplNum);
          this.loading.dismiss();
          this.storage.ready().then(()=>{
            this.storage.set('logged-in', true);
          });
          this.nav.setRoot(TabsPage);
        }else{
          this.presentFailedToast();
        }
  
      });
    }   
  }

   presentToast(){
     setTimeout(() =>{
          this.loading.dismiss();
        })
        let toast = this.toastCtrl.create({
          message: 'All fields are required',
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
          message: 'Either the Username and Password combination is incorrect Or the credentials entered do not exist.',
          showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'bottom'
        });
        toast.present();
      }

      showAuthenticating(){
        this.loading = this.loadingCtrl.create({
          spinner: 'dots',
          content: 'Authencating...'
        });
        this.loading.present();
      }

}
