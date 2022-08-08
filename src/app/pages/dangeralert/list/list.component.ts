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
import { AddComponent } from '../add/add.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewComponent } from '../view/view.component';
import { EditComponent } from '../edit/edit.component';


imports: [CommonModule, MatTooltipModule]


@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public viewaction;
  public thicketAttrId: string;
  public loadMore: string;
  public showLoadMore: boolean = true;
  public showList: boolean = true;
  public showView: boolean = false;
  public ticketArray: any[] = [];
  public bookDetails: any[] = [];
  public showPrgress: boolean = false;
  public successResponseArray: any[] = [];
  public errorResponseArray: any[] = [];
  public showSearch: boolean = false;
  public temptArray: any[] = [];
  public grandTotal: number = 0;
  public qrDAta: string = '';
  public ticketNumber: string = '';
  public ticketTempArray: Array<any>[] = [];
  public searchTerm: string = '';
  public bookeddate: any;
  public mode: string = '';
  public counter: string = '';
  public modes: any[] = [];
  public counters: any[] = [];
  appTitle: string = '';
  terms: any = [];
  public classDetails: any = [];

  @ViewChild('item', { static: true }) accordion;

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    public config: ConfigService,
    public http: HttpClient,
    private menuService: NbMenuService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  add() {
    this.viewaction = this.dialogService.open(AddComponent)
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
        this.loadData();
      });
  }



  async loadData() {
    this.config.targeturl = this.config.apiUrl + 'v1/alert/list';
    this.config.postdata = {
      token: this.config.doDecrypt(localStorage.getItem('token')),
      roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
      p: this.config.itemsPerPage,
    };

    this.http.post(this.config.targeturl, this.config.postdata)
      .subscribe(
        (response) => {
          var responseDetails = [];
          responseDetails.push(response);
          if (responseDetails[0]['Status'] == this.config.OTYES) {
            this.successResponseArray = [];
            this.successResponseArray.push(response);
            this.config.itemdata = response['Data']['data'];
            //console.log(response);
            this.config.generatePaging(this.successResponseArray[0]['Data'], this.config.apiUrl + 'v1/alert/list');
          }
          else {
            console.log(responseDetails[0]['Feedback']);
            this.config.showErrorToaster('Loading failed.');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }


  toggle() {
    this.accordion.toggle();
  }


  openView( id  , item){
    localStorage.setItem("viewId" , id)
    localStorage.setItem('allItem' , JSON.stringify(item));
    this.viewaction = this.dialogService.open(ViewComponent)
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
        this.loadData();
      });
  }


  openEdit( id  , item){
    localStorage.setItem("viewId" , id)
    localStorage.setItem('allItem' , JSON.stringify(item));
    this.viewaction = this.dialogService.open(EditComponent)
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
        this.loadData();
      });
  }
}
