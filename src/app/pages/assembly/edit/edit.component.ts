import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
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

  public distId: any = '';
  public gpname: any = '';
  public destDet = {};
  public successResponseArray: any[] = [];
  public district: [] = [];
  constructor(protected ref: NbDialogRef<EditComponent>, public config: ConfigService, public http: HttpClient) {
    this.destDet = JSON.parse(localStorage.getItem('editData')); console.log(this.destDet);
    this.distId = this.destDet['distid'];
    this.gpname = this.destDet['name'];
    this.loadData()
  }

  ngOnInit(): void {
    this.errorResponseArray['name'] = '';
    this.errorResponseArray['dist'] = '';

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

    if (form.value['dist'] == '' || form.value['dist'] == undefined) {
      this.errorResponseArray['dist'] = 'District is Required';
      this.noError = false;
    }
    if (form.value['name'] == '') {
      this.errorResponseArray['name'] = 'GP name Required';
      this.noError = false;
    }
    if (this.noError) {
      let userId = this.config.doDecrypt(localStorage.getItem('userId'));
      var formData: any = new FormData();
      formData.append('name', form.value['name']);
      formData.append('dist', form.value['dist']);
      formData.append('API_KEY', this.config.apiKey);
      formData.append('userid', localStorage.getItem('userId'));
      formData.append('id', this.destDet['id']);
      formData.append('isedit', 2);
      formData.append('service', "addassembly");
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

  async loadData() {
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "listdistrict");
    this.http.post(this.config.apiUrl, formData)
      .subscribe((response) => {
        if (response['status'] == this.config.OTYES) {
          this.successResponseArray.push(response);
          this.district = response['select'];
        } else {

        }

      },
        (error) => {
          this.config.showErrorToaster('Network Error occured..');
        }
      );
  }
}

