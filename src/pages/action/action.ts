import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the Action page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class Action {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Action');
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
