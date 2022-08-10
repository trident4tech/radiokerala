import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../../config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { ViewsurComponent } from '../viewsur/viewsur.component';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Observable } from 'rxjs';
import { NbMenuService, NbMenuItem } from '@nebular/theme';


@Component({
  selector: 'ngx-surveylist',
  templateUrl: './surveylist.component.html',
  styleUrls: ['./surveylist.component.scss']
})
export class SurveylistComponent implements OnInit {  
  public successResponseArray: any[] = [];
  public errorResponseArray: any[] = [];
  public searchTerm: string = '';
  public showLoadMore: boolean = true;
  public action: any;
  public viewaction: any;
  actionitems: any[];
  qual:any[];


  constructor( private menuService: NbMenuService,private dialogService: NbDialogService,
    private router: Router,
    public config: ConfigService,
    public http: HttpClient
  ) {
    
  }

  ngOnInit(): void {
    this.actionitems = [];
    this.qual = [];
    this.qual[0] = '';
    this.qual[1] = 'Very Good';
    this.qual[2] = 'Good';
    this.qual[3] = 'Poor';
    this.loadData();
    this.actionitems.push({ title: 'View' ,icon: 'eye-outline'});
    this.actionitems.push({ title: 'Delete' ,icon: 'trash'});    
  }
  loadData() {
      this.config.targeturl = this.config.apiUrl+'v1/survey/list';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
       userid:userId,
      p:this.config.itemsPerPage,
      token: this.config.doDecrypt(localStorage.getItem('token'))
    };   
    this.http.post(this.config.targeturl,this.config.postdata).subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);
        this.successResponseArray=[];
        this.successResponseArray.push(response);
        this.config.itemdata=response['Data']['data'];
        this.config.generatePaging(this.successResponseArray[0]['Data'],this.config.apiUrl+'v1/survey/list');        
      },
      (error)=>{
        console.log(error);
      }
    );
}

  doSearch() {
   /* let userId = this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
      p: this.config.itemsPerPage,
      token: this.config.doDecrypt(localStorage.getItem('token')),
      roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
      searchTerm: this.searchTerm,
      destId: this.dest,
      role: this.role,
    };
    this.http.post(this.config.targeturl, this.config.postdata)
      .subscribe(
        (response) => {
          this.config.checkStatus(response['Status'], response['version']);
          this.config.itemdata = response['Data']['data'];
          this.config.generatePaging(this.successResponseArray[0]['Data'], this.config.apiUrl + 'v1/user/view');

        },
        (error) => {
          console.log(error);
        }
      );*/
  }

  changeaction(detail) {
    var data = {};
    data['id'] = detail.sr_id;
    this.action = this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title == 'Delete') {
        this.config.confirm('Survey', 'v1/survey/delete', data);
      }
      else if (event.item.title == 'View') {
        this.view(detail);
      }
      this.action.unsubscribe();
    });
  }
  view(detail) {
    this.viewaction = this.dialogService.open(ViewsurComponent, { context: { detail } })
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
      });
  }
}