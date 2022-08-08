import { ChangeDetectionStrategy, Component, ViewChild, OnInit,ElementRef,HostListener } from '@angular/core';
import { Observable, of , Observer, fromEvent, merge} from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { ConfigService } from '../../../config.service';
import { FormControl } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NbDialogService,NbSidebarService } from '@nebular/theme';
import {Router} from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from '../../../@core/utils';
import { TicketmodComponent } from '../ticketmod/ticketmod.component';
import { CashComponent } from '../cash/cash.component';

enum KEY_CODE {
  CASH = 0,
  UPI = 1,

}
@Component({
  selector: 'ngx-mob',
  templateUrl: './mob.component.html',
  styleUrls: ['./mob.component.scss']
})
export class MobComponent implements OnInit {

  isConnected :boolean;  
  quantity : any ;
  selectedClass : string ='';
  options: string[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;
  public ticketData:any[]=[];
  public tickets:any[]=[];
  rate : number;
  itemqty : number ;
  totalQuantity: number;
  totalRate: number ;
  totalAmount: number ;
  balance : number ;
  rec : number=0;
  public action :any;
  ticketprint :any = [];
  showPrint : number ;
  ticketDetails:any = []; 
  count : number; 
  printStatus : any;
  imagePath : string;
  image : any;
  mode : number =0;
  modetxt :string;
  paymode : number = 1;
  appTitle :string='';
  allowTerms :number=1;
  terms:any = []; 
  balanceCheck : boolean=false;
  errorResponseArray:any[] = [];
  showPrintBtn : boolean = false;
  showSummary : boolean=false;
  public viewaction :any;
  username : string ='';
  cgsts :any = [];
  sgsts :any = [];
  cgstAmount = {};
  cgstTotAmount = {};
  sgstAmount = {};
  sgstTotAmount = {};
  foil :number =1;
  destGst : string ='';

  @ViewChild('autoInput') input;
  @ViewChild('qty') qty;
  @ViewChild('quantity') inputOne: ElementRef;

   constructor(private layoutService: LayoutService,private sidebarService: NbSidebarService,private connectionService: ConnectionService,private dialogService: NbDialogService,
    private router: Router,public config:ConfigService,public http: HttpClient) {
    this.config.checkAccesswith404('pages/mob'); 
     }


  ngOnInit(): void {
    this.destGst = localStorage.getItem('destGst');    
    this.foil = parseInt(localStorage.getItem('printfolio'));
    this.cgsts = [];
    this.username = localStorage.getItem('user');
    this.errorResponseArray = [];
    this.errorResponseArray = [];
    if (parseInt(localStorage.getItem('amountMandaroty'))== this.config.OTYES)
      this.balanceCheck = true;
    this.allowTerms = parseInt(localStorage.getItem('destAllowTerms'));
    let termsa = JSON.parse(localStorage.getItem('destTerms'));
   
    if (termsa!=null) {
      var resultArray = Object.keys(termsa).map(function(keyIndex){
      let data = termsa[keyIndex];
      // do something with person
          return data;
      });

      this.terms = resultArray;
    }
    this.appTitle = localStorage.getItem('appTitle');
    this.modetxt = 'C';
    if(localStorage.getItem('counter')=='' || localStorage.getItem('counter')=='undefined' || (typeof localStorage.getItem('counter')==='undefined')) {
       this.router.navigate(['/pages/counterlist']);
    }
    this.mode = 0;
    this.options = [];
    //  localStorage.setItem('ticketDetails','')
    this.imagePath = this.config.qrcodeurl_local;
    this.printStatus = this.config.OTNO;
    this.sidebarService.toggle(true,'menu-sidebar');
    this.layoutService.changeLayoutSize();
    this.isConnected = true;  
    this.quantity = 0;
    this.rate =0.00;
    this.itemqty = 0;
    this.totalQuantity = 0;
    this.totalRate = 0;
    this.totalAmount= 0;
    this.balance = 0;
    this.count = 0; 
     // var nextInput = document.getElementById('autoInput');
     // nextInput.focus();
     this.ticketDetails = JSON.parse(localStorage.getItem('ticketDetails'));
     //console.log(localStorage.getItem('ticketDetails'));
    this.ticketprint = [];
     this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
   
    this.showPrint = this.config.OTNO;
    this.filteredOptions$ = of(this.options);
    var attr = localStorage.getItem('attraction');
    this.config.attraction = [];
    let data = JSON.parse(localStorage.getItem('counterorder'));
    // let cls = 0;
    //  var i = 0;
    // data.forEach(classdata => {  
    //   cls = classdata['class_number'];
    //   if (classdata['co_order'])
    //     cls = classdata['co_order'];
    //   this.ticketData [cls] = [];
    //   this.ticketData [cls]['classno'] =  cls;
    //   this.ticketData [cls]['classid'] =  classdata.class_id;
    //   this.ticketData [cls]['attrName'] =  classdata.attr_name;
    //   this.ticketData [cls]['attrId'] =  classdata.attr_id;
    //   this.ticketData [cls]['ticketconfig'] =  classdata.attr_ticket_config;
    //   this.ticketData [cls]['className'] =  classdata.class_name;
    //   this.ticketData [cls]['classRate'] =  classdata.class_rate;
    //   this.ticketData [cls]['noticket'] =  0;
    //   this.ticketData [cls]['item'] =  classdata.class_name+' ('+classdata.attr_name+')';
    // });
    // this.ticketData.forEach(element => {
    //     this.options[i++] = element;            
    //   });
    if (attr) {
        //console.log(attr);
        this.config.attraction = JSON.parse(attr);
        var i = 0;
        this.config.attraction.forEach(element => {
            element.classes.forEach(classdata => {            
                //this.options[i++] = classdata.classno+'-'+classdata.className+' ('+element.attrName+')';
            this.ticketData [classdata.classno] = [];
            this.ticketData [classdata.classno]['classno'] =  classdata.classno;
            this.ticketData [classdata.classno]['classid'] =  classdata.classId;
            this.ticketData [classdata.classno]['attrName'] =  element.attrName;
            this.ticketData [classdata.classno]['attrId'] =  element.attrId;
            this.ticketData [classdata.classno]['ticketconfig'] =  element.ticketconfig;
            this.ticketData [classdata.classno]['className'] =  classdata.className;
            this.ticketData [classdata.classno]['classRate'] =  classdata.classRate;
            this.ticketData [classdata.classno]['noticket'] =  0;
            this.ticketData [classdata.classno]['item'] =  classdata.className+' ('+element.attrName+')';
            this.ticketData [classdata.classno]['cgst'] =  classdata.cgst;
            this.ticketData [classdata.classno]['sgst'] =  classdata.sgst;
           
            });
         });
      // this.ticketData.forEach(element => {
      //   this.options[i++] = element;            
      // });
      data.forEach(classdata => {  
         this.options[i++] = this.ticketData[classdata.class_number]
      });

    }
    // this.filteredOptions$ = of(this.options);

    // this.inputFormControl = new FormControl();

    // this.filteredOptions$ = this.inputFormControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(filterString =>filterString.length>0 ?this.filter(filterString):[]),
    //   );
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
    addTicket (classno) {
        let not = parseInt(this.ticketData[classno]['noticket'])+1;
        this.ticketData[classno]['noticket'] = not;
        this.addSummary(classno,not);
    }
    addSummary (classno,not) {
      var totalticket = this.tickets.length;
      var notFound = true;
      if (not>0) {  
        let i = 0;
        this.tickets.forEach(ticket => {  
          let classindex = ticket['classno'];
          if (classindex==classno) {
            notFound = false;
            this.tickets[i]['quantity'] = parseInt(not);
            this.tickets[i]['rate'] = this.ticketData[classno]['classRate'];
            this.tickets[i]['total'] = this.ticketData[classno]['classRate']*not;
          } 
          i++;           
        });
        if (notFound) {
          this.tickets[totalticket] = [];
          this.tickets[totalticket]['classid'] = this.ticketData[classno]['classid'];
          this.tickets[totalticket]['classno'] = classno;
          this.tickets[totalticket]['quantity'] =  parseInt(not);
          this.tickets[totalticket]['act'] = this.ticketData[classno]['item'];
          this.tickets[totalticket]['rate'] = this.ticketData[classno]['classRate'];
          this.tickets[totalticket]['total'] = this.ticketData[classno]['classRate']*not;
        }
        this.showSummary = true;
        this.calculate();
      }
    }
    calculate () { 
  var i = 0;
  this.totalQuantity = 0;
  this.totalRate = 0;
  this.totalAmount = 0;
   this.tickets.forEach(ticket => {   
   if (isNaN(ticket['quantity'])) 
      ticket['quantity'] = 0;
    if (ticket['quantity']>0)
      this.totalQuantity+=parseInt(ticket['quantity']);
    this.totalRate+=parseInt(ticket['rate']);
    this.totalAmount+=parseInt(ticket['total']);
   });
   if ((this.rec>0 && this.balanceCheck) || !this.balanceCheck)
      this.showPrintBtn = true;
  else
    this.showPrintBtn = false;

   this.calcBalance();
 }
 calcBalance() {
  if (!isNaN(this.rec))
    this.balance = this.rec-this.totalAmount;
  if ((this.rec>0 && this.balanceCheck) || !this.balanceCheck)
      this.showPrintBtn = true;
  else
    this.showPrintBtn = false;
 }
  delItem (indx,classno) {
  this.tickets.splice(indx,1);
  this.ticketData[classno]['noticket'] = 0;
   this.calculate();
 }

 async doBooking () {
   this.errorResponseArray['rec'] = '';
  // if ((this.rec>0 && this.balanceCheck) || !this.balanceCheck) 
  {
          this.printStatus = this.config.OTYES;
          this.showPrint = this.config.OTYES;
          var tno:number;
          tno = parseInt(localStorage.getItem(this.username+'-ticketNumber'));
          if (isNaN(tno))
            tno = 0;
          tno = tno+1;
          let gno = tno;
          let destNo = localStorage.getItem('destNo');
          let counter = localStorage.getItem('counter');  
          let counterno = localStorage.getItem('counterno');                          
          let destName = localStorage.getItem('destName');
          let destMail = localStorage.getItem('destMail');
          let destWeb = localStorage.getItem('destWeb');
          let destId = localStorage.getItem('destId');
          let counterName = localStorage.getItem('counterName');
          let destPlace = localStorage.getItem('destPlace');
          let destPin = localStorage.getItem('destPin');
          let destPhone = localStorage.getItem('destPhone');
          let userId=this.config.doDecrypt(localStorage.getItem('userId'));    
          let classids:Array<number>=[];
          let attrids:Array<number>=[];
          let i= 0;
          let j = 0;
          let l = 0;
          let orgTickets : any[] = [];
          let attrData : any[] = [];
          var date = new Date(); 
          let ticketsnumber : any[] = [];
          this.tickets.forEach(ticket => { 
          if (ticket['quantity']>0) { 
            let classid = ticket['classid'];   
            let classno = ticket['classno'];    
            this.ticketData [classno]['gno'] = gno;
            let attr = this.ticketData [classno]['attrId'];      
            if(classids.indexOf(classid)==-1) {
              classids[i] = classid;
              orgTickets[classid] = {};
              orgTickets[classid]['quantity'] = 0;
              orgTickets[classid]['rate'] = 0;
              orgTickets[classid]['amount'] = 0;
              orgTickets[classid]['classid'] = classid;
              orgTickets[classid]['classno'] = classno;
              i++;
            }
            orgTickets[classid]['quantity'] =  parseInt(orgTickets[classid]['quantity'])+parseInt(ticket['quantity']);
            orgTickets[classid]['rate'] =  ticket['rate'];
            orgTickets[classid]['amount'] =  parseInt(orgTickets[classid]['amount'])+parseInt(ticket['total']);
            }  
              });
          


           let m = 0; let n = 0;
          orgTickets.forEach(ticket => {  
            let classid = ticket['classid'];
            let classno = ticket['classno']; 
            let attr = this.ticketData [classno]['attrId'];
            let classname = this.ticketData [classno]['className'];
            let classcgst:number = this.ticketData [classno]['cgst'];
            let classsgst:number = this.ticketData [classno]['sgst'];
            let gst:number=0;
            let classdata= {};
           
            if (this.ticketData [classno]['ticketconfig']==this.config.OTNO)
            {                
              for(let k=1; k<= ticket['quantity']; k++){ 
                if (ticketsnumber.indexOf(destNo+'.'+attr+'.'+counterno+'.'+tno)==-1) {                                   
                this.ticketprint[j] = {};
                this.cgsts[j] = [];
                ticketsnumber[m] = destNo+'.'+attr+'.'+counterno+'.'+tno;
                  m++;
                this.ticketprint[j]['destNo'] = destNo;
                this.ticketprint[j]['destId'] = destId;
                this.ticketprint[j]['destName'] = destName;
                this.ticketprint[j]['destmail'] = destMail;
                this.ticketprint[j]['destwebsite'] = destWeb;
                this.ticketprint[j]['attrId'] = attr;
                this.ticketprint[j]['attrName'] = this.ticketData [classno]['attrName'];
                this.ticketprint[j]['attrtype'] = this.config.OTNO;
                this.ticketprint[j]['counter'] = counter;
                this.ticketprint[j]['counterName'] = counterName;
                this.ticketprint[j]['content'] = this.ticketData[classno]['attrName']+'-1';
                this.ticketprint[j]['tno'] = tno;
                this.ticketprint[j]['prefix'] = destNo+'.'+attr+'.'+counterno;                      
                this.ticketprint[j]['quantity'] = 1;
                this.ticketprint[j]['rate'] = ticket['rate'];
                this.ticketprint[j]['actualrate'] = ticket['rate'];
                this.ticketprint[j]['date'] = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
                this.ticketprint[j]['dbdate'] = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
                this.ticketprint[j]['time'] = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()  ;
                this.ticketprint[j]['usrid'] = userId;
                this.ticketprint[j]['tpNumber'] = userId+'.'+tno;
                this.ticketprint[j]['tpNumbernew'] = this.ticketprint[j]['prefix']+'.'+tno+';'+this.ticketprint[j]['date']+';'+this.ticketprint[j]['content']+';'+ticket['rate'];
                this.ticketprint[j]['gno'] = gno;
                this.ticketprint[j]['destPlace'] = destPlace;
                this.ticketprint[j]['destPin'] = destPin;
                this.ticketprint[j]['destPhone'] = destPhone;
                this.ticketprint[j]['className'] = this.ticketData [classno]['className'];
                this.ticketprint[j]['classRate'] = this.ticketData [classno]['classRate'];
                this.ticketprint[j]['classQuantity'] = 1;
                this.ticketprint[j]['classIds'] = classid;
                this.ticketprint[j]['paymode'] = this.paymode;
                this.ticketprint[j]['classdata'][0] = {'className': this.ticketData [classno]['className'],'classQuantity':1,'classRate':this.ticketData [classno]['classRate'],'classId':classid,'cgst':this.ticketData [classno]['cgst'],'sgst':this.ticketData [classno]['sgst'],'cgstRate':this.ticketData [classno]['cgstRate'],'sgstRate':this.ticketData [classno]['sgstRate'],'gst':this.ticketData [classno]['gst']};
                this.ticketprint[j]['deviceToken'] = localStorage.getItem('deviceid' + this.config.doDecrypt(localStorage.getItem('userId')));
                if (this.ticketData [classno]['cgst']>0) {
                  if (this.cgsts[j].indexOf(this.ticketData [classno]['cgst'])==-1) {
                    this.cgsts[j].push(this.ticketData [classno]['cgst']);
                    this.cgstAmount[j][this.ticketData [classno]['cgst']] = {};
                    this.cgstAmount[j][this.ticketData [classno]['cgst']] = this.ticketprint[j]['cgstRate'];
                    this.cgstTotAmount[j][this.ticketData [classno]['cgst']] = {};
                    this.cgstTotAmount[j][this.ticketData [classno]['cgst']] = this.ticketData [classno]['classRate'];
                  }
                  else {
                    this.cgstAmount[j][this.ticketData [classno]['cgst']] = this.cgstAmount[j][this.ticketData [classno]['cgst']]+this.ticketprint[j]['cgstRate'];
                    this.cgstTotAmount[j][this.ticketData [classno]['cgst']] = this.cgstTotAmount[j][this.ticketData [classno]['cgst']]+this.ticketData [classno]['classRate'];
                  }
                }
                if (this.ticketData [classno]['sgst']>0) {
                  if (this.sgsts[j].indexOf(this.ticketData [classno]['sgst'])==-1) {
                    this.sgsts[j].push(this.ticketData [classno]['sgst']);
                    this.sgstAmount[j][this.ticketData [classno]['sgst']] = {};
                    this.sgstAmount[j][this.ticketData [classno]['sgst']] = this.ticketprint[j]['sgstRate'];
                    this.sgstTotAmount[j][this.ticketData [classno]['sgst']] = {};
                    this.sgstTotAmount[j][this.ticketData [classno]['sgst']] = this.ticketData [classno]['classRate'];
                 }
                  else {
                    this.sgstAmount[j][this.ticketData [classno]['sgst']] = this.sgstAmount[j][this.ticketData [classno]['sgst']]+this.ticketprint[j]['sgstRate'];
                    this.sgstTotAmount[j][this.ticketData [classno]['sgst']] = this.sgstTotAmount[j][this.ticketData [classno]['sgst']]+this.ticketData [classno]['classRate'];
                  }
                }
                j++;
                tno++;
              }
              }
            }
            else {
              if(attrids.indexOf(attr)==-1) {
                attrids[l] = attr;
                attrData[attr] = {};
                attrData[attr]['cgsts'] = [];
                attrData[attr]['sgsts'] = [];
                attrData[attr]['sgstTotAmount'] = [];
                attrData[attr]['cgstTotAmount'] = [];
                attrData[attr]['sgstAmount'] = [];
                attrData[attr]['cgstAmount'] = [];
                attrData[attr]['amount'] = 0;
                attrData[attr]['classQuantity'] = '';
                attrData[attr]['content'] = '';
                attrData[attr]['classRate'] = '';
                attrData[attr]['className'] = '';
                attrData[attr]['classIds'] = '';
                attrData[attr]['id'] = attr;
                attrData[attr]['classdata'] = [];
                attrData[attr]['attrname'] = this.ticketData [classno]['attrName'];;
                l++;
              }
              attrData[attr]['amount'] = parseInt(attrData[attr]['amount'])+parseInt(ticket['amount']);        
              attrData[attr]['content'] = attrData[attr]['content']+classname+'-'+ticket['quantity']+'<br/>';
              attrData[attr]['classRate'] = attrData[attr]['classRate']+ticket['rate']+'|';
              attrData[attr]['className'] = attrData[attr]['className']+classname+'|';
              attrData[attr]['classQuantity'] = attrData[attr]['classQuantity']+ticket['quantity']+'|';
              attrData[attr]['classIds'] = attrData[attr]['classIds'] +classid+'|';
              let n = attrData[attr]['classdata'].length;
              attrData[attr]['classdata'][n] ={'className':classname,'classRate':ticket['rate'],'classQuantity': ticket['quantity'],'classId':classid,'cgst':classcgst,'sgst':classsgst,'cgstRate':(classcgst/100)*ticket['rate']*ticket['quantity'],'sgstRate':(classsgst/100)*ticket['rate']*ticket['quantity'],'gst':gst};
              if (classcgst>0){
               if (attrData[attr]['cgsts'].indexOf(classcgst)==-1) {
                  attrData[attr]['cgsts'].push(classcgst);
                  attrData[attr]['cgstAmount'][classcgst] = {};
                  attrData[attr]['cgstTotAmount'][classcgst] = {};
                  attrData[attr]['cgstAmount'][classcgst] = ((classcgst/100)*ticket['rate'])*ticket['quantity'];
                  attrData[attr]['cgstTotAmount'][classcgst] = ticket['rate']*ticket['quantity'];
                }
                else {
                  attrData[attr]['cgstAmount'][classcgst] = attrData[attr]['cgstAmount'][classcgst]+((classcgst/100)*ticket['rate'])*ticket['quantity'];
                  attrData[attr]['cgstTotAmount'][classcgst] = attrData[attr]['cgstTotAmount'][classcgst]+ticket['rate']*ticket['quantity'];
                }
              }
              if (classsgst>0){
                if (attrData[attr]['sgsts'].indexOf(classsgst)==-1) {
                  attrData[attr]['sgsts'].push(classsgst);
                  attrData[attr]['sgstAmount'][classsgst] = {};
                  attrData[attr]['sgstTotAmount'][classsgst] = {};
                  attrData[attr]['sgstAmount'][classsgst] = ((classsgst/100)*ticket['rate'])*ticket['quantity'];
                  attrData[attr]['sgstTotAmount'][classsgst] = ticket['rate']*ticket['quantity'];
              
                }
                else {
                  attrData[attr]['sgstAmount'][classsgst] = attrData[attr]['sgstAmount'][classsgst]+((classsgst/100)*ticket['rate'])*ticket['quantity'];
                  attrData[attr]['sgstTotAmount'][classcgst] = attrData[attr]['sgstTotAmount'][classcgst]+ticket['rate']*ticket['quantity'];;
                }                
              }
            }

          });

         
          attrData.forEach(attrDetails => { 
            if (ticketsnumber.indexOf(destNo+'.'+attrDetails['id']+'.'+counterno+'.'+tno)==-1) {
                this.ticketprint[j] = {};                
                  ticketsnumber[m] = destNo+'.'+attrDetails['id']+'.'+counterno+'.'+tno;
                  m++;
                this.ticketprint[j]['classdata'] = attrDetails['classdata'];
                this.ticketprint[j]['destNo'] = destNo;
                this.ticketprint[j]['destId'] = destId;
                this.ticketprint[j]['destName'] = destName;
                this.ticketprint[j]['destmail'] = destMail;
                this.ticketprint[j]['destwebsite'] = destWeb;
                this.ticketprint[j]['attrId'] = attrDetails['id'];
                this.ticketprint[j]['attrName'] = attrDetails['attrname'];
                this.ticketprint[j]['className'] = attrDetails['className'];
                this.ticketprint[j]['classQuantity'] = attrDetails['classQuantity'];
                this.ticketprint[j]['classIds'] = attrDetails['classIds'];
                this.ticketprint[j]['classRate'] = attrDetails['classRate'];
                this.ticketprint[j]['attrtype'] = this.config.OTYES;
                this.ticketprint[j]['destPlace'] = destPlace;
                this.ticketprint[j]['destPin'] = destPin;
                this.ticketprint[j]['destPhone'] = destPhone;
                this.ticketprint[j]['counter'] = counter;
                this.ticketprint[j]['counterName'] = counterName;
                this.ticketprint[j]['content'] = attrDetails['content'];
                this.ticketprint[j]['tno'] = tno;
                this.ticketprint[j]['prefix'] = destNo+'.'+attrDetails['id']+'.'+counterno;
                this.ticketprint[j]['tpNumber'] = userId+'.'+tno;      
                this.ticketprint[j]['quantity'] = 1;
                this.ticketprint[j]['rate'] = attrDetails['amount'];
                this.ticketprint[j]['actualrate'] = attrDetails['amount'];
                this.ticketprint[j]['date'] = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
                this.ticketprint[j]['dbdate'] = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
                this.ticketprint[j]['time'] = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()  ;
                this.ticketprint[j]['usrid'] = userId;
                this.ticketprint[j]['gno'] = gno;   
                this.ticketprint[j]['tpNumbernew'] = this.ticketprint[j]['prefix']+'.'+tno+';'+this.ticketprint[j]['date']+';'+this.ticketprint[j]['content']+';'+this.ticketprint[j]['rate'];                                       
                this.ticketprint[j]['paymode'] = this.paymode;
                this.ticketprint[j]['deviceToken'] = localStorage.getItem('deviceid' + this.config.doDecrypt(localStorage.getItem('userId')));
                this.cgsts[j] = attrDetails['cgsts'];
                this.cgstAmount[j] = attrDetails['cgstAmount'];
                this.cgstTotAmount[j] = attrDetails['cgstTotAmount'];
                this.sgsts[j] = attrDetails['sgsts'];
                this.sgstAmount[j] = attrDetails['sgstAmount'];
                this.sgstTotAmount[j] = attrDetails['sgstTotAmount'];
                
                j++;
                tno++;
              }
          });

           this.action = this.dialogService.open(ConfirmComponent)
      .onClose.subscribe((status) => { 
        if (status==this.config.OTYES) { 
                var DocumentContainer = document.getElementById('print-content');
                var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
                var strHtml = "<html>\n<head>\n <link rel=\"stylesheet\" type=\"text/css\" href=\"test.css\">\n</head><body><div style=\"testStyle\">\n"
                + DocumentContainer.innerHTML + "\n</div>\n</body>\n</html>";
               // this.printing.setPrintStyles(false);
                  WindowObject.document.writeln(strHtml);
                  if (this.config.getOS()!=this.config.osAndroid)
                    WindowObject.document.close();
                  WindowObject.focus();
                  this.config.calldelay();
                  WindowObject.print();
                  this.config.calldelay();
                  if (this.config.getOS()!=this.config.osAndroid)
                    WindowObject.close();             
                 this.ticketDetails = JSON.parse(localStorage.getItem('ticketDetails'));
                 let ind = 0;
                 let gstData = '';
                  this.ticketprint.forEach(data => { 
                    gstData = '';
                    this.cgsts[ind].forEach(taxdata => {
                      if (this.cgstAmount[ind][taxdata]>0) {                        
                        gstData = gstData+'CGST @ '+taxdata+'% on '+this.cgstTotAmount[ind][taxdata]+' : '+this.cgstAmount[ind][taxdata]+' <br/>';
                      }
                    });
                    if (gstData!='') {
                      let pos = gstData.lastIndexOf(' <br/>');
                      gstData = gstData.substring(0,pos);                       
                    }
                    data['cgstData'] = gstData;
                    gstData = '';
                    this.sgsts[ind].forEach(taxdata => {
                      if (this.sgstAmount[ind][taxdata]>0) {                        
                        gstData = gstData+'SGST @ '+taxdata+'% on '+this.sgstTotAmount[ind][taxdata]+' : '+this.sgstAmount[ind][taxdata]+' <br/>';
                      }
                    });
                    if (gstData!='') {
                      let pos = gstData.lastIndexOf(' <br/>');
                      gstData = gstData.substring(0,pos);                       
                    }
                    data['sgstData'] = gstData;
                    this.ticketDetails.push(data);
                    ind++; 
                  });
                   console.log(this.ticketDetails);
                 let json = JSON.stringify(this.ticketDetails);
                 localStorage.setItem('ticketDetails',json);
                tno = tno-1;
                localStorage.setItem(this.username+'-ticketNumber',tno+'');
                var ldate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
                  if (localStorage.getItem('repData-'+ldate) === null) {
                    localStorage.setItem('repData-'+ldate,localStorage.getItem('repData'));
                  }
                  let jsonData = JSON.parse(localStorage.getItem('repData-'+ldate));
                  var result = [];
                var keys = Object.keys(jsonData.data);
                keys.forEach(function(key){
                    result.push(jsonData.data[key]);
                });
                this.ticketprint.forEach(data => { 
                    data.classdata.forEach(classData => {
                      let amount:number = parseInt(classData.classQuantity)*parseInt(classData.classRate);
                      jsonData.totticket = parseInt(jsonData.totticket)+parseInt(classData.classQuantity);
                      jsonData.total = parseInt(jsonData.total)+amount;
                      if (data.paymode==this.config.UPI)
                        jsonData.upi = parseInt(jsonData.upi)+amount;
                      else if (data.paymode==this.config.CASH)
                        jsonData.cash = parseInt(jsonData.cash)+amount;
                      else if (data.paymode==this.config.POS)
                        jsonData.pos = parseInt(jsonData.pos)+amount;
                     
                      let i = 0;
                      result.forEach(indata => {
                        if (indata.classid==classData.classId){
                          jsonData.data[i].classunit = parseInt(jsonData.data[i].classunit)+parseInt(classData.classQuantity);
                          jsonData.data[i].classamount = parseInt(jsonData.data[i].classamount)+amount;
                        } 
                        i++; 
                      });
                    });
                  });
                  localStorage.setItem('repData-'+ldate,JSON.stringify(jsonData));
                 


                this.paymode = 1;
                this.mode = 0;
                this.modetxt = 'C';
                if (this.isConnected) {
                  this.http.post(this.config.apiUrl+'v1/ticketing/data/sync',{
                  'data' : json,  
                  'isoffline' : this.config.OTNO, 
                  'user':localStorage.getItem('username'),
                  'deviceid' : localStorage.getItem('deviceid' + this.config.doDecrypt(localStorage.getItem('userId'))),
                    }).subscribe( (response) => {
                      this.ticketDetails = [];
                      let json = JSON.stringify(this.ticketDetails);
                      localStorage.setItem('ticketDetails',json);
                      this.config.checkStatus(response['Status'],response['version']);
                      var tickets=response['Ticket number'];    
                      if (response['Status']==this.config.OTNO) { 
                        this.config.invalid = this.config.OTYES;
                          this.router.navigateByUrl('/pages/logout');
                          this.config.showErrorToaster(response['Feedback']);
                        }
                      else
                        this.config.showSuccessToaster(response['Feedback']);
                  },
                  (error)=>{
                    this.config.showErrorToaster(error);            
                  }
                  );            
                }  
                else {
                  this.config.showSuccessToaster('Offline Ticket Added');
                } 
              this.clearData();
            
            this.action.unsubscribe();            
          } 
          this.printStatus = this.config.OTNO;
          });
    }
    // else {
    //   this.errorResponseArray['rec'] = 'Received Amount Required';
    // }
      
 }
    
    async modify(index,classno){        
      this.viewaction = this.dialogService.open(TicketmodComponent,{context:{'detail':this.tickets[index],'ticketData':this.ticketData [classno],'totalAmount':this.totalAmount}}).onClose.subscribe(() => {
       this.config.pageload(false,true);
        this.viewaction.unsubscribe();
        this.calculate();
      });      

  }

  updateMode() {
    this.mode = this.mode+1;
      let pmode = this.config.OTNO;
      let uptoPosMode = this.config.OTYES;        
      if (typeof this.config.paymode!==undefined && this.config.paymode!==undefined && this.config.paymode!=='undefined') {
        pmode = parseInt(this.config.paymode);
        uptoPosMode = parseInt(this.config.UPTO_POS);
      }
      if (typeof localStorage.getItem('paymode')!==undefined && localStorage.getItem('paymode')!==undefined && localStorage.getItem('paymode')!=='undefined') {
        if (!isNaN(parseInt(localStorage.getItem('paymode'))))
          pmode = parseInt(localStorage.getItem('paymode'));
      }     
      if (pmode==uptoPosMode) {
        if (this.mode%3==KEY_CODE.CASH) {
          this.modetxt = 'C';
          this.paymode = 1;
        }
        else if (this.mode%3==KEY_CODE.UPI) {
          this.modetxt = 'U';
          this.paymode = 2;
        }
        else {
          this.modetxt = 'P';
          this.paymode = 3;
        }         
      }
      else {
        if (this.mode%2==KEY_CODE.CASH) {
          this.modetxt = 'C';
          this.paymode = 1;
        }
        else if (this.mode%2==KEY_CODE.UPI) {
          this.modetxt = 'U';
          this.paymode = 2;
        }
      }   
  }
  cashbal() {
    this.showPrintBtn = true;
    this.viewaction = this.dialogService.open(CashComponent,{context:{'rec':this.rec,'totalAmount':this.totalAmount,'balance':this.balance,'balanceCheck':this.balanceCheck,'showPrintBtn':this.showPrintBtn}}).onClose.subscribe(() => {
       this.config.pageload(false,true);
        this.viewaction.unsubscribe();
      });    
  }
  resetForm() {
    this.viewaction = this.dialogService.open(ConfirmComponent)
      .onClose.subscribe((status) => { 
        if (status==this.config.OTYES) { 
          this.clearData();
          }
          this.viewaction.unsubscribe();  
        });
  }
  clearData () {
         this.tickets = [];
            this.ticketprint = [];
            this.rate = 0;
            this.itemqty = 0;
            this.totalQuantity = 0;
            this.totalRate = 0;
            this.totalAmount = 0;
            this.balance = 0;
            this.rec = 0;
            this.quantity = 0;
            this.showSummary = false;
            this.config.attraction.forEach(element => {
            element.classes.forEach(classdata => {            
                this.ticketData [classdata.classno]['noticket'] =  0;
              });
            });
  }

}
