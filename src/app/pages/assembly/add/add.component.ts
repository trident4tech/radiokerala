import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public destid: any;
  public destinations: any = [];
  public booking: any = [];
  public errorResponseArray: any = [];
  public noError: boolean = true;
  public successResponseArray: any[] = [];
  public district: [] = [];
  constructor(protected ref: NbDialogRef<AddComponent>, public config: ConfigService, public http: HttpClient) { }

  ngOnInit(): void {
    this.errorResponseArray['name'] = '';
    this.errorResponseArray['dist'] = '';
    this.loadData();
  }


  dismiss() {
    this.ref.close();
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
  getAttrByDest(destId) {

  }
  doClassCreate(form) {
    var dataFields = {};
    this.errorResponseArray['name'] = '';
    this.errorResponseArray['dist'] = '';
    this.noError = true;
    console.log(form.value['dist']);
    if (form.value['dist'] == '' || form.value['dist'] == undefined) {
      this.errorResponseArray['dist'] = 'District is Required';
      this.noError = false;
    }
    if (form.value['name'] == '') {
      this.errorResponseArray['name'] = 'Name Required';
      this.noError = false;
    }


    if (this.noError) {
      let userId = this.config.doDecrypt(localStorage.getItem('userId'));
      var formData: any = new FormData();
      formData.append('name', form.value['name']);
      formData.append('dist', form.value['dist']);
      formData.append('API_KEY', this.config.apiKey);
      formData.append('userid', localStorage.getItem('userId'));
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

}
