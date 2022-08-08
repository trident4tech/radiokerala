import { Component, OnInit,ViewChild } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { CancelComponent } from '../cancel/cancel.component';

@Component({
  selector: 'ngx-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.scss']
})
export class InvalidComponent implements OnInit {
  selectedFile: File;
  public successResponseArray   : any[]=[];
  public errorResponseArray     : any[]=[];
 @ViewChild('item', { static: true }) accordion;
  constructor(public config:ConfigService,
    public http: HttpClient,private dialogService: NbDialogService) { 
    this.config.checkAccesswith404('pages/invalid'); 
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData () {
   

    this.config.targeturl = this.config.apiUrl+'v1/ticketing/data/invalid_ticket';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
       p:this.config.itemsPerPage,
        token: this.config.doDecrypt(localStorage.getItem('token')),
    roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
   
    };
   
     
     this.http.post(this.config.targeturl,this.config.postdata)
        .subscribe(
          (response) => {this.config.checkStatus(response['Status'],response['version']);  
           var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {
            this.successResponseArray=[];
            this.successResponseArray.push(response);
            this.config.itemdata=response['Data']['data'];
  //console.log(response);
            this.config.generatePaging(this.successResponseArray[0]['Data'],this.config.apiUrl+'v1/ticketing/data/invalid_ticket');         
        }
        else {
            console.log(responseDetails[0]['Feedback']);
      this.config.showErrorToaster('Loading failed.');
        }
  },
      (error)=>{
        console.log(error);
            this.config.showErrorToaster('Loading failed.');
      }
    );
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const uploadData = new FormData();
  uploadData.append('file', this.selectedFile, this.selectedFile.name);
  this.http.post(this.config.apiUrl+'v1/file/upload',uploadData)
        .subscribe(
          (response) => {console.log(response);
    });
  }

}
