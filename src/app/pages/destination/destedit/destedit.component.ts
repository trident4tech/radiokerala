import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
	selector: 'ngx-destedit',
	templateUrl: './destedit.component.html',
	styleUrls: ['./destedit.component.scss']
})
export class DesteditComponent implements OnInit {
	public destid: any;
	public destinations: any = [];
	public booking: any = [];
	public errorResponseArray: any = [];
	public detail: any;
	public noError: boolean = true;
	public dest: any;
	public book: any;
	public showterms: any;
	public typedest: any;
	public paymentmode: any;

	public distcode : any = '';
	public distname : any = '';
	public destDet = {};


	constructor(protected ref: NbDialogRef<DesteditComponent>, public config: ConfigService, public http: HttpClient) {
		//this.config.checkAccesswith404('edit');
		this.destDet = JSON.parse(localStorage.getItem('editData'));  console.log(this.destDet);
		this.distname = this.destDet['name'];
		this.distcode = this.destDet['code'];
	}

	ngOnInit(): void {
		this.errorResponseArray['name'] = '';
		this.errorResponseArray['code'] = '';

	}


	dismiss() {
		this.ref.close();
	}

	doClassSave(form) {
		var dataFields = {};
		this.errorResponseArray['name'] = '';
		this.errorResponseArray['code'] = '';

		// validation
		this.noError = true;

		if (form.value['code'] == '') {
			this.errorResponseArray['code'] = 'District Code Required';
			this.noError = false;
		}
		if (form.value['name'] == '') {
			this.errorResponseArray['name'] = 'District name Required';
			this.noError = false;
		}
		if (this.noError) {
			let userId = this.config.doDecrypt(localStorage.getItem('userId'));
			var formData: any = new FormData();
			formData.append('name', form.value['name']);
			formData.append('code', form.value['code']);
			formData.append('id', this.destDet['id']);
			formData.append('API_KEY', this.config.apiKey);
			formData.append('userid', localStorage.getItem('userId'));
			formData.append('service', "editdistrict");
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
		else {
			console.log(this.errorResponseArray);
			this.config.showErrorToaster(this.config.validationError);
		}
	}
}


