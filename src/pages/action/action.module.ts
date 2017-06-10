import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Action } from './action';

@NgModule({
  declarations: [
    Action,
  ],
  imports: [
    IonicPageModule.forChild(Action),
  ],
  exports: [
    Action
  ]
})
export class ActionModule {}
