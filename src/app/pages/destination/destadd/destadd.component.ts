import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-destadd',
  templateUrl: './destadd.component.html',
  styleUrls: ['./destadd.component.scss']
})
export class DestaddComponent implements OnInit {
	public destid:any;
	public destinations:any=[];
	public booking:any=[];
	public errorResponseArray:any=[];
	public noError:boolean=true;

  constructor(protected ref: NbDialogRef<DestaddComponent>,public config:ConfigService,public http: HttpClient) {   
    this.config.checkAccesswith404('Add District'); 
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
    
  }
  doClassCreate(form) {
  	var  dataFields={};
  	this.errorResponseArray['name'] = '';
	this.errorResponseArray['code'] = '';
 	this.noError = true; 
 	
 	if ( form.value['code'] =='' ) {
 		this.errorResponseArray['code'] = 'District Code is Required';
 		this.noError=false;   
 	}
 	if ( form.value['name'] =='' ) {
 		this.errorResponseArray['name'] = 'District Name Required';
 		this.noError=false;   
 	}


	if(this.noError){
		let userId = this.config.doDecrypt(localStorage.getItem('userId'));
		var formData: any = new FormData();
		formData.append('name', form.value['name'] );
		formData.append('code', form.value['code']);
		formData.append('API_KEY', this.config.apiKey);
		formData.append('userid', localStorage.getItem('userId'));
		formData.append('service', "adddistrict");
		this.http.post(this.config.apiUrl, formData)
		  .subscribe((response) => {
			if (response['status'] == this.config.OTYES) {
				this.config.showSuccessToaster(response['feedback'])
				this.ref.close();
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
