import { ChangeDetectionStrategy, Component, ViewChild, OnInit,ElementRef,HostListener } from '@angular/core';
import { Observable, of , Observer, fromEvent, merge} from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { ConfigService } from '../../../config.service';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from '../../../@core/utils';


@Component({
  selector: 'ngx-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss']
})
export class VerificationsComponent implements OnInit {
  public ticketcontent = null;
    qrResultString: string = '';
    isOpen:boolean = false;
    ticketDetails:any = []; 
    verStatus : boolean=false;
    rate : any;
    ticket:any;
    tdate:any;
    content:any;
    dest:any;
    public noError:boolean=true;
    public errorResponseArray:any=[];
    isConnected :boolean; 
    result:any; 
    verticketDetails:any[]=[];
    destStatus:boolean = false;
    proceed:boolean = true;
    ticketStatus:boolean = true;
    prevStatus:boolean = false;
    counterStatus:boolean = false;
    dateStatus:boolean = true;
    dateChecking:string='';
    counterName:string='';
    destName:string='';
    hasInput:boolean = false;
    network:string='';
    prevText:string='';
    ticketText:string='';
    attrName:string='';
    attrStatus:boolean=false;
    allowScan : number = 1;

   constructor(private layoutService: LayoutService,private connectionService: ConnectionService,private router: Router,public config:ConfigService,public http: HttpClient) { 
    this.config.checkAccesswith404('pages/verifications'); 
   }


  ngOnInit(): void {    
    this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
    this.verticketDetails = [];
    this.allowScan = parseInt(localStorage.getItem('destAllowScanVerify'));
  }


  clearResult(): void {
    this.qrResultString = '';
    this.hasInput = false;
  }

  onCodeResult(resultString: string) { 
    this.qrResultString = resultString;
    console.log( this.qrResultString );

    this.isOpen = false;
    this.checkVerification (this.qrResultString+'',this.config.OTYES);

  }
  openCamera() { 
    this.qrResultString = '';   
    this.isOpen = true;
    this.hasInput = false;
  }
  verify(ticketno) {
      this.errorResponseArray['ticket'] = '';
      this.noError = true; 
    if (ticketno.value =='' || ticketno.value===undefined) {
      this.errorResponseArray['ticket'] = 'Ticket No. Required';
      this.noError=false;   
    }
    if(this.noError){
      this.checkVerification (ticketno.value+'',this.config.OTNO);
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
  checkVerification (ticketData,mode) {
    this.ticketcontent = null;
    this.hasInput = true;
    var date = new Date();  
    let currentDest = localStorage.getItem('destNo');        
    let currentDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    let allcounters = JSON.parse(localStorage.getItem('allcounters'));    
    let allcountersData = JSON.parse(localStorage.getItem('allcounterDetails'));  
    let allattrs:number[] = []; 
    allattrs = [];
    allattrs = JSON.parse(localStorage.getItem('allattrs'));    
    let allAttrData:any[] = [];
    allAttrData = [];
    allAttrData = JSON.parse(localStorage.getItem('allAttrDetails'));  
    this.destStatus = false;
    this.attrStatus = false;
    this.attrName = '';
    let ticketDetails = ticketData.split('.');
    this.proceed = true;
    this.ticketStatus = true;
    this.prevStatus= false;
    let counterId = ticketDetails[2];
    let attrId = ticketDetails[1];
    this.counterStatus = false;
    this.dateChecking = '';
    this.counterName = 'Unknown';
    this.destName = '';
    this.dateStatus = false;
    this.network = 'Offline';
    this.prevText = 'Not Verified';
    this.ticketText = 'Valid Ticket';
    this.tdate = '';
    this.content = '';
    this.rate = '';
   
    if (this.isConnected) {
      this.network = 'Online';
    }
    else {
      this.tdate ='Offline';
    }

    if (mode==this.config.OTYES) { // for scanner
      var splitted = ticketData.split(";"); 
      if (splitted.length>1) {
       this.tdate = splitted[1];
       this.ticket = splitted[0];
       this.content = splitted[2];
       this.rate = splitted[4];
      }
    }
    else{
      this.dateChecking = 'Please confirm the date';
      this.ticket = ticketData;      
    }   
    if (ticketDetails.length==4) {
      let counterStats = allcounters.indexOf(counterId); 
      let attrStats = allattrs.indexOf(parseInt(attrId));
      if (!this.isConnected) {
        let verifiedTickets = JSON.parse(localStorage.getItem('verifiedTickets'));
        let index = verifiedTickets.indexOf(this.ticket);      
        if (index>=0) {
          this.prevStatus = true;
          this.prevText = 'Verified';
        }
      }
      if (ticketDetails[0]==currentDest) { //destination checking
        this.destStatus = true; 
        this.destName = localStorage.getItem('destName');       
      }
      else {
        this.proceed = false;
        this.destName = 'Unknown';
      }
      if (attrStats>=0) { //counter checking
        this.attrStatus = true; 
        this.attrName = allAttrData[attrId];
      }
      else {
        this.proceed = false;
        this.attrName = 'Unknown';
      }
      if (counterStats>=0) { //counter checking
        this.counterStatus = true; 
        this.counterName = allcountersData[counterId];
      }
      else if (counterId==0) {
        this.counterStatus = true; 
        this.counterName = 'Public Booking';        
      }
      else {
        this.proceed = false;
      }

      if (this.tdate==currentDate) { //date checking
        this.dateStatus = true;         
      }
    }
    else {
      this.proceed = false;      
    }
  
    if (this.proceed) {
      if (this.isConnected) { //check ticket details
        this.http.post(this.config.apiUrl+'v1/ticketing/data/getdata',{
          'ticketno' : this.ticket, 
          token:this.config.doDecrypt(localStorage.getItem('token')),
          roleid: this.config.doDecrypt(localStorage.getItem('roleId'))
        }).subscribe( (response) => {
          
              this.config.checkStatus(response['Status'],response['version']);
              if (response['ticketStatus']==this.config.OTYES)  {
                let data:any[] = [];
                data = [];
                data = response['data'][0];
                if (data['tp_ver_status']==this.config.OTYES) {
                  this.prevStatus = true;
                  this.prevText = 'Verified';
                }
                else {
                  this.prevStatus = false;
                  this.prevText = 'Not Verified';
                }
                let date = new Date(data['tp_date']);
                this.tdate = ('0' + date.getDate()).slice(-2)+ '/'+ ('0' + (date.getMonth()+1)).slice(-2) + '/'+date.getFullYear() ;
                this.content = data['tp_content'];
                this.rate = data['tp_rate'];
                this.ticketcontent = null;
                let str = data['tp_content'];
                if ( str != null && str != undefined && str != 'NULL'  && str != 'null' ){
                  this.ticketcontent = str.replace('<br/>', ","); 
                }
                this.ticketStatus = true;this.ticketText = 'Invalid Ticket';
              }
              else 
                this.ticketStatus = false;this.ticketText = 'Invalid Ticket';
          },
          (error)=>{
            this.config.showErrorToaster(error);
            this.ticketStatus = false;
            this.ticketText = 'Invalid Ticket';
          }
        );
        if (this.ticketStatus && this.allowScan==this.config.OTYES)
          this.doVerify ();
      }
    }
    else {
      this.ticketStatus = false;
      this.ticketText = 'Invalid Ticket';
    }
  }
  doVerify () {
     var date = new Date();  
     let data = {'ticket' : this.ticket,'user' : this.config.doDecrypt(localStorage.getItem('userId')),'isoffline' : this.config.OTNO,'date' : date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(),'time':date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()};
     if (this.isConnected) { 
        data.isoffline = this.config.OTNO;
     }
     else {
        data.isoffline = this.config.OTYES;
     }
     let json:any[] = [];
     json[0] = [];
     json[0] = data;
     this.hasInput = false;
     if (this.isConnected) { 
       this.http.post(this.config.apiUrl+'v1/ticketing/data/verification',json 
            ).subscribe( (response) => {
              console.log(response);
              this.config.showSuccessToaster('Verified');
            },
            (error)=>{
              this.config.showErrorToaster(error);            
            }
          );
      }
      else {        
         this.verticketDetails = JSON.parse(localStorage.getItem('verifiedTicketDetails'));
         this.verticketDetails.push(data);
         let jsondata = JSON.stringify(this.verticketDetails);
         localStorage.setItem('verifiedTicketDetails',jsondata);
         let vertickets:any[] = [];
         vertickets = [];
         vertickets = JSON.parse(localStorage.getItem('verifiedTickets'));
         vertickets.push(this.ticket);
         jsondata = JSON.stringify(vertickets);
         localStorage.setItem('verifiedTickets',jsondata);        
      }
  }
  doOfflineVerSync() {
     let ticketDetails = JSON.parse(localStorage.getItem('verifiedTicketDetails'));
     let json = localStorage.getItem('verifiedTicketDetails');
        if (json.length>0) {
          this.http.post(this.config.apiUrl+'v1/ticketing/data/verification',
           json
              ).subscribe( (response) => {
                ticketDetails = [];
                json = JSON.stringify(ticketDetails);
                localStorage.setItem('verifiedTicketDetails',json);      
                localStorage.setItem('verifiedTickets',json); 
                this.config.showSuccessToaster('Verification data has been synchronized successfully');
            },
            (error)=>{
              this.config.showErrorToaster(error);
            }
            ); 

              //Offline ver synch after add tickets offline
           ticketDetails = [];
           json = JSON.stringify(ticketDetails);
           this.http.post(this.config.apiUrl+'v1/ticketing/data/offlineupdateverification',
           json
              ).subscribe( (response) => {
            },
            (error)=>{
            }
            ); 
     }

  }

}
