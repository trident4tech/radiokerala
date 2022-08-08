import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  public detail:any;
  public errorResponseArray:any=[];
  public noError:boolean=true;
  constructor(protected ref: NbDialogRef<ResetComponent>,public config:ConfigService,public http: HttpClient) {  
    this.config.checkAccesswith404('user/changepass');
  }

  ngOnInit(): void {
  	this.errorResponseArray['password'] = '';
  	this.errorResponseArray['repass'] = '';
  }
  cancel() {
    this.ref.close();
  }
  dismiss() {
    this.ref.close();
  }
  doResetPass(form) {
    var  dataFields={};
    this.errorResponseArray['password'] = '';
    this.errorResponseArray['repass'] = '';
  // validation
  this.noError = true; 
  if (form.value['pass'] =='' ) {
    this.errorResponseArray['password'] = 'Password Required';
    this.noError=false;   
  }
  if (form.value['repass'] =='' ) {
    this.errorResponseArray['repass'] = 'Re-enter Password Required';
    this.noError=false;   
  }
  	if (form.value['pass'] !='' && form.value['repass'] !='' && form.value['pass']!=form.value['repass'] ) {
 		this.errorResponseArray['repass'] = 'Password Mismatching';
 		this.noError=false;   
 	}
  if(this.noError){
    let userId=this.detail.usr_id; 
      this.http.post(this.config.apiUrl+'v1/user/passwordreset',{
        id : userId,
       	password :form.value['pass'],
       	password_confirmation :form.value['repass'],
       	token:this.config.doDecrypt(localStorage.getItem('token')),
    	roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
      })
      .subscribe(
        (response) => {this.config.checkStatus(response['Status'],response['version']);
     var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {
    this.config.showSuccessToaster('User has been successfully Inserted.');
        this.ref.close();
        }
        else {
          this.config.delay(100);
          window.location.reload();
          console.log(responseDetails[0]['Feedback']);
          this.config.showErrorToaster('Reset password failed.'+responseDetails[0]['Feedback']);
        }   
        },
        (error)=>{  	
        var errorData =Object.keys(error['error']).map(key => ({keyname: key, value:error['error'][key]}));
        errorData.forEach(element => {
        	if(element.keyname=='password') {
           		this.errorResponseArray['password'] = element.value[0];
        	}
        });
         this.config.showErrorToaster('Reset password failed1.');
        }
      );
  }
      else{
        this.config.showErrorToaster(this.config.validationError);
      }
  }
}
