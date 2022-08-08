import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-changedate',
  templateUrl: './changedate.component.html',
  styleUrls: ['./changedate.component.scss']
})
export class ChangedateComponent implements OnInit {
    public noError:boolean=false;
    public tno : any;
    public ticket : any;
    public ticketdate : any;
    public errorResponseArray:any=[];
    public bookeddate:any;
 constructor(protected ref: NbDialogRef<ChangedateComponent>,public config:ConfigService,public http: HttpClient) { 
  this.config.checkAccesswith404('pages/changedate'); 
   }

  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }
 doCancel(form){
    this.errorResponseArray['bookeddate'] = '';
    var  dataFields={};
    dataFields['tno'] = this.tno;
    dataFields['cdate'] = this.ticketdate;
  dataFields['token']=this.config.doDecrypt(localStorage.getItem('token'));
  dataFields['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));  
  dataFields['userid'] = this.config.doDecrypt(localStorage.getItem('userId'));
  
    if (this.tno>0)
        this.noError = true;
    this.noError = true; 
    if (form.value['bookeddate'] =='' || form.value['bookeddate']===undefined) {
        this.errorResponseArray['bookeddate'] = 'Date Required';
        this.noError=false;   
    }
     if(this.noError == true){
            var date = new Date();      
            if (form.value['bookeddate']!='undefined' && form.value['bookeddate']!=undefined)
            date = form.value['bookeddate'];
             var bdate = date.getFullYear()+'-'+ ('0' + (date.getMonth()+1)).slice(-2)+ '-'+ ('0' + date.getDate()).slice(-2)
              ;
             dataFields['bookeddate'] = bdate;
       this.http.post(this.config.apiUrl+'v1/ticketing/changedate',dataFields
               )
        .subscribe(
          (response) => {this.config.checkStatus(response['Status'],response['version']); 
           var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {
            this.config.showSuccessToaster('The ticket date has been changed');
            this.ref.close();
            this.config.delay(100);
          }
          else {
            console.log(responseDetails[0]['Feedback']);
            this.config.showErrorToaster('Date changing failed.');
          }
            
          },
          (error)=>{
            console.log(error);
            this.config.showErrorToaster('Sorry! Ticket date changing has been failed. Please try again.');
          }
        );
     }
      else{
        this.config.showErrorToaster(this.config.validationError);
      }
 }

}
