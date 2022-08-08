import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { WeatheraddComponent } from '../weatheradd/weatheradd.component';
import { WeatherviewComponent } from '../weatherview/weatherview.component';
import { WeathereditComponent } from '../weatheredit/weatheredit.component';


@Component({
  selector: 'ngx-weatheralert',
  templateUrl: './weatheralert.component.html',
  styleUrls: ['./weatheralert.component.scss']
})
export class WeatheralertComponent implements OnInit {
      public waitingForServer       : boolean=true;    
    public successResponseArray   : any[]=[];
    public errorResponseArray     : any[]=[];
    public userArray            : any[]=[];
    public searchTerm : string='';
    public showLoadMore   : boolean=true;
    test: Subscription;
    public loadMore : string;
    public action :any;
    public viewaction :any;
    public ticketArray            : any[]=[];
    actionitems : any[];

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
    constructor(private dialogService: NbDialogService,
      private router: Router,
      public config:ConfigService,
      public http: HttpClient,
      private menuService: NbMenuService
    ) { 
     //this.config.checkAccesswith404('pages/weatheralert'); 
    }

  ngOnInit() {
     this.actionitems = []; 
    //if (this.config.checkAccess('pages/weatherview') ) {
      this.actionitems.push({ title: 'View' ,icon: 'eye-outline'});
    //}
    if (this.config.checkAccess('pages/weatheredit') ) {
      this.actionitems.push({ title: 'Edit' ,icon: 'edit'});
    }
    if (this.config.checkAccess('pages/weatherstatus') ) {
      this.actionitems.push({ title: 'Change Status' ,icon: 'cube'});
    }
    //if (this.config.checkAccess('pages/weatherdelete') ) {
      this.actionitems.push({ title: 'Delete' ,icon: 'trash'});
    //}
     this.loadData();
    }

  loadData() {
      this.config.targeturl = this.config.apiUrl+'v1/user/weatherList';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
       userid:userId,
      p:this.config.itemsPerPage,
      token: this.config.doDecrypt(localStorage.getItem('token')),
       roleid:this.config.doDecrypt(localStorage.getItem('roleId'))
    };  

    this.http.post(this.config.targeturl,this.config.postdata).subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);
        this.successResponseArray=[];
        this.successResponseArray.push(response);
        this.config.itemdata=response['Data']['data'];
        this.config.generatePaging(this.successResponseArray[0]['Data'],this.config.apiUrl+'v1/user/weatherList');        
      },
      (error)=>{
        console.log(error);
      }
    );
}


 async add(){
      this.viewaction = this.dialogService.open(WeatheraddComponent).onClose.subscribe(() => {
       this.config.pageload(false,true);
        this.viewaction.unsubscribe();
      });      

  }
  
  changeaction (detail) {
      var data = {};
      data['waid'] = detail.wa_id;
      data['token']=this.config.doDecrypt(localStorage.getItem('token'));
      data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
      this.action = this.menuService.onItemClick().subscribe((event) => {

      if (event.item.title=='Delete') {
         this.config.confirm('Weather alert','v1/user/delete_weather',data);         
      }
      else if (event.item.title=='View') {
        this.view(detail);
      }
      else if (event.item.title=='Change Status') {
        //this.changestatus(detail);
       }
       else if (event.item.title=='Edit') {
        this.edit(detail);
      }      
       this.action.unsubscribe();
      }); 
    }
    
     view (detail) {
      this.viewaction = this.dialogService.open(WeatherviewComponent,{context:{detail}})
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
      });
    } 

    /*changestatus (detail) {
        var data = {};
        data['primary'] = detail.wa_id;
        data['token']=this.config.doDecrypt(localStorage.getItem('token'));
        data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
         data['status'] = this.config.OTYES;
        let title ='Are you sure you want to enable the Destination?';
        if (detail.status==this.config.OTYES) {
          data['status'] = this.config.OTNO;
          title ='Are you sure you want to disable the Destination?';
        }
        this.config.confirmstatus('Destination','v1/user/changeweatherstatus',data,title,data['status']);         
    } */
    
    edit (detail) {
      this.viewaction = this.dialogService.open(WeathereditComponent,{context:{'detail':detail}})
      .onClose.subscribe(() => {
        this.config.pageload();
        this.viewaction.unsubscribe();
      });
    }
    

}