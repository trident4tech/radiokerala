import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-weatheradd',
  templateUrl: './weatheradd.component.html',
  styleUrls: ['./weatheradd.component.scss']
})
export class WeatheraddComponent implements OnInit {
	public destid:any;
	public destinations:any=[];
	public booking:any=[];
	public errorResponseArray:any=[];
	public noError:boolean=true;
	public image: any;
	public count: any;
	public curStatus: any;
	public checkArray: any=[];
	public isFirst: boolean=true;

  constructor(protected ref: NbDialogRef<WeatheraddComponent>,public config:ConfigService,public http: HttpClient) {   
    this.config.checkAccesswith404('add'); 
  }

  ngOnInit(): void {
	this.errorResponseArray['alertdate'] = '';
	this.errorResponseArray['attachment'] = '';
  	this.errorResponseArray['description'] = '';
	
  	this.loadData();
  }


  dismiss() {
    this.ref.close();
  }
   async loadData() {
  	let userId=this.config.doDecrypt(localStorage.getItem('userId'));
  	this.http.post(this.config.apiUrl+'v1/user/getDestData',{
       id : userId,
    })
    .subscribe(
      (response) => {	
	  this.destinations = response['destData'];   
	  this.count = response['count'];      
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  getAttrByDest(destId) {
    
  }

  LogoUploaded($event) {
    const reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (event) => {
      //this.profileImageDisplay = (event.target as FileReader).result;
      const filedata: File = $event.target.files[0];
      this.image = filedata;
    };
  }


public checkBoxClicked( destId ){
    if ( this.isFirst == true ){

      this.destinations.forEach((value) => {
        this.checkArray [ value['destId'] ] = false;
    });
    this.isFirst = false;

    }
    this.curStatus = this.checkArray [ destId ];
    this.curStatus = !this.curStatus;
    this.checkArray [ destId ] = this.curStatus;
  }


  doClassCreate(form) {
  	var  dataFields={};
  	this.errorResponseArray['alertdate'] = '';
	this.errorResponseArray['attachment'] = '';
  	this.errorResponseArray['description'] = '';
  	this.errorResponseArray['general'] = '';
 	// validation
 	this.noError = true; 
 	
 	
 	if (form.value['alertdate'] =='' ) {
 		this.errorResponseArray['alertdate'] = 'Date Required';
 		this.noError=false;   
 	}
 	
 	if (form.value['description'] =='' ) {
 		this.errorResponseArray['description'] = 'Description Required';
 		this.noError=false;   
 	}
 	



	if(this.noError){
	console.log(this.image);
		let userId=this.config.doDecrypt(localStorage.getItem('userId'));
	  	this.http.post(this.config.apiUrl+'v1/user/createWeatheralert',{

		   	alertdate : form.value['alertdate'],
		   	attachment : form.value['attachment'],
			description : form.value['description'],
			general : form.value['general'],
			userid : userId,
			destinationdata : JSON.stringify(this.checkArray),
			file : this.image,
			
		   token: this.config.doDecrypt(localStorage.getItem('token')),
       		roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
	    })
	    .subscribe(
	      (response) => {
		this.config.checkStatus(response['Status'],response['version']);
			this.config.showSuccessToaster('The weather alert has been successfuly added ');
		   this.ref.close();
		   this.config.delay(100);
		   
	      },
	      (error)=>{
	        console.log(error);
			this.config.showErrorToaster('The weather alert insertion failed');
	      }
	    );
	}
      else{
      	console.log(this.errorResponseArray);
        this.config.showErrorToaster(this.config.validationError);
      }
  }

}
