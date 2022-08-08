import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { ResetComponent } from '../reset/reset.component';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit { 
  public successResponseArray   : any[]=[];
  public errorResponseArray     : any[]=[];
  public userArray            : any[]=[];
  public searchTerm : string='';
  public showLoadMore   : boolean=true;
  test: Subscription;
  public action :any;
  public detail : any;
  viewaction : any;
  constructor(private dialogService: NbDialogService,
    private router: Router,
    public config:ConfigService,
    public http: HttpClient,
    private menuService: NbMenuService
  ) { 
    this.config.checkAccesswith404('user-profile');
  }
  ngOnInit(): void {
  	this.detail = [];
  	this.loadData();
  }
  loadData () {
  	this.http.put(this.config.apiUrl+'v1/user/view/user_get',{
      token : this.config.doDecrypt(localStorage.getItem('token')),
       id : this.config.doDecrypt(localStorage.getItem('userId')),
       roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
    })
    .subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);
        this.successResponseArray=[];
        this.successResponseArray.push(response);
        if(this.successResponseArray[0]['Status'] == this.config.OTYES){
          this.detail=this.successResponseArray[0]['Data'][0];
         
        }else{
          this.config.showErrorToaster('Authentication Faild..!');
        }
      },
      (error)=>{
        console.log(error);
        this.config.showErrorToaster('Network error occured..!');
      }
    );
  }
  edit () {
      this.viewaction = this.dialogService.open(EditprofileComponent,{context:{'detail':this.detail}})
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
        this.loadData();
        this.config.delay(100);
      });
  }
  changepass () {
      this.viewaction = this.dialogService.open(ResetComponent,{context:{'detail':this.detail}})
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
      });
  }
}
