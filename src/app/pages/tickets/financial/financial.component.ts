import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of , Observer, fromEvent, merge} from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NbDialogService,NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {
    public isConnected :boolean;  
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
     public ctime:string='';
     public data : any[] = [];
     public users : any[] = [];
     public user : string = '';
     public usrName : string='';
     public result :any = [];
     public canceldata :any = [];
  
    constructor(public config:ConfigService,public http: HttpClient,private dialogService: NbDialogService) {
      this.config.checkAccesswith404('pages/financial'); 
      //this.bookeddate =  new Date();
      this.destPlace = localStorage.getItem('destPlace');
      this.destPh = localStorage.getItem('destPhone');
      this.destWeb = localStorage.getItem('destWeb');
     if (!this.config.isCounterStaff) {
      var count = localStorage.getItem('alldest');
      this.destinations = JSON.parse(count);
    }  
       this.user = '';
     
    }
    ngOnInit(): void {
      this.isConnected = true; 
      this.data = [];
      this.appTitle = localStorage.getItem('appTitle');
      this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
      this.loadData();
      this.doSearch();
  }
loadData() {
  let i = 0;
  this.users = [];
    this.config.users = JSON.parse(localStorage.getItem('users'));
    this.config.users.forEach(element => {     
      if ((this.dest!='' && this.dest==element.dest_id) || this.dest=='') {
         this.users[i] = [];
        this.users[i]['usrId'] = element.usr_id;
        this.users[i]['usrName'] = element.usr_user_name+' '+element.usr_name+'('+element.dest_name+')';
        i++;
      }
    });
}
changeCounter (selectedValue: any) {
  this.dest = selectedValue;
  this.loadData();
  this.destinations.forEach(element => {
    if (element.destId==selectedValue)
      this.destName = element.destName;
  });
  this.doSearch();
}
changeUser (selectedValue: any) {
  this.user = selectedValue;
  this.users.forEach(element => {
     if (element['usrId']==selectedValue) {
      this.usrName = element['usrName'];
    }
  });  
  this.doSearch();
}

    async doSearch() {
          
            var date = new Date(); 
            this.cdate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
            this.ctime = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()  ;
        
              this.showData = true;
              this.date = new Date();      
              if (this.bookeddate!='undefined' && this.bookeddate!=undefined)
                      this.date = this.bookeddate;
              var tdate =  this.date.getFullYear()+ '-'+ ('0' + (this.date.getMonth()+1)).slice(-2)+ '-'+('0' + this.date.getDate()).slice(-2);
              this.bdate =   ('0' + this.date.getDate()).slice(-2)+ '-'+('0' + (this.date.getMonth()+1)).slice(-2)+ '-'+this.date.getFullYear();
               if (this.isConnected) {          
                  this.http.post(this.config.apiUrl+'v1/summary/UPjBZmJPf3QOeNfYw9NhJysivIydIV8vFGO311nPLedVym4dM4ExQcw3F2ZoyI3o',{
              user : this.config.doDecrypt(localStorage.getItem('userId')),
                date : tdate,
          dest : this.dest,
          searchUsr : this.user
              })
              .subscribe(
                (response) => {
            console.log(response);
              this.config.checkStatus(response['Status'],response['version']);
              this.successResponseArray = [];
              this.successResponseArray.push(response); 
                  this.bookDetails=[];
                  this.bookDetails=this.successResponseArray[0];
                  
                },
                (error)=>{
                  console.log(error);
                }
              );
            }
          else {
              var ldate = this.date.getDate()+'-'+(this.date.getMonth()+1)+'-'+this.date.getFullYear();
                   
              this.bookDetails=[]; 
              let usr = localStorage.getItem('user');       
              let jsonData = JSON.parse(localStorage.getItem('repData-'+ldate));
                
               this.bookDetails = jsonData;
               this.result = [];
               var keys = Object.keys(jsonData.data);
               let res = [];
              keys.forEach(function(key){
                  res.push(jsonData.data[key]);
              });
              this.result = res;
              this.canceldata = [];
              keys = Object.keys(jsonData.candata);
               res = [];
              keys.forEach(function(key){
                  res.push(jsonData.candata[key]);
              });
              this.canceldata = res;
              if (this.isConnected)
                this.usrName = localStorage.getItem('username')+' '+localStorage.getItem('name');
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
                  //WindowObject.document.close();
                  WindowObject.focus();
                  this.config.delay(600000);
                  WindowObject.print();
                 // WindowObject.close(); 
            
            this.action.unsubscribe();  
            this.showData = false;          
          }
          });
    }
     createOnline$() {
      return merge<boolean>(
        fromEvent(window, 'offline').pipe(map(() => false)),
        fromEvent(window, 'online').pipe(map(() => true)),
        new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
        }));
      }
}
