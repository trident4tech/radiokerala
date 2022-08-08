import { Component, OnInit,ViewChild } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { CancelComponent } from '../cancel/cancel.component';
import { ChangedateComponent } from '../changedate/changedate.component';



@Component({
  selector: 'ngx-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
	public thicketAttrId:string;
	public loadMore : string;
  public showLoadMore:boolean=true;
	public showList:boolean=true;
	public showView:boolean=false;
	public ticketArray:any[]=[];
	public bookDetails: any[]=[];
	public showPrgress            :boolean=false;
	public successResponseArray   : any[]=[];
  public errorResponseArray     : any[]=[];
	public showSearch : boolean=false;
	public temptArray :any[]=[];
	public grandTotal :number=0;
	public qrDAta                 :string='';
	public ticketNumber                 :string='';
	public ticketTempArray:Array<any>[]=[];
	public searchTerm: string='';
	public bookeddate:any;
  public mode: string='';
  public pmode: string='';
  public counter :string='';
  public dest : string='';
  public modes:any[]=[];
  public pmodes:any[]=[];
   public viewaction :any;
   public counters :any[] = [];
   public destinations : any[]=[];
   appTitle :string='';
   terms:any = []; 
   public classDetails : any =[];
 @ViewChild('item', { static: true }) accordion;
  constructor(public config:ConfigService,
  	public http: HttpClient,private dialogService: NbDialogService) { 
    this.config.checkAccesswith404('history'); 
  }

  ngOnInit(): void {
    this.classDetails = [];
    let termsa = [];
    if (localStorage.getItem('destTerms')!='')
      termsa = JSON.parse(localStorage.getItem('destTerms'));

    var resultArray = Object.keys(termsa).map(function(keyIndex){
    let data = termsa[keyIndex];
    // do something with person
        return data;
    });

    this.terms = resultArray;
    this.appTitle = localStorage.getItem('appTitle');
  	this.loadData();
  }
   toggle() {
    this.accordion.toggle();
  }
  loadData () {
    this.modes = [{'modeid':this.config.OTNO,'modename':'Counter'},{'modeid':this.config.OTYES,'modename':'Public'}];     
    this.pmodes = [{'modeid':this.config.CASHMODE,'modename':'Cash'},{'modeid':this.config.UPIMODE,'modename':'UPI'},{'modeid':this.config.POSMODE,'modename':'POS'},{'modeid':this.config.ONLINEMODE,'modename':'Online'}];     
    
    if (this.config.isCounterStaff) {
      var count = localStorage.getItem('linkedcounter');
      this.counters = JSON.parse(count);   
    }
    else {
      var count = localStorage.getItem('allcountersbyuser');
      this.counters = JSON.parse(count);
    }  
    var dests = localStorage.getItem('destinations');
    this.destinations = JSON.parse(dests);  
    
//    console.log(this.counters);
  	var date = new Date(); 		
  	if (this.bookeddate!='undefined' && this.bookeddate!=undefined)
    		date = this.bookeddate;
  	var bdate = ('0' + date.getDate()).slice(-2) + '-'
             + ('0' + (date.getMonth()+1)).slice(-2) + '-'
             +date.getFullYear();

    this.config.targeturl = this.config.apiUrl+'v1/ticketing/data/list_ticket';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
       p:this.config.itemsPerPage,
		token: this.config.doDecrypt(localStorage.getItem('token')),
    roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
		date : bdate,
    usrdest : localStorage.getItem('destId')
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
	        this.config.generatePaging(this.successResponseArray[0]['Data'],this.config.apiUrl+'v1/ticketing/data/list_ticket');         
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


async doPrint(data,classdata): Promise<void> {
  this.classDetails = JSON.parse(classdata);
          await this.config.delay(1000);
          var DocumentContainer = document.getElementById('print-content'+data);
          var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
          var strHtml = "<html>\n<head>\n <link rel=\"stylesheet\" type=\"text/css\" href=\"test.css\">\n</head><body><div style=\"testStyle\">\n"
        + DocumentContainer.innerHTML + "\n</div>\n</body>\n</html>";
          WindowObject.document.writeln(strHtml);
          WindowObject.document.close();
          WindowObject.focus();
          
          WindowObject.print();
          WindowObject.close();               

  }
	async doSearch() {
		var date = new Date(); 		
  	if (this.bookeddate!='undefined' && this.bookeddate!=undefined)
    		date = this.bookeddate;
  	var bdate = ('0' + date.getDate()).slice(-2) + '-'
             + ('0' + (date.getMonth()+1)).slice(-2) + '-'
             +date.getFullYear();
             
    this.config.postdata = {
       tpNumber : this.searchTerm,
       p:this.config.itemsPerPage,
		   token: this.config.doDecrypt(localStorage.getItem('token')),
       roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
       date : bdate,
       mode:this.mode,
       pmode:this.pmode,
       counter:this.counter,
       dest : this.dest,
       usrdest : localStorage.getItem('destId')
       
    };
   
     this.http.post(this.config.targeturl,this.config.postdata)
    .subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);	
        this.successResponseArray=[];
        this.successResponseArray.push(response);
       this.config.itemdata=response['Data']['data'];

       this.config.generatePaging(this.successResponseArray[0]['Data'],this.config.apiUrl+'v1/ticketing/data/list_ticket'); 
      
      },
      (error)=>{
        console.log(error);
      }
    );
	}
changeMode (selectedValue: any) {
  this.mode = selectedValue;
  this.doSearch();
}
changePMode (selectedValue: any) {
  this.pmode = selectedValue;
  this.doSearch();
}
changeCounter (selectedValue: any) {
  this.counter = selectedValue;
  this.doSearch();
}
changeDest (selectedValue: any) {
  this.dest = selectedValue;
  this.doSearch();
}
  docancel (ticketno,acno) {
    this.viewaction = this.dialogService.open(CancelComponent,{context:{
      'tno':ticketno,
      'ticket':acno
    }}).onClose.subscribe(() => {
      this.config.goPageno(this.config.currentpageno,this.config.apiUrl+'v1/ticketing/data/list_ticket'); 
       
       this.viewaction.unsubscribe();
      });
  }
  dochange (ticketno,acno,cdate) {
    this.viewaction = this.dialogService.open(ChangedateComponent,{context:{
      'tno':ticketno,
      'ticket':acno,
      'ticketdate':cdate
    }}).onClose.subscribe(() => {
      this.config.goPageno(this.config.currentpageno,this.config.apiUrl+'v1/ticketing/data/list_ticket'); 
       
       this.viewaction.unsubscribe();
      });
  }
}
