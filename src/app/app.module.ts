import { DatePipe } from '@angular/common/src/pipes/date_pipe';
import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { ReportPage } from '../pages/report/report';
import { CancelPage } from '../pages/cancel/cancel';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LeavePage } from '../pages/leave/leave';
import { IntroPage } from '../pages/intro/intro';
import { HistoryPage } from '../pages/history/history';
import { PopoverPage } from '../pages/popover/popover';
import { AuthService } from '../providers/auth-service';
import { GlobalVariables } from '../providers/global-variables';
import { SendData } from '../providers/send-data';
import { LoadProfile } from '../providers/load-profile';
import { LoadFullReport } from '../providers/load-full-report';
import { LoadLeaveCancel } from '../providers/load-leave-cancel';
import { LoadLeaveTypes } from '../providers/load-leave-types';
import { LoadSummary } from '../providers/load-summary';
import { InfoPage } from '../pages/info/info';
import { AboutPage } from '../pages/about/about';
import { PasswordPage } from '../pages/password/password';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import  { ConnectionPage } from '../pages/connection/connection';

@NgModule({
  declarations: [
    MyApp,
    ReportPage,
    CancelPage,
    ProfilePage,
    HomePage,
    LoginPage,
    LeavePage,
    IntroPage,
    HistoryPage,
    PopoverPage,
    InfoPage,
    AboutPage,
    PasswordPage,
    ResetPasswordPage,
    ConnectionPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReportPage,
    CancelPage,
    ProfilePage,
    HomePage,
    LoginPage,
    LeavePage,
    IntroPage,
    HistoryPage,
    PopoverPage,
    InfoPage,
    AboutPage,
    PasswordPage,
    ResetPasswordPage,
    ConnectionPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GlobalVariables, Storage, DatePipe]
})
export class AppModule {}
