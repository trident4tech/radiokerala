import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public destinations:any=[];
  public roles:any=[];
  public role:any;
  public counters:any=[];
  public ugrps:any=[];
  public errorResponseArray:any=[];
  public noError:boolean=true;
  public ugrpAllow : number;
  public destAllow : number;
  public destOnly : number;
  public isCounterStaff : boolean = false;
  public destId : any ;
  public selectedCounters :any=[];
  public dest : number;
  public grp : number;
  public conf: any=[];
  public successResponseArray : any = [];
  


  constructor(protected ref: NbDialogRef<AddComponent>,public config:ConfigService,public http: HttpClient) { 
    this.config.checkAccesswith404('Add User');
  }

  ngOnInit(): void {
    this.conf = [];    
    this.errorResponseArray['name'] = '';
    this.errorResponseArray['mobile'] = '';
    this.errorResponseArray['email'] = '';
    this.errorResponseArray['username'] = '';
    this.errorResponseArray['password'] = '';
    this.errorResponseArray['grp'] = '';
    this.errorResponseArray['role'] = '';
    this.loadData();
    this.loadDataUserGroup();
    this.destId = localStorage.getItem('destId');
  }
  loadData() {
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "masterlist");
    formData.append('type', "role");
    this.http.post(this.config.apiUrl, formData)
      .subscribe((response) => {
        if (response['status'] == this.config.OTYES) {
          this.successResponseArray.push(response);
          this.roles = response['data'];
        } else {

        }

      },
        (error) => {
          this.config.showErrorToaster('Network Error occured..');
        }
      );
  }


  loadDataUserGroup() {
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "masterlist");
    formData.append('type', "usergroup");
    this.http.post(this.config.apiUrl, formData)
      .subscribe((response) => {
        if (response['status'] == this.config.OTYES) {
          this.successResponseArray.push(response);
          this.ugrps = response['data'];
        } else {

        }

      },
        (error) => {
          this.config.showErrorToaster('Network Error occured..');
        }
      );
  }

	cancel() {
    this.ref.close();
  }
  dismiss() {
    this.ref.close();
  }
  doUserCreate(form) {
    var  dataFields={};
    this.errorResponseArray['name'] = '';
    this.errorResponseArray['mobile'] = '';
    this.errorResponseArray['email'] = '';
    this.errorResponseArray['username'] = '';
    this.errorResponseArray['password'] = '';
    this.errorResponseArray['grp'] = '';
    this.errorResponseArray['dest'] = '';
    this.errorResponseArray['counterId'] = '';
    this.errorResponseArray['role'] = '';
  // validation
  this.noError = true; 
  if (form.value['grp'] =='' || form.value['grp']===undefined) {
    this.errorResponseArray['grp'] = 'Usergroup Required';
    this.noError=false;   
  }
  if (form.value['role'] =='' || form.value['role']===undefined) {
    this.errorResponseArray['role'] = 'Role Required';
    this.noError=false;   
  }
  if (form.value['name'] =='' ) {
    this.errorResponseArray['name'] = 'Name Required';
    this.noError=false;   
  }
  if (form.value['username'] =='' ) {
    this.errorResponseArray['username'] = 'Username Required';
    this.noError=false;   
  }
  if (form.value['pass'] =='' ) {
    this.errorResponseArray['password'] = 'Password Required';
    this.noError=false;   
  }
  if (form.value['mobile'] =='' ) {
    this.errorResponseArray['mobile'] = 'Mobile No. Required';
    this.noError=false;  
  }
  else {
    const pattern = /^\d+(\.\d{10})?$/ ; // without ., for integer only
      let inputChar = form.value['mobile'];
      if (!pattern.test(form.value['mobile'])) {
      this.errorResponseArray['mobile'] = 'Invalid Mobile No.';
      this.noError=false;   
    }   
  }
  if(this.noError){
    let userId = localStorage.getItem('userId');
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "adduser");
    formData.append('name', form.value['name'] );
    formData.append('mobile',form.value['mobile'] );
    formData.append('email',form.value['email'] );
    formData.append('ugrp',form.value['grp'] );
    formData.append('role',form.value['role'] );
    formData.append('username',form.value['username']  );
    formData.append('password', form.value['pass']);
    formData.append('userid', userId );
    this.http.post(this.config.apiUrl, formData)
      .subscribe((response) => {
        if (response['status'] == this.config.OTYES) {
          this.config.showSuccessToaster(response ['feedback']);
          this.dismiss()
        } else {

        }

      },
        (error) => {
          this.config.showErrorToaster('Network Error occured..');
        }
      );
  }
      else{
        console.log(this.errorResponseArray);
        this.config.showErrorToaster(this.config.validationError);
      }
  }
}
