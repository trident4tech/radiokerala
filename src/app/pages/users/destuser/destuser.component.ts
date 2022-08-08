import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AddComponent } from '../add/add.component';
import { ViewComponent } from '../view/view.component';
import { EditComponent } from '../edit/edit.component';
import { ResetComponent } from '../reset/reset.component';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'ngx-admin',
  templateUrl: './destuser.component.html',
  styleUrls: ['./destuser.component.scss']
})
export class DestuserComponent implements OnInit {  
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
  actionitems : any[];
    
@ViewChild('item', { static: true }) accordion;
@ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  constructor(private dialogService: NbDialogService,
    private router: Router,
    public config:ConfigService,
    public http: HttpClient,
    private menuService: NbMenuService
  ) { 
    this.config.checkAccesswith404('userlist');
  }


  toggle() {
    this.accordion.toggle();
  }
  ngOnInit(): void {
    this.actionitems = []; 
    if (this.config.checkAccess('acl-user') ) {
      this.actionitems.push({ title: 'ACL Config' ,icon: 'cube'});
    }
    if (this.config.checkAccess('user/edit') ) {
      this.actionitems.push({ title: 'Edit' ,icon: 'edit'});
    }
    if (this.config.checkAccess('viewuser') ) {
      this.actionitems.push({ title: 'View' ,icon: 'eye-outline'});
    }
    if (this.config.checkAccess('user/changepass') ) {
      this.actionitems.push({ title: 'Reset Password' ,icon: 'refresh'});
    }
    if (this.config.checkAccess('user/changestatus') ) {
      this.actionitems.push({ title: 'Change Status' ,icon: 'cube'});
    }
    if (this.config.checkAccess('user/delete') ) {
      this.actionitems.push({ title: 'Delete' ,icon: 'trash'});
    }
     this.loadData();
  }
  loadData() {
     this.config.targeturl = this.config.apiUrl+'v1/user/view';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
      p:this.config.itemsPerPage,
      token: this.config.doDecrypt(localStorage.getItem('token')),
      roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
      destId:localStorage.getItem('destId'),
    };
     this.http.post(this.config.targeturl,this.config.postdata)
    .subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);
        this.successResponseArray=[];
        this.successResponseArray.push(response);
        this.config.itemdata=response['Data']['data'];
        this.loadMore=this.successResponseArray[0]['Data']['next_page_url'];
this.config.generatePaging(this.successResponseArray[0]['Data'],this.config.apiUrl+'v1/user/view'); 
       
      },
      (error)=>{
        this.config.showErrorToaster(error);
      }
    ); 
  }
  doSearch() {
       let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
      p:this.config.itemsPerPage,
      token: this.config.doDecrypt(localStorage.getItem('token')),
      roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
      destId:localStorage.getItem('destId'),
        searchTerm : this.searchTerm,
    };
     this.http.post(this.config.targeturl,this.config.postdata)
      .subscribe(
        (response) => {this.config.checkStatus(response['Status'],response['version']);
         this.config.itemdata=response['Data']['data'];
         this.config.generatePaging(this.successResponseArray[0]['Data'],this.config.apiUrl+'v1/user/view'); 

        },
        (error)=>{
          console.log(error);
        }
      );
    }

    async add(){
      this.viewaction =this.dialogService.open(AddComponent,{context:{'destOnly':this.config.OTYES}})
      .onClose.subscribe(() => {
         this.config.pageload(false,true);
        this.viewaction.unsubscribe();
      });
  }
    changeaction (detail) {
      var data = {};
      data['id'] = detail.usr_id;
      data['token']=this.config.doDecrypt(localStorage.getItem('token'));
      data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
      this.action = this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title=='Delete') {
         this.config.confirm('User','v1/user/delete',data);         
      }
      else if (event.item.title=='View') {
         this.view(detail);
      }
      else if (event.item.title=='Change Status') {
        this.changestatus(detail);
       }
      else if (event.item.title=='Reset Password') {
         this.reset(detail);
      }
      else if (event.item.title=='Edit') {
         this.edit(detail);
      }
      else if (event.item.title=='ACL Config') {
        this.config.acluserid = detail.usr_id;
        this.config.aclroleid = detail.role_id;
        this.config.aclusername = detail.usr_user_name;
         this.router.navigate(['/pages/acluser']);
      }
       this.action.unsubscribe();
      }); 
    }
    view (detail) {
      this.viewaction = this.dialogService.open(ViewComponent,{context:{detail}})
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
      });
      //this.viewaction.componentInstance.user = detail;
    }
    changestatus (detail) {
        var data = {};
        data['id'] = detail.usr_id;
        data['token']=this.config.doDecrypt(localStorage.getItem('token'));
        data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
         data['status'] = this.config.OTYES;
        let title ='Are you sure you want to enable the user?'
        if (detail.status==this.config.OTYES) {
          data['status'] = this.config.OTNO;
          title ='Are you sure you want to disable the user?'
        }
        this.config.confirmstatus('User','v1/user/status',data,title,data['status']);         
      
    }
     reset (detail) {
      this.viewaction = this.dialogService.open(ResetComponent,{context:{detail}})
      .onClose.subscribe(() => {
        this.config.pageload();
        this.viewaction.unsubscribe();
      });
      //this.viewaction.componentInstance.user = detail;
    }
    edit (detail) {
      this.viewaction = this.dialogService.open(EditComponent,{context:{'detail':detail,'destOnly':this.config.OTYES}})
      .onClose.subscribe(() => {
       this.config.pageload(); 
        this.viewaction.unsubscribe();
      });
      //this.viewaction.componentInstance.user = detail;
    }
}