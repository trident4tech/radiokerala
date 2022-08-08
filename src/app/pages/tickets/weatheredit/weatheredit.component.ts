import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-weatheredit',
  templateUrl: './weatheredit.component.html',
  styleUrls: ['./weatheredit.component.scss']
})
export class WeathereditComponent implements OnInit {
	public destid:any;
	public destinations:any=[];
	public booking:any=[];
	public errorResponseArray:any=[];
	public detail : any;
	public noError:boolean=true;
	public dest :any;
	public book :any;
	public showterms :any;
	public typedest :any;
	public paymentmode :any;
	

  constructor(protected ref: NbDialogRef<WeathereditComponent>,public config:ConfigService,public http: HttpClient) {   
    this.config.checkAccesswith404('edit'); 
  }

  ngOnInit(): void {
	this.errorResponseArray['name'] = '';
	this.errorResponseArray['code'] = '';
  	this.errorResponseArray['booking'] = '';
  	this.errorResponseArray['place'] = '';
  	this.errorResponseArray['pincode'] = '';
  	this.errorResponseArray['description'] = '';
	this.errorResponseArray['timing'] = '';
  	this.errorResponseArray['email'] = '';
  	this.errorResponseArray['website'] = '';
  	this.errorResponseArray['phoneno'] = '';
  	this.errorResponseArray['desttype'] = '';
  	this.errorResponseArray['termsticket'] = '';
  	this.errorResponseArray['paymode'] = '';
  	this.loadData();
  }


  dismiss() {
    this.ref.close();
  }
   async loadData() {
   this.dest = ""+this.detail.dest_parent+"";
   this.book = ""+this.detail.dest_is_public+"";
   this.showterms = ""+this.detail.dest_display_terms_ticket+"";
   this.typedest = ""+this.detail.dest_type+"";
   this.paymentmode = ""+this.detail.dest_paymode+"";
   
  	let userId=this.config.doDecrypt(localStorage.getItem('userId'));
  	this.http.post(this.config.apiUrl+'v1/getData',{
       id : userId,
    })
    .subscribe(
      (response) => {	
	  this.destinations = response['destData'];      
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  getAttrByDest(destId) {
  this.dest = destId;

  }
  doClassSave(form) {
  	var  dataFields={};
  	this.errorResponseArray['name'] = '';
	this.errorResponseArray['code'] = '';
  	this.errorResponseArray['booking'] = '';
  	this.errorResponseArray['place'] = '';
  	this.errorResponseArray['pincode'] = '';
  	this.errorResponseArray['description'] = '';
	this.errorResponseArray['timing'] = '';
  	this.errorResponseArray['email'] = '';
  	this.errorResponseArray['website'] = '';
  	this.errorResponseArray['phoneno'] = '';
  	this.errorResponseArray['desttype'] = '';
  	this.errorResponseArray['termsticket'] = '';
  	this.errorResponseArray['paymode'] = '';
 	// validation
 	this.noError = true; 
 	
 	if (form.value['code'] =='' ) {
 		this.errorResponseArray['code'] = 'Destination Code Required';
 		this.noError=false;   
 	}
 	if (form.value['name'] =='' ) {
 		this.errorResponseArray['name'] = 'Destination name Required';
 		this.noError=false;   
 	}
 	if (form.value['book'] =='' ) {
 		this.errorResponseArray['booking'] = 'Is Allowed for Booking';
 		this.noError=false;   
 	}
 	if (form.value['place'] =='' ) {
 		this.errorResponseArray['place'] = 'Place Required';
 		this.noError=false;   
 	}
 	if (form.value['pincode'] =='' ) {
 		this.errorResponseArray['pincode'] = 'Pincode Required';
 		this.noError=false;   
 	}
 	if (form.value['description'] =='' ) {
 		this.errorResponseArray['description'] = 'Description Required';
 		this.noError=false;   
 	}
 	if (form.value['timing'] =='' ) {
 		this.errorResponseArray['timing'] = 'Timing Required';
 		this.noError=false;   
 	}
 	if (form.value['email'] =='' ) {
 		this.errorResponseArray['email'] = 'Email Required';
 		this.noError=false;   
 	}
 	if (form.value['website'] =='' ) {
 		this.errorResponseArray['website'] = 'Website Required';
 		this.noError=false;   
 	}
 	if (form.value['phoneno'] =='' ) {
 		this.errorResponseArray['phoneno'] = 'Phone No Required';
 		this.noError=false;   
 	}
 	if (form.value['typedest'] =='' ) {
 		this.errorResponseArray['desttype'] = 'Destination type Required';
 		this.noError=false;   
 	}
 	if (form.value['showterms'] =='' ) {
 		this.errorResponseArray['termsticket'] = 'Terms shows in Ticket Required';
 		this.noError=false;   
 	}
 	if (form.value['paymentmode'] =='' ) {
 		this.errorResponseArray['paymode'] = 'Terms shows in Ticket Required';
 		this.noError=false;   
 	}



	if(this.noError){
		let userId=this.config.doDecrypt(localStorage.getItem('userId'));
	  	this.http.post(this.config.apiUrl+'v1/user/edit_dest',{

	       	destid : this.dest,
		   	name : form.value['name'],
		   	code : form.value['code'],
			booking : this.book,
			place : form.value['place'],
			pincode : form.value['pincode'],
			description : form.value['description'],
			timing : form.value['timing'],
			email : form.value['email'],
			website : form.value['website'],
			phoneno : form.value['phoneno'],
			desttype : this.typedest,
			termsticket : this.showterms,
			endtime : form.value['endtime'],
			startday : form.value['startday'],
			maxbookday : form.value['maxbookday'],
			maxpax : form.value['maxpax'],
			destinationid:this.detail['dest_id'],
			paymode : this.paymentmode,
            gstin : form.value['gstin'],

		   token: this.config.doDecrypt(localStorage.getItem('token')),
       		roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
	    })
	    .subscribe(
	      (response) => {
		console.log(response);
		this.config.checkStatus(response['Status'],response['version']);
			this.config.showSuccessToaster('The destination has been successfuly Updated ');
		   this.ref.close();
		   this.config.delay(100);
		   
	      },
	      (error)=>{
	        console.log(error);
			this.config.showErrorToaster('The destination Updation failed');
	      }
	    );
	}
      else{
      	console.log(this.errorResponseArray);
        this.config.showErrorToaster(this.config.validationError);
      }
  }

}
