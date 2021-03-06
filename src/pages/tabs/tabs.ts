import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ReportPage } from '../report/report';
import { CancelPage } from '../cancel/cancel';
import { CalendarPage } from '../calendar/calendar';
import { Action } from '../action/action';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ReportPage;
  tab3Root: any = CancelPage;

  constructor() {

  }
}
