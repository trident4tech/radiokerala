import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';


@Component({
  selector: 'ngx-edit',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  public errorResponseArray:any=[];
  public noError:boolean=true;
  public detail:any;    
  


  constructor(protected ref: NbDialogRef<EditprofileComponent>,public config:ConfigService,public http: HttpClient) {
    this.config.checkAccesswith404('edit-profile');
   }

  ngOnInit(): void {
    this.errorResponseArray['name'] = '';
    this.errorResponseArray['mobile'] = '';
    this.errorResponseArray['email'] = '';
  }
	cancel() {
    this.ref.close();
  }
  dismiss() {
    this.ref.close();
  }
  doUserUpdate(form) {
    var  dataFields={};
    this.errorResponseArray['name'] = '';
    this.errorResponseArray['mobile'] = '';
    this.errorResponseArray['email'] = '';
  this.noError = true; 
  if (form.value['name'] =='' ) {
    this.errorResponseArray['name'] = 'Name Required';
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
	  let userId=this.detail.usr_id;
      this.http.post(this.config.apiUrl+'v1/user/edit',{
       email :form.value['email'],
       name:form.value['name'],
       mobile:form.value['mobile'],
       id:userId,
       token:this.config.doDecrypt(localStorage.getItem('token')),
    roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
      })
      .subscribe(
        (response) => {this.config.checkStatus(response['Status'],response['version']);
     var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {
    this.config.showSuccessToaster('Profile has been successfully Updated.');
        this.ref.close();
        
        }
        else {
          this.config.delay(100);
          console.log(responseDetails[0]['Feedback']);
          this.config.showErrorToaster('Updation failed.'+responseDetails[0]['Feedback']);
        }   
        },
        (error)=>{
        var errorData =Object.keys(error['error']).map(key => ({keyname: key, value:error['error'][key]}));
        if(errorData[0]['keyname']=='email' && typeof errorData[0]['value']!=='undefined') {
           this.errorResponseArray['email'] = error['error']['email'][0];
        }
        if(errorData[0]['keyname']=='uname' && typeof errorData[0]['value']!=='undefined') {
           this.errorResponseArray['username'] = error['error']['uname'][0];
        }
        if(errorData[0]['keyname']=='usermobile' && typeof errorData[0]['value']!=='undefined') {
           this.errorResponseArray['mobile'] = error['error']['usermobile'][0];
        }
         this.config.showErrorToaster('Updation failed.');
        }
      );
  }
      else{
        console.log(this.errorResponseArray);
        this.config.showErrorToaster(this.config.validationError);
      }
  }

}
