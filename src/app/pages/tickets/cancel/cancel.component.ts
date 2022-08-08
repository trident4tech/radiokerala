import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {
    public noError:boolean=false;
    public tno : any;
    public ticket : any;
    public errorResponseArray:any=[];
 constructor(protected ref: NbDialogRef<CancelComponent>,public config:ConfigService,public http: HttpClient) { 
  this.config.checkAccesswith404('pages/tickets/cancel'); 
   }

  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }
 doCancel(form){
    this.errorResponseArray['reason'] = '';
    var  dataFields={};
    dataFields['tno'] = this.tno;
  dataFields['token']=this.config.doDecrypt(localStorage.getItem('token'));
  dataFields['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));  
  dataFields['userid'] = this.config.doDecrypt(localStorage.getItem('userId'));
  dataFields['reason'] = form.value['reason'];
    if (this.tno>0)
        this.noError = true;
    this.noError = true; 
    if (form.value['reason'] =='' || form.value['reason']===undefined) {
        this.errorResponseArray['reason'] = 'Reason Required';
        this.noError=false;   
    }
    if(this.noError == true){
       this.http.post(this.config.apiUrl+'v1/ticketing/cancel',dataFields
               )
        .subscribe(
          (response) => {this.config.checkStatus(response['Status'],response['version']); 
           var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {
            this.config.showSuccessToaster('The ticket has been cancelled');
            this.ref.close();
            this.config.delay(100);
          }
          else {
            console.log(responseDetails[0]['Feedback']);
            this.config.showErrorToaster('Cancellation failed.');
          }
            
          },
          (error)=>{
            console.log(error);
            this.config.showErrorToaster('Sorry! Ticket cancellation has been failed. Please try again.');
          }
        );
     }
      else{
        this.config.showErrorToaster(this.config.validationError);
      }
 }

}
