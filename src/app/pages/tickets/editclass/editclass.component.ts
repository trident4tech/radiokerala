import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';


@Component({
	selector: 'ngx-editclass',
	templateUrl: './editclass.component.html',
	styleUrls: ['./editclass.component.scss']
})
export class EditclassComponent implements OnInit {
	public destid: any;
	public atr: any;
	public destinations: any = [];
	public attractions: any = [];
	public attr: any = [];
	public errorResponseArray: any = [];
	public noError: boolean = true;
	public detail: any;
	public dest: any;
	public name : any= '';
	constructor(protected ref: NbDialogRef<EditclassComponent>, public config: ConfigService, public http: HttpClient) {
		//this.config.checkAccesswith404('edit'); 
		this.detail = JSON.parse(localStorage.getItem('classEditData'));
		this.name = this.detail['name'];
	}
	ngOnInit(): void {
		this.errorResponseArray['name'] = '';
	}
	dismiss() {
		this.ref.close();
	}


	doClassSave(form) {
		var dataFields = {};
		this.errorResponseArray['name'] = '';
		// validation
		this.noError = true;
		if ( this.name == '' || this.name == undefined || this.name ==  null) {
			this.errorResponseArray['name'] = 'Class name Required';
			this.noError = false;
		}
		if (this.noError) {
			let userId = localStorage.getItem('userId');
		var formData: any = new FormData();
		formData.append('core_ugrp_name', "'"+this.name+"'");
		//formData.append('u_created', userId );
		formData.append('pkeyField', "core_ugrp_id" );
		formData.append('table', "jala_core_usergroup" );
		formData.append('API_KEY', this.config.apiKey);
		formData.append('service', "masteredit");
		formData.append('key' , this.detail['id'])
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
		else {
			console.log(this.errorResponseArray);
			this.config.showErrorToaster(this.config.validationError);
		}
	}



}
