import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../config.service';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { AddconstantsComponent } from '../../addconstants/addconstants.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScheduledconstantsComponent } from '../scheduledconstants/scheduledconstants.component';
import { ConfirmComponent } from '../../pages/tickets/confirm/confirm.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ViewclassComponent  } from '../../pages/tickets/viewclass/viewclass.component';


@Component({
  selector: 'ngx-surveylistdraft',
  templateUrl: './surveylistdraft.component.html',
  styleUrls: ['./surveylistdraft.component.scss']
})
export class SurveylistdraftComponent implements OnInit {
  public draftArray = {};
  public deletedArray = {};
  public action: any;
  public isDraft = 1;
  public viewaction: any;
  constructor(
    public config: ConfigService,
    public http: HttpClient, private dialogService: NbDialogService,
    public router: Router,
    private activerouter: ActivatedRoute,
  ) {
    this.config.checkAccesswith404("My Draft");
  }

  ngOnInit(): void {
    this.activerouter.paramMap.subscribe(params => {   
      if (params.get('reference')) {
        let reference = params.get('reference');  
        if ( reference == 'qasdeirowehfkjsdfhuyeifnhsdfdiupow' ){
          //Draft
          this.getData();
        }else{
          //Submited
          this.getDataSubmited()
        }
      }
    });
  }


  public getData() {
    let draftStr = localStorage.getItem('offlineDraft');
    let length: number = 0;
    this.draftArray = {};
    if (draftStr != '' && draftStr != null && draftStr != undefined) {
      this.draftArray = JSON.parse(localStorage.getItem('offlineDraft'));

      console.log(this.draftArray)
    }
    this.refreshDeletedArray();
  }
  getDataFromList(dta) {
    console.log(dta);
  }

  editDrat(key) {
    let dta = this.draftArray[key];
    localStorage.setItem("editDraftItem", JSON.stringify(dta));
    localStorage.setItem("draftId", key);
    this.router.navigate(['/pages/editsurvey']);
    console.log(dta);

  }


  deleteDraft(key) {
    let title = "This action will permenetly delete the survey..";
    this.action = this.dialogService.open(ConfirmComponent, { context: { title } })
      .onClose.subscribe((status) => {
        if (status == this.config.OTYES) {
          let dta = this.draftArray[key];
          let draftStr = JSON.parse(localStorage.getItem('draftDeleteStr'));
          let deleteStr = {};
          if (draftStr != '' && draftStr != null && draftStr != undefined) {
            deleteStr = JSON.parse(localStorage.getItem('draftDeleteStr'));
          }
          deleteStr[key] = key;
          localStorage.setItem('draftDeleteStr', JSON.stringify(deleteStr));
          console.log(localStorage.getItem('draftDeleteStr'));
          this.refreshDeletedArray();
        }
      });
  }


  refreshDeletedArray() {
    let draftStr = JSON.parse(localStorage.getItem('draftDeleteStr'));
    if (draftStr != '' && draftStr != null && draftStr != undefined) {
      this.deletedArray = JSON.parse(localStorage.getItem('draftDeleteStr'));
    }
  }

  public getDataSubmited(){
    var formData: any = new FormData();
    formData.append('userid', localStorage.getItem('userId'));
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "mydraft");
    formData.append('fetchSubmited', "2");
    this.http.post(this.config.apiUrl, formData)
      .subscribe((response) => {
        if (response['status'] == this.config.OTYES) {
          this.draftArray = response ['data'];          
        }
      },
        (error) => {

        }
      );
  }


  async view( item ) {
    console.log( item );
    localStorage.setItem ( 'viewdata' , JSON.stringify ( item ) ) ;
    this.viewaction = this.dialogService.open( ViewclassComponent ).onClose.subscribe(() => {
      this.viewaction.unsubscribe();
    });

  }


}
