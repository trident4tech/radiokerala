import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AddComponent } from '../add/add.component';
import { ViewComponent } from '../view/view.component';
import { EditComponent } from '../edit/edit.component';
import { ResetComponent } from '../reset/reset.component';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Observable } from 'rxjs';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { ConfirmComponent } from '../../tickets/confirm/confirm.component';


@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menu = [];
  public roles: any = [];
  public role: string = '';
  public waitingForServer: boolean = true;
  public successResponseArray: any[] = [];
  public errorResponseArray: any[] = [];
  public userArray: any[] = [];
  //data$:Observable<any>;  
  public searchTerm: string = '';
  public showLoadMore: boolean = true;
  test: Subscription;
  public loadMore: string;
  public action: any;
  public viewaction: any;
  actionitems: any[];
  public dest: string = '';
  public destinations: any[] = [];
  @ViewChild('item', { static: true }) accordion;

  displayedColumns: string[] = ['slno', 'usr_name', 'usr_user_name', 'email', 'usr_mobile', 'ugrp_name', 'dest_name', 'name', 'action'];

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  constructor(private nbMenuService: NbMenuService, private dialogService: NbDialogService,
    private router: Router,
    public config: ConfigService,
    public http: HttpClient,
    private menuService: NbMenuService
  ) {
    this.config.checkAccesswith404("User Management");
  }


  toggle() {
    this.accordion.toggle();
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "masterlist");
    formData.append('type', "user");
    this.http.post(this.config.apiUrl, formData)
      .subscribe((response) => {
        if (response['status'] == this.config.OTYES) {
          this.successResponseArray.push(response);
          this.config.itemdata = response['data'];
        } else {

        }

      },
        (error) => {
          this.config.showErrorToaster('Network Error occured..');
        }
      );
  }

  doSearch() {
    let userId = this.config.doDecrypt(localStorage.getItem('userId'));
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
      );
  }

  async add() {
    this.viewaction = this.dialogService.open(AddComponent, { context: { 'destOnly': this.config.OTNO } })
      .onClose.subscribe(() => {
        this.loadData();
        this.viewaction.unsubscribe();
      });
  }
  changeDest(selectedValue: any) {
    this.dest = selectedValue;
    this.doSearch();
  }
  changeRole(selectedValue: any) {
    this.role = selectedValue;
    this.doSearch();
  }
  changeaction(detail) {
    var data = {};
    data['id'] = detail.usr_id;
    data['token'] = this.config.doDecrypt(localStorage.getItem('token'));
    data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
    this.action = this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title == 'Delete') {
        this.config.confirm('User', 'v1/user/delete', data);
      }
      else if (event.item.title == 'View') {
        this.view(detail);
      }
      else if (event.item.title == 'Change Status') {
        this.changestatus(detail);
      }
      else if (event.item.title == 'Reset Password') {
        this.reset(detail);
      }
      else if (event.item.title == 'Edit') {
        this.edit(detail);
      }
      else if (event.item.title == 'ACL Config') {
        this.config.acluserid = detail.usr_id;
        this.config.aclroleid = detail.role_id;
        this.config.aclusername = detail.usr_user_name;
        this.router.navigate(['/pages/acluser/' + encodeURIComponent(this.config.doEncrypt(detail.usr_id + '')) + '/' + encodeURIComponent(this.config.doEncrypt(detail.role_id + '')) + '/' + encodeURIComponent(this.config.doEncrypt(detail.usr_user_name))]);
      } else if (event.item.title == 'Unlink') {

        this.viewaction = this.dialogService.open(ConfirmComponent)
          .onClose.subscribe((status) => {
            if (status == this.config.OTYES) {
              this.http.post(this.config.apiUrl + 'v1/user/logout', {
                userid: detail.usr_id,
              })
                .subscribe(
                  (response) => {
                    this.config.showSuccessToaster('User has been successfully Unlinked from current device.');

                  });
            }
            this.viewaction.unsubscribe();
          });

      }
      this.action.unsubscribe();
    });
  }
  view(detail) {
    this.viewaction = this.dialogService.open(ViewComponent, { context: { detail } })
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
      });
    //this.viewaction.componentInstance.user = detail;
  }
  async changestatus(detail) {
    var data = {};
    data['id'] = detail.usr_id;
    data['token'] = this.config.doDecrypt(localStorage.getItem('token'));
    data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
    data['status'] = this.config.OTYES;
    let title = 'Are you sure you want to enable the user?'
    if (detail.status == this.config.OTYES) {
      data['status'] = this.config.OTNO;
      title = 'Are you sure you want to disable the user?'
    }
    this.config.confirmstatus('User', 'v1/user/status', data, title, data['status']);

  }
  reset(detail) {
    this.viewaction = this.dialogService.open(ResetComponent, { context: { detail } })
      .onClose.subscribe(() => {
        this.config.pageload();
        this.viewaction.unsubscribe();
      });
  }
  edit(detail) {
    console.log(detail);
    localStorage.setItem("userEdit" , JSON.stringify ( detail ));
    this.viewaction = this.dialogService.open(EditComponent, { context: { 'detail': detail, 'destOnly': this.config.OTNO } })
      .onClose.subscribe(() => {
        this.loadData();
        this.viewaction.unsubscribe();
      });
    //this.viewaction.componentInstance.user = detail;
  }


  delete(item) {
    let title = "Are you want to continue to Delete.. ?";
    this.action = this.dialogService.open(ConfirmComponent, { context: { title } })
      .onClose.subscribe((status) => {
        if (status == this.config.OTYES) {
          let primaryKey = item.id;
          var formData: any = new FormData();
          formData.append('API_KEY', this.config.apiKey);
          formData.append('service', "deleteservice");
          formData.append('table', "jala_core_users");
          formData.append('pkeyfiled', "usr_id");
          formData.append('id', primaryKey);
          this.http.post(this.config.apiUrl, formData)
            .subscribe((response) => {
              if (response['status'] == this.config.OTYES) {
                this.config.showSuccessToaster("Removed successfully..");
                this.loadData()
              } else {
                this.config.showErrorToaster('Network Error occured..');
              }

            },
              (error) => {
                this.config.showErrorToaster('Network Error occured..');
              }
            );

        }
      });

  }
}