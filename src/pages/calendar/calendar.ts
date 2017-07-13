import { Component } from '@angular/core';
import {Platform, NavController, NavParams, AlertController, ViewController, LoadingController, Loading} from 'ionic-angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { GlobalVariables } from '../../providers/global-variables';
import { Storage } from '@ionic/storage';
import { LoadLeave } from '../../providers/load-leaves';

/*
  Generated class for the Calendar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers:[LoadLeave]
})
export class CalendarPage {

  eventSource;
  viewTitle;
  isToday:boolean;
  loading: Loading;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController, private globalVar: GlobalVariables, public storage: Storage, public loadData: LoadLeave) {
     this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let alert = this.alertCtrl.create({
            title: 'Exit LMS',
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

  loadEvents(){
    this.showLoading();
    this.loadData.reload().then(data => {
        this.loading.dismiss();
        this.eventSource = data;
    });
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onEventSelected(event){
    console.log('Event selected: ' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode){
    this.calendar.mode = mode;
  }

  today(){
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev){
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event:Date){
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents(){
    var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
  }

  onRangeChanged(ev) {
        //console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

  ionViewDidLoad() {
    this.showLoading();
    this.loadData.load().then(data => {
      
        this.loading.dismiss();
        this.eventSource = data;
        
    });
    //console.log('ionViewDidLoad CalendarPage');
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

  showLoading(){
      this.loading = this.loadingCtrl.create({
        content: 'Loading...' 
      });
      this.loading.present();
    }

}
