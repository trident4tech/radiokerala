import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/main/main.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AdminComponent } from './users/admin/admin.component';
import { LogoutComponent } from './users/logout/logout.component';
import { BookingComponent } from './ticket/booking/booking.component';
import { SummaryComponent } from './ticket/summary/summary.component';
import { TemplateComponent } from './template/template.component';
import { NewbookingComponent } from './newbooking/newbooking.component';
import { MisdashboardComponent } from './tickets/misdashboard/misdashboard.component';
import { CounterlistComponent } from './tickets/counterlist/counterlist.component';
import { HistoryComponent } from './tickets/history/history.component';
import { OfflineComponent } from './tickets/offline/offline.component';
import { ListComponent } from './master/list/list.component';
import { DestuserComponent } from './users/destuser/destuser.component';
import { LinkuserComponent } from './users/linkuser/linkuser.component';
import { ClasslistComponent } from './tickets/classlist/classlist.component';
import { ClasslistComponent as list } from './tickets/classlist1/classlist.component';
import { AddclassComponent } from './tickets/addclass/addclass.component';
import { ViewclassComponent } from './tickets/viewclass/viewclass.component';
import { EditclassComponent } from './tickets/editclass/editclass.component';
import { ProfileComponent } from './users/profile/profile.component';
import { EditprofileComponent } from './users/editprofile/editprofile.component';
import { RolesComponent } from './acl/roles/roles.component';
import { CategoriesComponent } from './acl/categories/categories.component';
import { AlldestinationsComponent } from './ticket/alldestinations/alldestinations.component';
import { VerificationComponent } from './ticket/verification/verification.component';
import { PackageComponent } from './ticket/package/package.component';
import { VerificationsComponent } from './tickets/verifications/verifications.component';
import { DayreportComponent } from './tickets/dayreport/dayreport.component';
import { DaywisereportComponent } from './tickets/daywisereport/daywisereport.component';
import { SalesComponent } from './tickets/sales/sales.component';
import { MonthreportComponent } from './tickets/monthreport/monthreport.component';
import { FinancialComponent } from './tickets/financial/financial.component';
import { ListconstantsComponent  } from './listconstants/listconstants.component';
import { MobileComponent } from './ticket/mobile/mobile.component';
import { TicketdataComponent } from './ticket/ticketdata/ticketdata.component';
import { UsraclComponent } from './acl/usracl/usracl.component';
import { CollectionComponent } from './accounts/collection/collection.component';
import { EntryComponent } from './accounts/entry/entry.component';
import { AccessComponent } from './acl/access/access.component';
import { MobComponent } from './tickets/mob/mob.component';
import { DayreportobComponent } from './tickets/dayreportob/dayreportob.component';
import { DailyincomeComponent } from './tickets/dailyincome/dailyincome.component';
import { InvalidComponent } from './tickets/invalid/invalid.component';
//import { ClassorderComponent } from './tickets/classorder/classorder.component';
//import { DestlistComponent } from './destination/destlist/destlist.component';
//import { DestaddComponent } from './destination/destadd/destadd.component';
//import { DestviewComponent } from './destination/destview/destview.component';
//import { DesteditComponent } from './destination/destedit/destedit.component';
import { ClassorderComponent } from './tickets/classorder/classorder.component';
import { DestlistComponent } from './destination/destlist/destlist.component';
import { DestaddComponent } from './destination/destadd/destadd.component';
import { DestviewComponent } from './destination/destview/destview.component';
import { DesteditComponent } from './destination/destedit/destedit.component';
import { WeatheralertComponent } from './tickets/weatheralert/weatheralert.component';
import { WeatheraddComponent } from './tickets/weatheradd/weatheradd.component';
import { WeatherviewComponent } from './tickets/weatherview/weatherview.component';
import { WeathereditComponent } from './tickets/weatheredit/weatheredit.component';



import { AddComponent } from './dangeralert/add/add.component';
import { ListComponent as alertList } from './dangeralert/list/list.component';
import { SurveylistdraftComponent } from './surveylistdraft/surveylistdraft.component'

import { AddComponent as gpAdd } from './gp/add/add.component'
import { ListComponent as listgp  } from './gp/list/list.component';
import { EditComponent as gpedit } from './gp/edit/edit.component';

import { AddComponent as assemblyAdd  } from './assembly/add/add.component';
import { EditComponent as assemblyEdt } from './assembly/edit/edit.component';
import {  ListComponent as assemblyList } from './assembly/list/list.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [    
    
    {
      path: 'newsurvey',
      component: ListconstantsComponent,
    },
    {
      path : 'listdraft/:reference',
      component : SurveylistdraftComponent,

    },
    {
      path : 'editsurvey',
      component :AddComponent,
    },
    {
      path : 'districtadd',
      component :DestaddComponent,
    },
    {
      path : 'districtlist',
      component :DestlistComponent,
    },
    {
      path : 'listgp',
      component :listgp,
    },
    {
      path : 'listassembly',
      component :assemblyList,
    },
    {
      path: 'admin',
      component: AdminComponent,
    },
    {
      path: 'usergroup',
      component: ClasslistComponent,
    }, 
    {
      path: 'role',
      component: list,
    }, 
    
    {
      path: 'logout',
      component: LogoutComponent,
    },
    {
      path: 'aclrole',
      component: RolesComponent,
    }, 
    {
      path: 'aclcategories/:reference',
      component: CategoriesComponent,
    }, 
    
    /*{
      path: 'dashboard',
      component: MainComponent,
    },
    
    {
      path : 'listalert',
      component :alertList,
    },
   
    {
      path: 'misdashboard',
      component: MisdashboardComponent,
    },   
    {
      path: 'admin',
      component: AdminComponent,
    },
    {
      path: 'dayreportob',
      component: DayreportobComponent,
    }, 
    {
      path: 'dailyincome',
      component: DailyincomeComponent,
    },  
    {
      path: 'invalid',
      component: InvalidComponent,
    },     
    {
      path: 'logout',
      component: LogoutComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'ticketdata',
      component: TicketdataComponent,
    },
    {
      path: 'booking',
      component: BookingComponent,
    },
    {
      path: 'mob',
      component: MobComponent,
    },
    {
      path: 'ticketsummary',
      component: SummaryComponent,
    },
    {
      path: 'mobile',
      component: MobileComponent,
    },
    {
      path: 'template',
      component: TemplateComponent,
    },
    {
      path: 'newsurvey',
      component: ListconstantsComponent,
    },
    {
      path: 'newbooking',
      component: NewbookingComponent,
    },
     {
      path: 'counterlist',
      component: CounterlistComponent,
    },
     {
      path: 'history',
      component: HistoryComponent,
    },
    {
      path: 'offline',
      component: OfflineComponent,
    }, 
    {
      path: 'dayreport',
      component: DayreportComponent,
    },
    {
      path: 'access',
      component: AccessComponent,
    },
    {
      path: 'financial',
      component: FinancialComponent,
    },
    {
      path: 'daywisereport',
      component: DaywisereportComponent,
    }, 
    {
      path: 'sales',
      component: SalesComponent,
    },  
    {
      path: 'monthreport',
      component: MonthreportComponent,
    }, 
    {
      path: 'master/:segment',
      component: ListComponent,
    }, 
    {
      path: 'destuser',
      component: DestuserComponent,
    }, 
    {
      path: 'linkuser/:id',
      component: LinkuserComponent,
    },  
    {
      path: 'ticketclass',
      component: ClasslistComponent,
    }, 
    {
      path: 'viewclass',
      component: ViewclassComponent,
    }, 
    /*{
      path: 'destinationlist',
      component: DestlistComponent,
    }, 
    {
      path: 'destview',
      component: DestviewComponent,
    }, 
    {
      path: 'destedit',
      component: DesteditComponent,
    }, 
    
    {
      path: 'weatheralert',
      component: WeatheralertComponent,
    },
    {
      path: 'weatherview',
      component: WeatherviewComponent,
    },
    {
      path: 'weatheredit',
      component: WeathereditComponent,
    }, 
     {
      path: 'profile',
      component: ProfileComponent,
    },
     {
      path: 'editprofile',
      component: EditprofileComponent,
    },
     {
      path: 'alldestinations',
      component: AlldestinationsComponent,
    },
     {
      path: 'verification',
      component: VerificationComponent,
    },
    {
      path: 'verifications',
      component: VerificationsComponent,
    },
     {
      path: 'package',
      component: PackageComponent,
    },
     {
      path: 'editclass',
      component: EditclassComponent,
    },  
     {
      path: 'aclrole',
      component: RolesComponent,
    }, 
    {
      path: 'aclcategories/:reference',
      component: CategoriesComponent,
    }, 
    {
      path: 'acluser/:id/:role/:name',
      component: UsraclComponent,
    }, 
    {
      path: 'accounts/collection',
      component: CollectionComponent,
    },
    {
      path: 'accounts/entry',
      component: EntryComponent,
    },*/
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
