import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';


@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit {
	public detail:any;
	public counters:any=[];
	public isCounterStaff : boolean = false;
  public rec : string ='No';
  constructor(protected ref: NbDialogRef<ViewComponent>,public config:ConfigService,public http: HttpClient) { 
    this.config.checkAccesswith404('viewuser');
  }

  ngOnInit(): void {
	if (this.detail.ugrp_id==this.config.counterStaffId) {
		  	this.isCounterStaff = true;
        if (this.detail.usr_is_rec_mandorty==this.config.OTYES)
          this.rec = 'Yes';

      }
		  this.loadData();
  }
  dismiss() {
    this.ref.close();
  }
  async loadData () {
  	let userId=this.detail.usr_id; 
  	this.http.post(this.config.apiUrl+'v1/user/getcounterlist',{
      id : userId,
    })
    .subscribe(
      (response) => {
      	 var successResponseArray=[];
        successResponseArray.push(response);
  if (successResponseArray[0]['Status']==this.config.OTYES) {  
        let json = JSON.stringify(response['linkedCounters']);
        localStorage.setItem('linkedcounter', json);
        var count = localStorage.getItem('linkedcounter');
        this.counters = JSON.parse(count);    
        console.log(this.counters);    
    }
    else {
    	console.log(successResponseArray[0]['Feedback']);
    }
      },
      (error)=>{console.log(error)});
  }

}
