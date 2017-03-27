import { disconnect } from 'cluster';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, Nav, App, ToastController} from 'ionic-angular';
import { StatusBar, Splashscreen, Network } from 'ionic-native';
import { AuthService } from '../providers/auth-service';
import { GlobalVariables } from '../providers/global-variables';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/info/info';
import { IntroPage } from '../pages/intro/intro';
import { AboutPage } from '../pages/about/about';
import { PasswordPage } from '../pages/password/password';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage;
  pages: Array<{title: string, icon: any, component: any}>;

  constructor(public platform: Platform, public storage: Storage, public app: App, private globalVar: GlobalVariables, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.hideSplashScreen();

      this.storage.ready().then(() =>{
        var networkState = navigator.onLine;
        console.log(networkState);
        if(networkState == true){
           this.storage.get('logged-in').then((val) => {
            console.log(val);
            if(val == false || this.globalVar.getMyGlobalVar() == ""){
              this.rootPage = LoginPage;
            }else{
              this.rootPage = TabsPage;
            }
          });
        }else{
          var x = 'You are offline!!!';
          this.presentToast(x);
        }
        let disconnect = Network.onDisconnect().subscribe(()=>{
          var x = 'You are now offline!!!';
          this.presentToast(x);
        });

        let connect = Network.onConnect().subscribe(()=>{
          var x = 'You are back online!!!';
          this.presentToast(x);
        });
       
      });
      
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', icon: 'cog', component: TabsPage },
      { title: 'About LMS', icon: 'information-circle', component: AboutPage },
      { title: 'Profile', icon: 'person', component: ProfilePage },
      { title: 'Tutorial', icon: 'help-buoy', component: IntroPage },
      { title: 'Change Password', icon: 'key', component: PasswordPage },
      { title: 'Help', icon: 'help-circle', component: InfoPage }
    ];
  }

   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
      this.globalVar.setMyGlobalVar("");
      this.storage.set("logged-in", false);
      this.app.getRootNav().setRoot(LoginPage);
    }

    presentToast(x){
      let toast = this.toastCtrl.create({
        message: x,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }

  hideSplashScreen(){
    if(Splashscreen){
      setTimeout(()=>{
        Splashscreen.hide();
      }, 100);
    }
  }
}
