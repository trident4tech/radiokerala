import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config.service';
import { CommonModule } from '@angular/common';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { DeleteComponent } from '../../pages/delete/delete.component';


imports: [CommonModule, ngFormsModule]

@Component({
  selector: 'ngx-scheduledconstants',
  templateUrl: './scheduledconstants.component.html',
  styleUrls: ['./scheduledconstants.component.scss']
})
export class ScheduledconstantsComponent implements OnInit {

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
  public successResponseArray = null;
  public dataArray;
  public text : String = "Please Wait..!";
  public viewlog : boolean = false;
  constructor(protected ref: NbDialogRef<ScheduledconstantsComponent>, public config: ConfigService, public http: HttpClient , public datepipe: DatePipe) { }

  ngOnInit(): void {

    this.constNAme = localStorage.getItem('constname');
    if ( localStorage.getItem('viewlog') == '2'){
      this.viewlog = true;
      this.viewlogs()
    }else{
      this.loadDatas();
    }
  }


  
  cancel() {
    this.ref.close();
  }
  dismiss() {
    this.ref.close();
  }


  

  async loadDatas() {
    var url = this.config.apiUrl+'v1/constant/viewscheduled';
    this.config.postdata = {
      token: this.config.doDecrypt(localStorage.getItem('token')),
      roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
      constantname : this.constNAme,
       p:this.config.itemsPerPage,
    };

    this.http.post(url, this.config.postdata)
      .subscribe(
        (response) => {
          this.text = "No data found..";
         console.log(response); 
          this.dataArray = response['Data'];
          if ( this.dataArray.length <= 0 ){
            this.dataArray = null;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  

  converDate( val ){
    var dateStr = val;
    if ( val == null || val == '' || val == 'null' )
      return '-N/A-';
    else
      return this.datepipe.transform(val, 'dd/MM/yyyy');
  }

  deleteConstant ( pkey ){
    var data = {};
    data[ 'constantid' ] = pkey;
    data['token']=this.config.doDecrypt(localStorage.getItem('token'));
    data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
     this.confirm("Constant",'v1/constant/delete',data);         
     this.config.delay(6000);
     this.loadDatas();

  }


  confirm(segment,url,data){
    this.config.delstatus = this.config.OTNO;
    this.config.action = this.config.dialogService.open(DeleteComponent)
    .onClose.subscribe((status) => {
      if (status==this.config.OTYES) {
        this.http.post(this.config.apiUrl+url,data).subscribe(
          (response) => {   this.config.checkStatus(response['Status'],response['version']);
            this.config.showSuccessToaster(segment+' has been deleted');
            this.config.delay(100);
          },
          (error)=>{
            this.config.showErrorToaster('Sorry! '+segment+' deletion has been failed. Please try again.');
          }
        );
      }
      this.loadDatas(); 
      this.config.action.unsubscribe();
    });
}


viewlogs(){
  var url = this.config.apiUrl+'v1/constant/viewscheduled';
  this.config.postdata = {
    token: this.config.doDecrypt(localStorage.getItem('token')),
    roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
    constantname : this.constNAme,
    viewlog : 2,
     p:this.config.itemsPerPage,
  };

  this.http.post(url, this.config.postdata)
    .subscribe(
      (response) => {
        this.text = "No data found..";
       console.log(response); 
        this.dataArray = response['Data'];
        if ( this.dataArray.length <= 0 ){
          this.dataArray = null;
        }
      },
      (error) => {
        console.log(error);
      }
    );
}

getstatus( date){
  var today = new Date();
  if ( this.datepipe.transform( today, 'yyyy-MM-dd') > this.datepipe.transform( date, 'yyyy-MM-dd') )
    return "Expired";
  else
    return "Active";

}



}
