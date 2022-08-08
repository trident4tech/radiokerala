import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { PagesComponent } from '../../pages.component';

@Component({
  selector: 'ngx-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public roleName: string = '';
  public customActionSheetOptions: any[] = [];
  public categoriesArray: any[] = [];
  public searchArray: any[] = [];
  public permissionArray: any[] = [];
  public searchCategories: any;
  public waitingForServer: boolean = true;
  public successResponseArray: any[] = [];
  public errorResponseArray: any[] = [];
  public assignPermission: any[] = [];
  public showPrgress: boolean = false;
  public showSearch: boolean = false;
  public loadMore: string;
  public showArray: boolean = false;
  public doStatus: boolean = false;
  public roleid: any;
  public searchCategory: string = '';
  public searchTerm: any;
  reference: any;
  sub;
  constructor(private router: Router,
    public config: ConfigService,
    public http: HttpClient,
    private activerouter: ActivatedRoute,
    public nbMenuService: NbMenuService) {
    this.config.checkAccesswith404('Access Control');
    this.sub = this.activerouter.paramMap.subscribe(params => {
      this.roleid = this.config.doDecrypt(decodeURIComponent(params.get('reference')));
      this.doPermissionlist();
    });

    this.roleName = localStorage.getItem("roleName");
  }

  ngOnInit(): void {
    this.searchTerm = '';

  }
  back() {
    this.router.navigate(['/pages/aclrole']);
  }
  doPermissionlist() {
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "masterlist");
    formData.append('roleid', this.roleid);
    formData.append('type', "assignedpermission");
    this.http.post(this.config.apiUrl, formData)
      .subscribe((response) => {
        if (response['status'] == this.config.OTYES) {
          this.successResponseArray.push(response);
          this.permissionArray = response['data'];
        } else {

        }

      },
        (error) => {
          this.config.showErrorToaster('Network Error occured..');
        }
      );

  }


  changeStatus(event, attrdata) {
    let status;
    if (event != true) {
      status = this.config.OTNO;
    } else if (event) { //for assign permission
      status = this.config.OTYES;
    }
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "addpermission");
    formData.append('roleid', this.roleid);
    formData.append('permissionid', attrdata.id);
    formData.append('status', status);
    this.http.post(this.config.apiUrl, formData)
      .subscribe((response) => {

      },
        (error) => {
          this.config.showErrorToaster('Network Error occured..');
        }
      );


  }
  changeCategory(value) {
    this.searchCategory = value;
    this.doPermissionlist();
  }

}
