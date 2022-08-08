import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'ngx-counterlist',
  templateUrl: './counterlist.component.html',
  styleUrls: ['./counterlist.component.scss']
})
export class CounterlistComponent implements OnInit {
	public counters :any[] = [];
	public userId : any;
	public activeCounter : number;
	public cash :any;
	public ticket : number;
	public countername : string;
	public time : any;
	public attraction : any[]=[];

  constructor(public config:ConfigService,public http: HttpClient) {
    this.config.checkAccesswith404('pages/counterlist'); 
   }

  ngOnInit(): void {
  	this.loadData();
  }
   async loadData () { 
 	this.userId=this.config.doDecrypt(localStorage.getItem('userId'));	 
  	this.http.post(this.config.apiUrl+'v1/user/getcounterlist',{
      id : this.userId,
      token: this.config.doDecrypt(localStorage.getItem('token')),
       roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
    })
    .subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);
      	 var successResponseArray=[];
        successResponseArray.push(response);
  if (successResponseArray[0]['Status']==this.config.OTYES) {  
        let json = JSON.stringify(response['linkedCounters']);
        localStorage.setItem('linkedcounter', json);
        var count = localStorage.getItem('linkedcounter');
        //console.log(count);
        this.counters = JSON.parse(count);
        this.attraction = [];
    	localStorage.setItem('attraction', "");
        this.activeCounter = response['activeCounter'];
        localStorage.setItem('counter', "");
        if (this.activeCounter) {
        	this.time = response['data']['opentime'];
        	this.countername = response['data']['counter'];
        	this.ticket = response['data']['tickets'];
        	this.cash = response['data']['cash'];
        	localStorage.setItem('counter', response['data']['counterId']);
          localStorage.setItem('counterno', response['data']['counterNo']);
        	let i = 0;
        	//console.log(response['linkedCounters']);

          for (var key in response['attrData']) 
          {
            this.attraction[i] = response['attrData'][key];
            i++;
          }
          let json = JSON.stringify(this.attraction);
          localStorage.setItem('attraction', json);
          localStorage.setItem('ticketNumber', response['ticketNumber']);
        }
    }
    else {
    	console.log(successResponseArray[0]['Feedback']);
    }
      },
      (error)=>{console.log(error)});
  }
  changeCounterStatus (counter, status) {	
  	 var data = {};
     var newstatus=0;
        data['id'] = this.userId;
        data['counter'] = counter;
        data['status'] = status ;
        data['token']=this.config.doDecrypt(localStorage.getItem('token'));
        data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
        var action = this.config.dialogService.open(ConfirmComponent)
      .onClose.subscribe((status) => {
        if (status==this.config.OTYES) {
          this.config.http.post(this.config.apiUrl+'v1/ticketing/changecounterstatus',data).subscribe(
            (response) => {   this.config.checkStatus(response['Status'],response['version']);
              if (data['status']==this.config.OTYES)
                this.config.showSuccessToaster('Counter has been opened');
              else if (data['status']==this.config.OTNO)
                this.config.showSuccessToaster('Counter has been closed');
               this.loadData();
            },
            (error)=>{
              this.config.showErrorToaster('Sorry! action has been failed. Please try again.');
            }
          );
         
        }
        action.unsubscribe();
      });

    }

}
