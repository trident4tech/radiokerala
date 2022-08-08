import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { CommonModule } from '@angular/common';
import { FormsModule as ngFormsModule } from '@angular/forms';
imports: [CommonModule, ngFormsModule]

@Component({
  selector: 'ngx-addconstants',
  templateUrl: './addconstants.component.html',
  styleUrls: ['./addconstants.component.scss']
})
export class AddconstantsComponent implements OnInit {
  public destinations: any = [];
  public roles: any = [];
  public role: any;
  public counters: any = [];
  public ugrps: any = [];
  public errorResponseArray: any = [];
  public noError: boolean = true;
  public ugrpAllow: number;
  public destAllow: number;
  public destOnly: number;
  public isCounterStaff: boolean = false;
  public destId: any;
  public selectedCounters: any = [];
  public dest: number;
  public grp: number;
  public conf: any = [];
  public constNAme = null;
  public conatsntDescription = null;
  public constantValue = null;
  public bookeddate = null;



  constructor(protected ref: NbDialogRef<AddconstantsComponent>, public config: ConfigService, public http: HttpClient) {

    if (localStorage.getItem('constname') != null && localStorage.getItem('constname') != undefined && localStorage.getItem('constname') != '') {
      this.constNAme = localStorage.getItem('constname');
      this.conatsntDescription = localStorage.getItem('constDescription');
      this.constantValue = localStorage.getItem('constvalue');
      localStorage.removeItem('constname');
      localStorage.removeItem('constDescription');
      localStorage.removeItem('constvalue');


    }
  }

  cancel() {
    this.ref.close();
  }
  dismiss() {
    this.ref.close();
  }
  ngOnInit(): void {
    this.conf = [];
    this.errorResponseArray['constname'] = '';
    this.errorResponseArray['value'] = '';
    this.errorResponseArray['description'] = '';
  }

  dosubmit(form) {
    this.errorResponseArray['constname'] = '';
    this.errorResponseArray['value'] = '';
    this.errorResponseArray['description'] = '';
    // validation
    this.noError = true;
    if (form.value['constname'] == '' || form.value['constname'] === undefined) {
      this.errorResponseArray['constname'] = 'Constant Name Required';
      this.noError = false;
    }
    if (form.value['value'] == '' || form.value['value'] === undefined) {
      this.errorResponseArray['value'] = 'Value Required';
      this.noError = false;
    }
    if (form.value['description'] == '' || form.value['description'] === undefined) {
      this.errorResponseArray['description'] = 'Description Required';
      this.noError = false;
    }


    if (this.noError) {
      this.http.post(this.config.apiUrl + 'v1/constant/create', {
        constantname: form.value['constname'],
        description: form.value['description'],
        constantvalue: form.value['value'],
        token: this.config.doDecrypt(localStorage.getItem('token')),
        ucreated: this.config.doDecrypt(localStorage.getItem('userId')),
        roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
      })
        .subscribe(
          (response) => {
            console.log(response);
            this.config.checkStatus(response['Status'],response['version']);
            var responseDetails = [];
            responseDetails.push(response);
            if (responseDetails[0]['Status'] == this.config.OTYES) {
              this.config.showSuccessToaster('Constant has been successfully Inserted.');
              this.ref.close();
              this.config.delay(100);
            }
            else {
              console.log(responseDetails[0]['Feedback']);
              this.config.showErrorToaster('Insertion failed.' + responseDetails[0]['Feedback']);
            }
          },
          (error) => {
            this.config.showErrorToaster('Insertion failed.');
          }
        );
    }
    else {
      console.log(this.errorResponseArray);
      this.config.showErrorToaster(this.config.validationError);
    }
  }

  editConstant() {
    if (this.bookeddate == '' || this.bookeddate === undefined || this.constantValue == '' || this.constantValue === undefined) {
      this.config.showErrorToaster(this.config.validationError);

    } else {
      var tdate = this.bookeddate.getFullYear() + '-' + ('0' + (this.bookeddate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.bookeddate.getDate()).slice(-2);
      this.http.post(this.config.apiUrl + 'v1/constant/create', {
        constantname: this.constNAme,
        description: this.conatsntDescription,
        constantvalue: this.constantValue,
        date: tdate,
        ucreated: this.config.doDecrypt(localStorage.getItem('userId')),
        token: this.config.doDecrypt(localStorage.getItem('token')),
        roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
      })
        .subscribe(
          (response) => {
            console.log(response);
            this.config.checkStatus(response['Status'],response['version']);
            var responseDetails = [];
            responseDetails.push(response);
            if (responseDetails[0]['Status'] == this.config.OTYES) {
              this.config.showSuccessToaster('Constant has been successfully Inserted.');
              this.ref.close();
              this.config.delay(100);
            }
            else {
              console.log(responseDetails[0]['Feedback']);
              this.config.showErrorToaster('Insertion failed.' + responseDetails[0]['Feedback']);
            }
          },
          (error) => {
            this.config.showErrorToaster('Insertion failed.');
          });
      
      
    }
  }

}


