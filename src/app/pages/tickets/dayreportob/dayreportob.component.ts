import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NbDialogService,NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-dayreportob',
  templateUrl: './dayreportob.component.html',
  styleUrls: ['./dayreportob.component.scss']
})
export class DayreportobComponent implements OnInit {

  public bookDetails: any[]=[];
    public successResponseArray   : any[]=[];
    public bookeddate:any;
    public date:any;
    public bdate:any;
    public action :any;
    public showData : boolean = false;
    public destPlace : string='';
    public destPh : string='';
    public destWeb : string='';
    appTitle : string ='';
     public dest :string='';
     public destinations :any[] = [];
     public destName : string ='';
     public cdate:string='';
     public ctime: string='';
  
    constructor(public config:ConfigService,public http: HttpClient,private dialogService: NbDialogService) {
      this.config.checkAccesswith404('pages/dayreportob'); 
      //this.bookeddate =  new Date();
      this.destPlace = localStorage.getItem('destPlace');
      this.destPh = localStorage.getItem('destPhone');
      this.destWeb = localStorage.getItem('destWeb');
     if (!this.config.isCounterStaff) {
      var count = localStorage.getItem('alldest');
      this.destinations = JSON.parse(count);
      
    } 
    this.dest = localStorage.getItem('destId');
     this.doSearch(); 
     
    }
    ngOnInit(): void {
      this.appTitle = localStorage.getItem('appTitle');

  }
changeCounter (selectedValue: any) {
  this.dest = selectedValue;
  this.destinations.forEach(element => {
    if (element.destId==selectedValue)
      this.destName = element.destName;
  });
  this.doSearch();
}
    async doSearch() {
      var date = new Date(); 
      this.cdate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
      this.ctime = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()  ;
  
        if (this.dest!=''){
        this.date = new Date();      
        if (this.bookeddate!='undefined' && this.bookeddate!=undefined)
                this.date = this.bookeddate;
        var tdate =  this.date.getFullYear()+ '-'+ ('0' + (this.date.getMonth()+1)).slice(-2)+ '-'+('0' + this.date.getDate()).slice(-2);
        this.bdate =   ('0' + this.date.getDate()).slice(-2)+ '-'+('0' + (this.date.getMonth()+1)).slice(-2)+ '-'+this.date.getFullYear();
                 
            this.http.post(this.config.apiUrl+'v1/getdepcollection',{
        user : this.config.doDecrypt(localStorage.getItem('userId')),
          date : tdate,
    dest : this.dest,
        })
        .subscribe(
          (response) => {
        this.successResponseArray = [];
        this.successResponseArray.push(response); 
            this.bookDetails=[];
            this.bookDetails=this.successResponseArray[0]['data'];
          this.showData = true;
          },
          (error)=>{
            console.log(error);
          }
        );
        }
    }
    doPrint() {
        this.action = this.dialogService.open(ConfirmComponent)
      .onClose.subscribe((status) => { 
        if (status==this.config.OTYES) { 
                var DocumentContainer = document.getElementById('print-content');
                var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
                var strHtml = "<html>\n<head>\n <link rel=\"stylesheet\" type=\"text/css\" href=\"test.css\">\n</head><body><div style=\"testStyle\">\n"
                + DocumentContainer.innerHTML + "\n</div>\n</body>\n</html>";
               // this.printing.setPrintStyles(false);
                  WindowObject.document.writeln(strHtml);
                 // WindowObject.document.close();
                  WindowObject.focus();
                  this.config.delay(600000);
                  WindowObject.print();
                  //WindowObject.close(); 
            
            this.action.unsubscribe();  
            this.showData = false;          
          }
          });
    }

}
