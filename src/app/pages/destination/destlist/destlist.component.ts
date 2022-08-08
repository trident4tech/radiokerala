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
import { DestaddComponent } from '../destadd/destadd.component';
import { DestviewComponent } from '../destview/destview.component';
import { DesteditComponent } from '../destedit/destedit.component';
import { ConfirmComponent } from '../../../pages/tickets/confirm/confirm.component';


@Component({
  selector: 'ngx-destlist',
  templateUrl: './destlist.component.html',
  styleUrls: ['./destlist.component.scss']
})
export class DestlistComponent implements OnInit {
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
  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    public config: ConfigService,
    public http: HttpClient,
    private menuService: NbMenuService
  ) {
    //this.config.checkAccesswith404('pages/destinationlist');
    this.config.checkAccesswith404("District Management");


  }

  ngOnInit() {
    this.actionitems = [];
    this.loadData();
  }

  loadData() {
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "listdistrict");
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
    this.viewaction = this.dialogService.open(DestaddComponent).onClose.subscribe(() => {
      this.loadData()
      this.viewaction.unsubscribe();
    });

  }
  
  
  edit(detail) {
    localStorage.setItem('editData', JSON.stringify(detail))
    this.viewaction = this.dialogService.open(DesteditComponent)
      .onClose.subscribe(() => {
        this.loadData();
        this.viewaction.unsubscribe();
      });
  }


  testa() {
    let district: {} = { "name": "kasaragod", 'code': 'KSD', 'id': 41 };
    this.edit(district)
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
          formData.append('table', "jala_core_district");
          formData.append('pkeyfiled', "district_id");
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
