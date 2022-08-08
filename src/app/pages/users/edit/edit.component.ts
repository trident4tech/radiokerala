import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';


@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public usrUgrp :string;
  public role :string;
  public rec :string;
  public destinations:any=[];
  public ugrps:any=[];
  public errorResponseArray:any=[];
  public noError:boolean=true;
  public ugrpAllow : number;
  public destAllow : number;
  public destId : any ;
  public dest : any;
  public destval : any;
  public grp : any;
  public detail:any;
  public roles:any=[];
  selectedGrp : any;
  destOnly : number;
  public desta:any;
  public usrDest :any;
  public isCounterStaff : boolean = false;
  public defaultCheckArray : any = [];
  public successResponseArray : any = [];
  public conf  : any = [];
  public userArray : any[] 
  public ngName : any = '';
  public ngMobile : any = '';
  public ngEmail : any = '';
  public ngUname : any = '';
  
  constructor(protected ref: NbDialogRef<EditComponent>,public config:ConfigService,public http: HttpClient) { 
    this.config.checkAccesswith404('Edit User');
  }

 
  ngOnInit(): void {
    this.conf = [];    
    this.userArray = JSON.parse ( localStorage.getItem("userEdit") );
    this.pupulateinputs();
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
  this.noError = true; 
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
    formData.append('isEdit', 2 );
    formData.append('pkey', this.userArray['id'] );
    
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


  pupulateinputs(){
    this.ngName = this.userArray['name'];
    this.ngMobile = this.userArray['mob'];
    this.ngEmail = this.userArray['email'];
    this.ngUname = this.userArray['uname'];
  }

}
