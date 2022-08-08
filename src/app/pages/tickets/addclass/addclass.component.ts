import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.scss']
})
export class AddclassComponent implements OnInit {
	public destid:any;
	public atr:any;
	public destinations:any=[];
	public attractions:any=[];
	public attr:any=[];
	public errorResponseArray:any=[];
	public noError:boolean=true;

  constructor(protected ref: NbDialogRef<AddclassComponent>,public config:ConfigService,public http: HttpClient) {   
    this.config.checkAccesswith404('Add Role'); 
  }

  ngOnInit(): void {
  	this.errorResponseArray['destid'] = '';
  	this.errorResponseArray['atr'] = '';
	this.errorResponseArray['name'] = '';
  	this.errorResponseArray['rate'] = '';
  	this.errorResponseArray['classno'] = '';
  	this.loadData();
  }
  dismiss() {
    this.ref.close();
  }
   async loadData() {
  	let userId=this.config.doDecrypt(localStorage.getItem('userId'));
  	this.http.post(this.config.apiUrl+'v1/getData',{
       id : userId,
    })
    .subscribe(
      (response) => {	
	  this.destinations = response['destData'];
	  this.attractions = response['attrData'];      
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  getAttrByDest(destId) {
    this.attr=this.attractions[destId];
  }
  doClassCreate(form) {
  	var  dataFields={};
	this.errorResponseArray['name'] = '';
 	// validation
 	this.noError = true; 
 	if ( form.value['name'] =='' ) {
 		this.errorResponseArray['name'] = 'Role name Required';
 		this.noError=false;   
 	}
	if(this.noError){
		let userId = localStorage.getItem('userId');
		var formData: any = new FormData();
		formData.append('role_name', "'"+form.value['name']+"'");
		//formData.append('u_created', userId );
		formData.append('table', "jala_core_role" );
		formData.append('API_KEY', this.config.apiKey);
		formData.append('service', "masterinsert");
		this.http.post(this.config.apiUrl, formData)
		  .subscribe((response) => {
			if (response['status'] == this.config.OTYES) {
				this.dismiss()
				this.config.showSuccessToaster(response['feedback'])
			} else {
			  this.config.showErrorToaster(response['feedback'])
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
