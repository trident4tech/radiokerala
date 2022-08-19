import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { map,startWith } from 'rxjs/operators';
import { Subject, of,Subscription, Observable,Observer, fromEvent, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from './pages/delete/delete.component';
import { NbDialogService } from '@nebular/theme';
import { HostListener } from '@angular/core';
import { ConfirmComponent } from './pages/tickets/confirm/confirm.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public fileurl  ='storage/files/';
  /**JIIMS Survey 23-July-2022 */
  public district: {} = [{ "key": 1, 'value': 'Kasaragod' }];
  public gpArray: {} = [{ "key": 1, 'value': 'Mavungal' }];
  public assamblyArray: {} = [{ "key": 1, 'value': 'Uduma' }];
  public schemeCat: {} = [{ "key": 1, 'value': 'GP' }, { "key": 2, 'value': 'BP' }, { "key": 3, 'value': 'DP' }, { "key": 4, 'value': 'MLA fund' }, { "key": 5, 'value': 'Department' }, { "key": 6, 'value': 'Jalanidhi' }, { "key": 7, 'value': 'Others' }];
  public wadrArray: {} = [{ "key": 1, 'value': '1' }, { "key": 2, 'value': '2' }];
  public waaArray: {} = [{ "key": 1, 'value': 'OW' }, { "key": 2, 'value': 'BW' }, { "key": 3, 'value': 'River' }, { "key": 4, 'value': 'Spring' }, { "key": 5, 'value': 'Bulkwater' }, { "key": 6, 'value': 'Gravity' }];
  public waterAvalabilityArray: {} = [{ "key": 1, 'value': 'Adequate' }, { "key": 2, 'value': 'inadequate' }, { "key": 3, 'value': 'seasonal' }, { "key": 4, 'value': 'No water' }];
  public waterQualityIssue: {} = [{ "key": 1, 'value': 'No issues' }, { "key": 2, 'value': 'Turbidity' }, { "key": 3, 'value': 'Iron' }, { "key": 4, 'value': 'salty' }, { "key": 5, 'value': 'others' }];
  public pumpHouseArray: {} = [{ "key": 1, 'value': 'Good' }, { "key": 2, 'value': 'Need replacement' }, { "key": 3, 'value': 'Need repair' }, { "key": 4, 'value': 'NA' }];
  public pumpSetArray: {} = [{ "key": 1, 'value': 'Working' }, { "key": 2, 'value': 'Need replacememt' }, { "key": 3, 'value': 'Need repair' }, { "key": 4, 'value': 'NA' }];
  public ksebCon: {} = [{ "key": 1, 'value': 'Disconnected' }, { "key": 2, 'value': 'Connection exists' }, { "key": 3, 'value': 'NA' }];
  public panalBoardArray: {} = [{ "key": 1, 'value': 'Good' }, { "key": 2, 'value': 'Need replacememt' }, { "key": 3, 'value': 'Need repair' }, { "key": 4, 'value': 'NA' }];
  public pumpingMain: {} = [{ "key": 1, 'value': 'Good' }, { "key": 2, 'value': 'Need replacememt' }, { "key": 3, 'value': 'Need repair' }, { "key": 4, 'value': 'NA' }];
  public distributionSystem: {} = [{ "key": 1, 'value': 'Functional' }, { "key": 2, 'value': 'Partially functioning' }, { "key": 3, 'value': 'Non-functional' }];
  public typOfStorageCapacity: {} = [{ "key": 1, 'value': 'OHSR' }, { "key": 2, 'value': 'GLSR' }];
  public storageTank: {} = [{ "key": 1, 'value': 'Good' }, { "key": 2, 'value': 'Need replacement' }, { "key": 3, 'value': 'Need repair' }];
  public disInfectionUnit: {} = [{ "key": 1, 'value': 'Good' }, { "key": 2, 'value': 'Need replacement' }, { "key": 3, 'value': 'Need repair' }, { "key": 4, 'value': 'Not available' }];
  public waterMeterArray: {} = [{ "key": 1, 'value': 'Functional' }, { "key": 2, 'value': 'Non-functional' }, { "key": 3, 'value': 'No water meter' }];
  public yesNoArray: {} = [{ "key": 1, 'value': 'No' }, { "key": 2, 'value': 'Yes' }];
  public rejReasonArray: {} = [{ "key": 1, 'value': 'HHs covered under JJM or other source' }, { "key": 2, 'value': 'lack of GP fund' }, { "key": 3, 'value': 'BG satisfied with existing scheme' }, { "key": 4, 'value': 'Assets fully damaged' }];
  public schemSizeArray: {} = [{ "key": 1, 'value': 'Small' }, { "key": 2, 'value': 'Large' }, { "key": 3, 'value': 'Large' }, { "key": 4, 'value': 'Multi GP' }];
  public schemFunctionalityArray: {} = [{ "key": 1, 'value': 'Functional' }, { "key": 2, 'value': 'Partially Functional' }, { "key": 3, 'value': 'Not functional' }];
  public apiKey = 'JIIMS_API_KEY_@1313079632147*/-+';



























  title = 'EncryptionDecryptionSample';
  public redirectUrl: string = null;
  plainText: string;
  public invalid: number = 1;
  encryptText: string;
  encPassword: string = '4578u!tyP89@34$';
  decPassword: string = '4578u!tyP89@34$';
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;
  public itemsPerPage: number = 25;//pagination    
  public apiUrl = "https://api.demo.ticketbuddy.in/";
  //public apiUrl="https://api.dtpcticket.sandboxoriginal.owrench.com/";
  public roleIdFromRequest: any;
  public tokenFromRequest: any;
  public userIdFromRequest: any;
  public successResponseArray: any[] = [];
  public OTYES: number = 2;
  public OTNO: number = 1;
  public CASH: number = 1;
  public UPI: number = 2;
  public POS: number = 3;
  public counterStaffId: number = 18;
  public counterRoleId: number = 5;
  public validationError: string = "Sorry, the action has been failed. Please try again!";
  public delstatus: number;
  public confstatus: number;
  public action: any;
  public attraction: any[] = [];
  public isCounterStaff: boolean = false;
  public menu: string = '';
  //public logourl  ='https://dtpc-ticket-pwa.web.app/assets/images/logo.png';
  //public canaralogourl  ='https://dtpc-ticket-pwa.web.app/assets/images/canara_logo.png';
  //public qrcodeurl  ='https://dtpc-ticket-pwa.web.app/assets/images/qrcode.png';
  public logourl_local = '/assets/images/logo.png';
  public canaralogourl_local = '/assets/images/canara_logo.png';
  public qrcodeurl_local = '/assets/images/qrcode.png';
  quantity: number;
  public maxcount: number = 0;
  public currentpageno: number = 1;
  public paging: any[] = [];
  public lastpage: string = '';
  public firstpage: string = '';
  public pageurl: string = '';
  public gotopage: string = '';
  postdata: any = [];
  public itemdata: any[] = [];
  public targeturl: string = '';
  public totalitems: number = 0;
  public fromitem: number = 0;
  public toitem: number = 0;
  public logourl = "";
  public qrcodeurl = "";
  public canaralogourl = "";
  public hostname: string = '';
  public ticketTitle: string = '';
  public appTitle: string = '';
  public logo: string = '';
  public terms: string = '';
  public monthzoho: string = '';
  public salezoho: string = '';
  public miszoho: string = '';
  public dailyzoho: string = '';
  public printfolio: number = 1;
  public accountUrl: string = '';
  public acluserid: any;
  public aclusername: any;
  public aclroleid: any;
  public dailyincome: string = '';
  public CASHMODE: number = 1;
  public UPIMODE: number = 2;
  public POSMODE: number = 3;
  public ONLINEMODE: number = 4;
  public users: any[] = [];
  public paymode: string = '';
  public UPTO_UPI: string = '2';
  public UPTO_POS: string = '3';
  public version: string = '';
  public osWindows: number = 1;
  public osLinux: number = 2;
  public osAndroid: number = 3;
  public mapLat: any = "12.4996";
  public mapLng: any = "74.9869";
  public map: number=1;
  isConnected :boolean;


  constructor(public domSanitizer: DomSanitizer, public dialogService: NbDialogService,
    private router: Router, private toastr: ToastrService, public http: HttpClient) {
    this.hostname = window.location.hostname;
    this.paymode = this.UPTO_UPI;
    if (this.hostname == 'localhost') {
      this.apiUrl = "https://api.sandbox.ticketbuddy.in/";
    }
    else {
      this.apiUrl = "https://api." + this.hostname + "/";
    }
    //this.apiUrl = "https://api.sandbox.survey.radiokeralam.com/";
    this.apiUrl = "https://api.sandbox.ticketbuddy.in/";
    this.fileurl = this.apiUrl+this.fileurl;
    this.isConnected = true;  
    this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
    
   // this.apiUrl = "https://jims.sandbox.webapiservices.in/api/";


    let host = this.hostname.replace('ticketbuddy.in', "");
    document.title = 'Kerala Radio';//host[0].toUpperCase() + host.substr(1).toLowerCase();
    if (this.isConnected)
      this.getSettingsData();
  }
  //method is used to encrypt and decrypt the text  
  doEncrypt(ctext) {
    this.plainText = ctext;
    this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText, this.encPassword).toString();
    return this.conversionEncryptOutput;
  }
  doDecrypt(enctext) {
    this.encryptText = enctext;
    this.conversionDecryptOutput = '';
    if (enctext != null && enctext != 'null')
      this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText, this.decPassword).toString(CryptoJS.enc.Utf8);
    return this.conversionDecryptOutput;
  }
  showSuccessToaster(message) {
    this.toastr.success(message, 'Success', {
      enableHtml: true,
      timeOut: 6000
    });
  }
  showErrorToaster(message) {
    this.toastr.error(message, 'Failed', {
      enableHtml: true,
      timeOut: 6000
    });
  }
  showWarningToaster(message) {
    this.toastr.warning(message, 'Warning', {
      enableHtml: true,
      timeOut: 6000
    });
  }
  showInfoToaster(message) {
    this.toastr.info(message, 'Warning', {
      enableHtml: true,
      timeOut: 6000
    });
  }
  getSettingsData() {
    this.successResponseArray = [];
    this.http.get(this.apiUrl + 'v1/getsettings')
      .subscribe(
        (response) => {
          this.successResponseArray.push(response);
          if (this.successResponseArray[0]['Status'] == this.OTYES) {
            //this.appTitle = response['data']['APPTITLE'];
            //this.logourl = response['data']['TICKETLOGO'];
            //document.title = response['data']['TICKETTITLE'];
            //this.ticketTitle = response['data']['TICKETTITLE'];
            //localStorage.setItem('counterstaffRole', response['data']['COUNTER_ROLE'])
            //this.counterStaffId = response['data']['COUNTER_UGRP']
            //this.logo = response['data']['LOGO'];
            /*this.terms = response['data']['TERMS'];
            this.dailyzoho = response['data']['DAILY_ZOHO'];
            this.miszoho = response['data']['MIS_ZOHO'];
            this.salezoho = response['data']['SALE_ZOHO'];
            this.monthzoho = response['data']['MONTH_ZOHO'];
            this.accountUrl = response['data']['ACCOUNTS_URL'];
            this.dailyincome = response['data']['DAILY_INCOME'];
            this.printfolio = parseInt(response['data']['PRINT_FOLIO']);
            localStorage.setItem('printfolio', response['data']['PRINT_FOLIO']);
            this.paymode = response['data']['PAYMODE'];
            */
            this.version = response['data']['VERSION'];
            //let jsondata = JSON.stringify(this.terms.split(';'));
            //localStorage.setItem('terms', jsondata);
            // var link = <HTMLLinkElement>document.querySelector("link[rel~='icon']");
            // link.href = this.logo;
            // localStorage.setItem('appTitle', this.appTitle);
          }
          else {
            //                      //console.log(this.successResponseArray[0]['Feedback']);
            //this.showWarningToaster('Error');
          }
        },
        (error) => {
          console.log(error);
          ///this.showErrorToaster('The action has been failed.');
        }
      );
  }
  sendtoapi(url, data, successmsg, errormsg, method) {
    this.successResponseArray = [];
    switch (method) {
      case 'post':
        this.http.post(this.apiUrl + url, data)
          .subscribe(
            (response) => {
              this.successResponseArray.push(response);
              if (this.successResponseArray[0]['Status'] == this.OTYES) {
                if (successmsg != '') {
                  this.showSuccessToaster(successmsg);
                }

              }
              else {
                //                      //console.log(this.successResponseArray[0]['Feedback']);
                this.showWarningToaster(errormsg);
              }
            },
            (error) => {
              console.log(error);
              this.showErrorToaster('The action has been failed.');
            }
          );
        break;
      case 'get':
        this.http.post(this.apiUrl + url, data)
          .subscribe(
            (response) => {
              this.successResponseArray.push(response);
              if (this.successResponseArray[0]['Status'] == this.OTYES) {
                if (successmsg != '') {
                  this.showSuccessToaster(successmsg);
                }
              }
              else {
                //console.log(this.successResponseArray[0]['Feedback']);
                this.showWarningToaster(errormsg);
              }
              return this.successResponseArray[0]['Status'];
            },
            (error) => {
              console.log(error);
              this.showErrorToaster('The action has been failed.');
            }
          );
        break;
      case 'put':
        this.http.post(this.apiUrl + url, data)
          .subscribe(
            (response) => {
              this.successResponseArray.push(response);
              if (this.successResponseArray[0]['Status'] == this.OTYES) {
                if (successmsg != '') {
                  this.showSuccessToaster(successmsg);
                }
              }
              else {
                //console.log(this.successResponseArray[0]['Feedback']);
                this.showWarningToaster(errormsg);
              }
            },
            (error) => {
              console.log(error);
              this.showErrorToaster('The action has been failed.');
            }
          );
        break;
    }
  }


   async checkStatus(status,version) {
    if (version) {
      localStorage.setItem('lver',version);
      if (version!=localStorage.getItem('cver') || localStorage.getItem('cver')==undefined || localStorage.getItem('cver')===null) 
        this.updateLatest();
    }
    if (status==this.OTNO) {
       this.router.navigateByUrl('/pages/miscellaneous/404');
    }
  }

  delay(milliseconds: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }


  confirm(segment, url, data) {
    this.delstatus = this.OTNO;
    this.action = this.dialogService.open(DeleteComponent)
      .onClose.subscribe((status) => {
        if (status == this.OTYES) {
          this.http.post(this.apiUrl + url, data).subscribe(
            (response) => {
              this.checkStatus(response['Status'], response['version']);
              this.showSuccessToaster(segment + ' has been deleted');
              this.delay(100);
            },
            (error) => {
              this.showErrorToaster('Sorry! ' + segment + ' deletion has been failed. Please try again.');
            }
          );
        }
        this.pageload(true);
        this.action.unsubscribe();
      });
  }
  numericonKeyPress(event: any) {
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }
  numericalphaonKeyPress(event: any) {
    const regexpNumber = /[0-9\+\a-z\+\A-Z\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

  confirmstatus(segment, url, data, title = 'Are you sure. You want to proceed?', newstatus = 0, successmsg = '', list = true) {
    this.confstatus = this.OTNO;
    this.action = this.dialogService.open(ConfirmComponent, { context: { title } })
      .onClose.subscribe((status) => {
        if (status == this.OTYES) {
          this.http.post(this.apiUrl + url, data).subscribe(
            (response) => {
              this.checkStatus(response['Status'], response['version']);
              if (newstatus == this.OTYES)
                this.showSuccessToaster(segment + ' has been enabled');
              else if (newstatus == this.OTNO)
                this.showSuccessToaster(segment + ' has been disabled');
              else
                this.showSuccessToaster(successmsg);
              this.delay(600000);
            },
            (error) => {
              this.showErrorToaster('Sorry! action has been failed. Please try again.');
            }
          );
        }
        if (list)
          this.pageload();
        else
          window.location.reload();
        this.action.unsubscribe();
      });
  }

  generatePaging(data, url) {
    this.pageurl = url;
    this.maxcount = data['last_page'];
    this.currentpageno = data['current_page'];
    this.paging = [];
    this.totalitems = data['total'];
    this.fromitem = data['from'];
    this.toitem = data['to'];
    for (var i = 0; i < this.maxcount; i++) {
      this.paging[i] = [];
      this.paging[i]['url'] = url + '?page=' + (i + 1);
    }
    if (this.currentpageno != this.maxcount) {
      this.lastpage = data['last_page_url'];
    }
    if (this.currentpageno != 1) {
      this.firstpage = data['first_page_url'];
    }
  }
  pageload(deleted = false, add = false) {
    if (deleted && this.currentpageno == this.maxcount && this.fromitem == (this.toitem - 1)) {
      this.targeturl = this.pageurl + '?page=1';
    }
    this.http.post(this.targeturl, this.postdata)
      .subscribe(
        (response) => {
          this.successResponseArray = [];
          this.successResponseArray.push(response);
          this.itemdata = response['Data']['data'];
          if (add || deleted) {
            this.generatePaging(response['Data'], this.pageurl);
          }
        },
        (error) => { });
  }
  goPageno(pageno, url) {
    this.targeturl = url + '?page=' + pageno;

    this.currentpageno = pageno;
    this.http.post(this.targeturl, this.postdata)
      .subscribe(
        (response) => {
          this.successResponseArray = [];
          this.successResponseArray.push(response);
          this.itemdata = response['Data']['data'];
        },
        (error) => { });
  }

  checkAccess(menuItem) {
    let user = localStorage.getItem('userId');
    let menu = JSON.parse(localStorage.getItem('myMenu'));
    if (menu.includes(menuItem) == false) {
      return false;
    } else {
      return true;
    }
  }



  filterData(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
  loadMenu() {
    this.http.post(this.apiUrl + 'v1/getMenu', {
      'roleid': this.doDecrypt(localStorage.getItem('roleId')),
      'userid': this.doDecrypt(localStorage.getItem('userId'))
    })
      .subscribe(
        (response) => {
          var successResponseArray = [];
          successResponseArray.push(response);
          if (successResponseArray[0]['Status'] == this.OTYES) {
            let user = this.doDecrypt(localStorage.getItem('userId'));
            let json = JSON.stringify(response['menuData']);
            localStorage.setItem(user + '-menu', json);
            this.menu = json;
            json = JSON.stringify(response['menuUrls']);
            localStorage.setItem(user + '-menuurls', json);


          }
          else {
            console.log(successResponseArray[0]['Feedback']);
          }
        },
        (error) => { console.log(error) });


  }
  checkAccesswith404(url) {

    let user = localStorage.getItem('userId');
    let menu = JSON.parse(localStorage.getItem('myMenu'));
    if (menu == null)
      this.router.navigate(['/pages/logout']);
    if (menu.includes(  url ) == false) {
      this.router.navigate(['/pages/access']);
    } else {
      return true;
    }



    
  }
  async setReport() {
    var date = new Date();
    var ldate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();


    var tdate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    this.http.post(this.apiUrl + 'v1/summary/UPjBZmJPf3QOeNfYw9NhJysivIydIV8vFGO311nPLedVym4dM4ExQcw3F2ZoyI3o', {
      user: this.doDecrypt(localStorage.getItem('userId')),
      date: tdate,
      dest: localStorage.getItem('destId')
    })
      .subscribe(
        (response) => {
          let usr = localStorage.getItem('user');
          localStorage.setItem('repData-' + ldate, localStorage.getItem('repData'));

          let jsonData = JSON.parse(localStorage.getItem('repData-' + ldate));

          var result = [];
          var keys = Object.keys(jsonData.data);
          keys.forEach(function (key) {
            result.push(jsonData.data[key]);
          });
          jsonData.totticket = response['No.of Tickets'][0];
          jsonData.total = response['Total Amount'][0];
          jsonData.cantotal = response['Total Amount Cancel'][0];
          jsonData.upi = response['upi'][0];
          jsonData.pos = response['pos'][0];
          jsonData.cash = response['cash'][0];
          jsonData.canticket = response['No.of Tickets Cancel'][0];
          let i = 0;
          result.forEach(indata => {
            if (response['Total Amount'][0] > 0) {
              response['data'][0].forEach(element => {
                if (indata.classid == element.classid) {
                  jsonData.data[i].classunit = element.no;
                  jsonData.data[i].classamount = element.amount;
                }
              });
            }
            if (response['Total Amount Cancel'][0] > 0) {
              response['canceldata'][0].forEach(element => {
                if (indata.classid == element.classid) {
                  jsonData.candata[i].classunit = element.no;
                  jsonData.candata[i].classamount = element.amount;
                }
              });
            }
            i++;
          });
          localStorage.setItem('repData-' + ldate, JSON.stringify(jsonData));
        },
        (error) => {
          console.log(error);
        }
      );
  }
  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  updateLatest() {
       let json = localStorage.getItem('ticketDetails');//JSON.stringify(this.ticketDetails);
            let verjson = localStorage.getItem('verifiedTicketDetails');
            let usr = this.doDecrypt(localStorage.getItem('userId'));
            if (!this.IsJsonString(json) ) {
                json = "";
            }
            if (!this.IsJsonString(verjson) ) {
              verjson = "";
          }
          if (usr!='') {
          this.http.post(this.apiUrl+'v1/ticketing/data/localsync',{
            'data' : json,  
            'verdata': verjson,
            'user': usr,
              }).subscribe( (response) => {
                console.log('Updated');                
                this.http.post(this.apiUrl + 'v1/user/logout', {
    userid: this.doDecrypt(localStorage.getItem('userId')),
  })
    .subscribe(
      (response) => {
         localStorage.removeItem('user');
        localStorage.removeItem('userId');
          localStorage.removeItem('userData');
          localStorage.removeItem('menu');
          localStorage.removeItem('username');
          localStorage.removeItem('setUser');
          localStorage.removeItem('roleId');
           var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
        var date = new Date();
        var ldate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
       
        while ( i-- ) {
         if (keys[i].indexOf('repData-')>=0 && keys[i].indexOf(ldate)<0)
           localStorage.removeItem(keys[i]);
        }
         window.location.reload();
         this.router.navigateByUrl('/home');
      });
               
             });
            }
            
    }
  async logoutUser() {
    this.http.post(this.apiUrl + 'v1/user/logout', {
      userid: this.doDecrypt(localStorage.getItem('userId')),
    })
      .subscribe(
        (response) => {
          // if (localStorage.getItem('counter'))
          //   this.changeCounterStatus(localStorage.getItem('counter'), this.config.OTNO);
          // else {
          localStorage.removeItem('userId');
          localStorage.removeItem('userData');
          localStorage.removeItem('menu');
          localStorage.removeItem('username');
          localStorage.removeItem('setUser');
          localStorage.removeItem('roleId');
          // }


          var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
          var date = new Date();
          var ldate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

          while (i--) {
            if (keys[i].indexOf('repData-') >= 0 && keys[i].indexOf(ldate) < 0)
              localStorage.removeItem(keys[i]);
          }

        });
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/home');
  }
  getOS() {
    var platform = window.navigator.platform;
    // var platform = window.navigator?.userAgent?.platform ?? window.navigator.platform,
    //   macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    let windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    //   iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    let os = null;

    // if (macosPlatforms.indexOf(platform) !== -1) {
    //   os = 'Mac OS';
    // } else if (iosPlatforms.indexOf(platform) !== -1) {
    //   os = 'iOS';
    // } else if (windowsPlatforms.indexOf(platform) !== -1) {
    //   os = 'Windows';
    // } else if (/Android/.test(userAgent)) {
    //   os = 'Android';
    // } else if (!os && /Linux/.test(platform)) {
    //   os = 'Linux';
    // }
    if (windowsPlatforms.indexOf(platform) !== -1)
      os = this.osWindows;
    else if (!os && /Linux/.test(platform)) {
      os = this.osLinux;
    }
    else if (/Android/.test(platform)) {
      os = this.osAndroid;
    }

    return os;
  }
  async calldelay() {
    await this.delay(60000000);
  }


  generateuniqueKey() {
    let count = 0;
    if (localStorage.getItem('surveyCountOnsingleLogin') == undefined || localStorage.getItem('surveyCountOnsingleLogin') == '' || localStorage.getItem('surveyCountOnsingleLogin') == null) {
      localStorage.setItem('surveyCountOnsingleLogin', '' + 1);
      count = 1;
    } else {
      count = parseInt(localStorage.getItem('surveyCountOnsingleLogin'));
    }
    count++;
    let curTimeStatm = new Date().getTime()
    let txt = this.doEncrypt(localStorage.getItem('userId') + curTimeStatm) + Math.random() + count;
    localStorage.setItem('surveyCountOnsingleLogin', '' + count);
    return txt;
  }

  base64toBlob(file) {
    let binaryString = window.atob(file);
    let binaryLength = binaryString.length;
    let bytesa = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
        let ascii = binaryString.charCodeAt(i);
        bytesa[i] = ascii;
    }
    const blob = new Blob([bytesa]);
    return blob;  
  }
  public doSync() {
    const formData = new FormData();
    let binaryString;
    let binaryLength;
    let bytesa;
    let ascii
    let blob;
    let ticketDetails = JSON.parse(localStorage.getItem('ticketDetails'));
        let json = localStorage.getItem('ticketDetails');//JSON.stringify(this.ticketDetails);
        if (ticketDetails.length>0) {
          let i = 0;
          ticketDetails.forEach(function (val) {
            binaryString = window.atob(val.file);
            binaryLength = binaryString.length;
            bytesa = new Uint8Array(binaryLength);

            for (let j = 0; j < binaryLength; j++) {
                ascii = binaryString.charCodeAt(j);
                bytesa[j] = ascii;
            }
            blob = new Blob([bytesa]);

            formData.append("name["+i+"]", val.name);
            formData.append("mob["+i+"]", val.mob);
            formData.append("type["+i+"]", val.type);
            formData.append("quality["+i+"]", val.quality);
            formData.append("lat["+i+"]", val.lat);
            formData.append("lng["+i+"]", val.lng);
            formData.append("feedback["+i+"]", val.feedback);
            formData.append("acc["+i+"]", val.acc);
            formData.append("usr["+i+"]", val.usr);
            formData.append("file["+i+"]", blob); 
            formData.append("offline["+i+"]", val.offline);
            formData.append("dbdate["+i+"]" , val.dbdate);
            formData.append("date["+i+"]" , val.date);
            formData.append("time["+i+"]" ,val.time);
            i++;
          });
            
           this.http.post(this.apiUrl+'v1/survey/add',formData)
          .subscribe(
            (response) => {
             this.checkStatus(response['Status'],response['version']);
             ticketDetails = [];
              let json = JSON.stringify(ticketDetails);
              localStorage.setItem('ticketDetails',json); 
              this.showSuccessToaster('The survey has been successfuly added ');           
            },
            (error)=>{
              console.log(error);
              this.showErrorToaster('The survey insertion has been failed');
            }
          );   
        }       
      }

  doSyncDraft() {
    let draftStr = localStorage.getItem('offlineSubmited');
    let draftArray = {};
    draftStr = localStorage.getItem('offlineDraft');
    draftArray = {};
    if (draftStr != '' && draftStr != null && draftStr != undefined) {
      draftArray = JSON.parse(localStorage.getItem('offlineDraft'));
      var formData: any = new FormData();
      formData.append('offlineData', JSON.stringify(draftArray));
      formData.append('API_KEY', this.apiKey);
      formData.append('service', "addsurveyDraft");
      this.http.post(this.apiUrl, formData)
        .subscribe((response) => {
          if (response['status'] == this.OTYES) {
            localStorage.removeItem('offlineDraft');
            this.populateDraft();
          }

        },
          (error) => {
            this.populateDraft();
          }
        );
    } else {
      this.populateDraft();
    }
  }

  populateDraft() {
    let draftStr = JSON.parse(localStorage.getItem('draftDeleteStr'));
    let deleteStr = {};
    if (draftStr != '' && draftStr != null && draftStr != undefined) {
      deleteStr = JSON.parse(localStorage.getItem('draftDeleteStr'));
    }

    var formData: any = new FormData();
    formData.append('userid', localStorage.getItem('userId'));
    formData.append('API_KEY', this.apiKey);
    formData.append('deleteArray', JSON.stringify(draftStr));
    formData.append('service', "mydraft");
    this.http.post(this.apiUrl, formData)
      .subscribe((response) => {
        if (response['status'] == this.OTYES) {
          localStorage.setItem('offlineDraft', JSON.stringify(response['data']));
          localStorage.removeItem('draftDeleteStr');
        }
      },
        (error) => {

        }
      );
  }


  districtselected(districtId) {
    let gp = JSON.parse(localStorage.getItem('offlineGp'));
    this.gpArray = gp[districtId];
    let assembly = JSON.parse(localStorage.getItem('offlineAsssembly'));
    this.assamblyArray = assembly[districtId];

  }


  extractdistrict() {
    this.district = JSON.parse(localStorage.getItem('offlineDistrict'));
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
