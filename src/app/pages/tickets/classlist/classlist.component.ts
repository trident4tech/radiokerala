import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { AddclassComponent } from '../addclass/addclass.component';
import { ViewclassComponent } from '../viewclass/viewclass.component';
import { EditclassComponent } from '../editclass/editclass.component';
import { ConfirmComponent } from '../../../pages/tickets/confirm/confirm.component';

@Component({
  selector: 'ngx-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.scss']
})
export class ClasslistComponent implements OnInit {
  public waitingForServer: boolean = true;
  public successResponseArray: any[] = [];
  public errorResponseArray: any[] = [];
  public userArray: any[] = [];
  public searchTerm: string = '';
  public showLoadMore: boolean = true;
  test: Subscription;
  public loadMore: string;
  public action: any;
  public viewaction: any;
  public ticketArray: any[] = [];
  actionitems: any[];
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  constructor(private dialogService: NbDialogService,
    private router: Router,
    public config: ConfigService,
    public http: HttpClient,
    private menuService: NbMenuService
  ) {
    //  this.config.checkAccesswith404('ticketclasslist'); 
    this.config.checkAccesswith404("User Group");
  }

  ngOnInit() {
    this.actionitems = [];
    this.actionitems.push({ title: 'Edit', icon: 'edit' });
    this.actionitems.push({ title: 'Delete', icon: 'trash' });
    this.loadData();
  }

  loadData() {
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "masterlist");
    formData.append('type', "usergroup");
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

  async add() {
    this.viewaction = this.dialogService.open(AddclassComponent).onClose.subscribe(() => {
      this.loadData();
      this.viewaction.unsubscribe();
    });

  }
  changeaction(detail) {
    var data = {};
    data['classid'] = detail.class_id;
    data['token'] = this.config.doDecrypt(localStorage.getItem('token'));
    data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
    this.action = this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title == 'Delete') {
        this.delete(detail);
        this.action.unsubscribe();
      }
      else if (event.item.title == 'View') {
        this.view(detail);
      }
      else if (event.item.title == 'Change Status') {
        this.changestatus(detail);
      }
      else if (event.item.title == 'Edit') {
        this.edit(detail);
      }
      this.action.unsubscribe();
    });
  }
  view(detail) {
    this.viewaction = this.dialogService.open(ViewclassComponent, { context: { detail } })
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
      });
  }
  changestatus(detail) {
    var data = {};
    data['primary'] = detail.class_id;
    data['token'] = this.config.doDecrypt(localStorage.getItem('token'));
    data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
    data['status'] = this.config.OTYES;
    let title = 'Are you sure you want to enable the ticket class?';
    if (detail.status == this.config.OTYES) {
      data['status'] = this.config.OTNO;
      title = 'Are you sure you want to disable the ticket class?';
    }
    this.config.confirmstatus('Ticket Class', 'v1/ticketing/data/changeclassstatus', data, title, data['status']);

  }
  edit(detail) {
    localStorage.setItem('classEditData', JSON.stringify(detail));
    this.viewaction = this.dialogService.open(EditclassComponent, { context: { 'detail': detail } })
      .onClose.subscribe(() => {
        this.loadData();
        this.viewaction.unsubscribe();
      });
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
          formData.append('table', "jala_core_usergroup");
          formData.append('pkeyfiled', "core_ugrp_id");
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
