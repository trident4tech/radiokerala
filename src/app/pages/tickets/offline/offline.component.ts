import { Component, OnInit,ViewChild,HostListener } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of , Observer, fromEvent, merge} from 'rxjs';
import { map,startWith } from 'rxjs/operators';

@Component({
  selector: 'ngx-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {
	ticketDetails:any = []; 
	count : number;
	isConnected = true;  
    noInternetConnection: boolean; 
    clicked = false;
    appTitle :string ='';
    terms:any = []; 
    syncData :boolean=false;



  constructor(public config:ConfigService,
  	public http: HttpClient) {
    this.config.checkAccesswith404('pages/offline'); 
     }

  ngOnInit(): void {
    let termsa = JSON.parse(localStorage.getItem('destTerms'));
   
    var resultArray = Object.keys(termsa).map(function(keyIndex){
    let data = termsa[keyIndex];
    // do something with person
        return data;
    });

    this.terms = resultArray;
    this.appTitle = localStorage.getItem('appTitle');
  	this.loadData();
    let json = localStorage.getItem('ticketDetails');//JSON.stringify(this.ticketDetails);
    this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
      //insert ticket info when online
      if (this.isConnected &&json.length>2) {
        this.syncData = true;
    }
  }
  loadData () {
  	 this.ticketDetails = JSON.parse(localStorage.getItem('ticketDetails'));
     console.log(localStorage.getItem('ticketDetails'));
     this.count = this.ticketDetails.length;    
 }
 async doPrint(data) {
          var DocumentContainer = document.getElementById('print-content'+data);
        var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
        var strHtml = "<html>\n<head>\n <link rel=\"stylesheet\" type=\"text/css\" href=\"test.css\">\n</head><body><div style=\"testStyle\">\n"
        + DocumentContainer.innerHTML + "\n</div>\n</body>\n</html>";
          WindowObject.document.writeln(strHtml);
          WindowObject.document.close();
          WindowObject.focus();
          this.config.delay(60000);
          WindowObject.print();
          WindowObject.close();
                

  }
 
 	sync() {
	    this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
      //insert ticket info when online
      if (this.isConnected) {
      	let ticketDetails = JSON.parse(localStorage.getItem('ticketDetails'));
      	let json = localStorage.getItem('ticketDetails');//JSON.stringify(this.ticketDetails);
      	if (json.length>0) {
      		this.http.post(this.config.apiUrl+'v1/ticketing/data/sync',{
            'data' : json,  
            'isoffline' : this.config.OTYES, 
            'user':localStorage.getItem('username'),
            'deviceid' : localStorage.getItem('deviceid' + this.config.doDecrypt(localStorage.getItem('userId'))),
              }).subscribe( (response) => {
                if (response['Status']==this.config.OTYES)   {
                  ticketDetails = [];
                  let json = JSON.stringify(ticketDetails);
                  localStorage.setItem('ticketDetails',json);   
                  this.config.delay(100);
            		  window.location.reload(); 
                  this.syncData = false;  
                  this.config.showSuccessToaster('Ticket data has been synchronized successfully');
              }
            },
            (error)=>{
              this.config.showErrorToaster(error);
            }
            );    
      	}
      }
      else {
      	this.config.showErrorToaster('You are in offline mode. Please check your network connectivity');
      }
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
