import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AdminComponent } from './users/admin/admin.component';
import { MatTableModule} from '@angular/material/table';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ContextMenuModule } from 'ngx-contextmenu';
import {ConnectionServiceModule} from 'ng-connection-service'; 
import { SlideToggleModule } from 'ngx-slide-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgAudioRecorderModule } from 'ng-audio-recorder';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, 
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbDialogModule,
  NbAccordionModule,
  NbContextMenuModule,
  NbAutocompleteModule,
  NbDatepickerModule,
  NbListModule,
  NbProgressBarModule,
  NbAlertModule,
  } from '@nebular/theme';

import { LogoutComponent } from './users/logout/logout.component';
import { AddComponent } from './users/add/add.component';
import { AddconstantsComponent } from '../../app/addconstants/addconstants.component';
import { ViewComponent } from './users/view/view.component';
import { BookingComponent } from './ticket/booking/booking.component';
import { SummaryComponent } from './ticket/summary/summary.component';
import { TemplateComponent } from './template/template.component';
import { NewbookingComponent } from './newbooking/newbooking.component';
import { AddbookingComponent } from './addbooking/addbooking.component';
import { DeleteComponent } from './delete/delete.component';
import { ConfirmComponent } from './tickets/confirm/confirm.component';
import { EditComponent } from './users/edit/edit.component';
import { ResetComponent } from './users/reset/reset.component';
import { MisdashboardComponent } from './tickets/misdashboard/misdashboard.component';
import { CounterlistComponent } from './tickets/counterlist/counterlist.component';
import { HelpComponent } from './help/help.component';
import { HistoryComponent } from './tickets/history/history.component';
import { OfflineComponent } from './tickets/offline/offline.component';
import { ListComponent } from './master/list/list.component';
import { MasteraddComponent } from './master/masteradd/masteradd.component';
import { MasterviewComponent } from './master/masterview/masterview.component';
import { MastereditComponent } from './master/masteredit/masteredit.component';
import { DestuserComponent } from './users/destuser/destuser.component';
import { LinkuserComponent } from './users/linkuser/linkuser.component';
import { ClasslistComponent } from './tickets/classlist/classlist.component';
import { AddclassComponent } from './tickets/addclass/addclass.component';
import { ViewclassComponent } from './tickets/viewclass/viewclass.component';
import { EditclassComponent } from './tickets/editclass/editclass.component';
import { EditclassComponent as Editrole } from './tickets/editclass1/editclass.component';
import { ProfileComponent } from './users/profile/profile.component';
import { EditprofileComponent } from './users/editprofile/editprofile.component';
import { RolesComponent } from './acl/roles/roles.component';
import { CategoriesComponent } from './acl/categories/categories.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AlldestinationsComponent } from './ticket/alldestinations/alldestinations.component';
import { VerificationComponent } from './ticket/verification/verification.component';
import { PackageComponent } from './ticket/package/package.component';
import { VerificationsComponent } from './tickets/verifications/verifications.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { DayreportComponent } from './tickets/dayreport/dayreport.component';
import { CancelComponent } from './tickets/cancel/cancel.component';
import { DaywisereportComponent } from './tickets/daywisereport/daywisereport.component';
import { SalesComponent } from './tickets/sales/sales.component';
import { MonthreportComponent } from './tickets/monthreport/monthreport.component';
import { FinancialComponent } from './tickets/financial/financial.component';
import { ListconstantsComponent } from './listconstants/listconstants.component';
import { ScheduledconstantsComponent } from './scheduledconstants/scheduledconstants.component';
import { MobileComponent } from './ticket/mobile/mobile.component';
import { TicketdataComponent } from './ticket/ticketdata/ticketdata.component';
import { UsraclComponent } from './acl/usracl/usracl.component';
import { CollectionComponent } from './accounts/collection/collection.component';
import { EntryComponent } from './accounts/entry/entry.component';
import { AccessComponent } from './acl/access/access.component';
import { MobComponent } from './tickets/mob/mob.component';
import { TicketmodComponent } from './tickets/ticketmod/ticketmod.component';
import { CashComponent } from './tickets/cash/cash.component';
import { DayreportobComponent } from './tickets/dayreportob/dayreportob.component';
import { DailyincomeComponent } from './tickets/dailyincome/dailyincome.component';
import { InvalidComponent } from './tickets/invalid/invalid.component';
import { ClassorderComponent } from './tickets/classorder/classorder.component';
import { ChangedateComponent } from './tickets/changedate/changedate.component';
import { DestlistComponent } from './destination/destlist/destlist.component';
import { DestaddComponent } from './destination/destadd/destadd.component';
import { DestviewComponent } from './destination/destview/destview.component';
import { DesteditComponent } from './destination/destedit/destedit.component';
import { AddComponent as alertradd }  from '../pages/dangeralert/add/add.component'
import { ListComponent as listalert  }  from '../pages/dangeralert/list/list.component'

import { ViewComponent as alertview  }  from '../pages/dangeralert/view/view.component'
import { EditComponent as editAlert  }  from '../pages/dangeralert/edit/edit.component'

import { WeatheralertComponent } from './tickets/weatheralert/weatheralert.component';
import { WeatheraddComponent } from './tickets/weatheradd/weatheradd.component';
import { WeatherviewComponent } from './tickets/weatherview/weatherview.component';
import { WeathereditComponent } from './tickets/weatheredit/weatheredit.component';
import { SurveylistdraftComponent } from './surveylistdraft/surveylistdraft.component';

import { AddComponent as gpAdd } from './gp/add/add.component'
import { ListComponent as listgp  } from './gp/list/list.component';
import { EditComponent as gpedit } from './gp/edit/edit.component';

import { AddComponent as assemblyAdd  } from './assembly/add/add.component';
import { EditComponent as assemblyEdt } from './assembly/edit/edit.component';
import {  ListComponent as assemblyList } from './assembly/list/list.component';

import { ClasslistComponent as clslist } from './tickets/classlist1/classlist.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    MatTableModule,
    NbButtonModule,
    ngFormsModule,
    NbActionsModule,
    NbCardModule,
    NbCheckboxModule, 
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbAlertModule,
    NbSelectModule,
    NbUserModule,
    NbAccordionModule,
    NbContextMenuModule,
    NbAutocompleteModule,
    NbDatepickerModule,
    ConnectionServiceModule,
    SlideToggleModule,
    NbListModule,
    NbProgressBarModule,
    QRCodeModule,
    ZXingScannerModule,
     ContextMenuModule.forRoot() ,
     DragDropModule,
     NgAudioRecorderModule
    //NbDialogModule.forChild(config),
  ],
  declarations: [
    PagesComponent,
    AdminComponent,
    LogoutComponent,
    AddComponent,
    AddconstantsComponent,
    ViewComponent,
    BookingComponent,
    SummaryComponent,
    TemplateComponent,
    NewbookingComponent,
    AddbookingComponent,
    DeleteComponent,
    ConfirmComponent,
    EditComponent,
    ResetComponent,
    MisdashboardComponent,
    CounterlistComponent,
    HelpComponent,
    HistoryComponent,
    OfflineComponent,
    ListComponent,
    MasteraddComponent,
    MasterviewComponent,
    MastereditComponent,
    DestuserComponent,
    LinkuserComponent,
    ClasslistComponent,
    clslist,
    AddclassComponent,
    ViewclassComponent,
    EditclassComponent,
    Editrole,
    ProfileComponent,
    EditprofileComponent,
    RolesComponent,
    CategoriesComponent,
    AlldestinationsComponent,
    VerificationComponent,
    PackageComponent,
    VerificationsComponent,
    DayreportComponent,
    CancelComponent,
    DaywisereportComponent,
    SalesComponent,
    MonthreportComponent,
    FinancialComponent,
    ListconstantsComponent,
    ScheduledconstantsComponent,
    MobileComponent,
    TicketdataComponent,
    UsraclComponent,
    CollectionComponent,
    EntryComponent,
    AccessComponent,
    MobComponent,
    TicketmodComponent,
    CashComponent,
    DayreportobComponent,
    DailyincomeComponent,
    InvalidComponent,
    ClassorderComponent,
    ChangedateComponent,
    DestlistComponent,
    DestaddComponent,
    DestviewComponent,
    DesteditComponent,
    alertradd,
    listalert,
    alertview,
    editAlert,
    WeatheralertComponent,
    WeatheraddComponent,
    WeatherviewComponent,
    WeathereditComponent,
    SurveylistdraftComponent,
    gpAdd,
    gpedit,
    listgp,
    assemblyAdd,
    assemblyEdt,
    assemblyList,
  ],
})
export class PagesModule {
}
