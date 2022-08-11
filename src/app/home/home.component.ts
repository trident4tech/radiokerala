import { Component, OnInit, Inject } from '@angular/core';
import { ConfigService } from '../config.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbAuthSocialLink } from '@nebular/auth';
import { Observable, of, Observer, fromEvent, merge } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public roleIdFromRequest: any;
  public tokenFromRequest: any;
  public userIdFromRequest: any;
  public successResponseArray: any[] = [];
  public ticketDetails: any[] = [];
  public newToken: string = '';
  public showPrgress: boolean = false;
  public attraction: any[] = [];
  public counter: any[] = [];
  public noError: boolean = true;
  public errorResponseArray: any = [];
  public role;
  public isOnline: boolean = true;

  constructor(protected service: NbAuthService, private router: Router, public config: ConfigService, public http: HttpClient, private storage: LocalStorageService) {
    let val = localStorage.getItem('userId');
    if (val != null && val != 'null') {
      this.getSettings();
      this.config.doSync();
      this.router.navigateByUrl('/newsurvey');
    }
  }

  ngOnInit(): void {
    this.createOnline$().subscribe(isOnline => {
      this.isOnline = isOnline
    });

  }
  login(userName, password) {

    this.config.isCounterStaff = false;
    this.errorResponseArray['uname'] = '';
    this.errorResponseArray['pass'] = '';
    this.noError = true;
    if (userName.value == '' || userName.value === undefined) {
      this.errorResponseArray['uname'] = 'Username Required';
      this.noError = false;
    }
    if (password.value == '' || password.value === undefined) {
      this.errorResponseArray['pass'] = 'Password Required';
      this.noError = false;
    }
    if (this.noError) {
      if (this.isOnline == true) {
        this.http.post(this.config.apiUrl + 'v1/user/login', {
          'usr_user_name': userName.value,
          'password': password.value,
        })
          .subscribe((response) => {
            localStorage.setItem('tname','');
            localStorage.setItem('mob','');
            this.successResponseArray = [];
            this.successResponseArray.push(response);
            this.showPrgress = false;
            let ticketDetails = [];
            localStorage.setItem('cver','');
            localStorage.setItem('lver','');
            let json = JSON.stringify(ticketDetails);
            localStorage.setItem('ticketDetails', json);
            
            if (this.successResponseArray[0]['Status'] == this.config.OTYES) {
              /**Store local storage data for offline login */
              this.config.invalid = this.config.OTNO;
              var username = userName.value;
              let encryptedPassword = this.config.doEncrypt(password.value);
              let userDataForStore = JSON.stringify(response);
              let encryptedUserData = this.config.doEncrypt(userDataForStore);
              localStorage.setItem(username + '-data', encryptedUserData);
              localStorage.setItem(username + '-password', encryptedPassword);
              /**Offline login end */
              localStorage.setItem('users',JSON.stringify(this.successResponseArray[0]['usrData']) );

              this.tokenFromRequest = this.config.doEncrypt(this.successResponseArray[0]['Token']);
              this.userIdFromRequest = this.config.doEncrypt('' + this.successResponseArray[0]['userId']);
              this.roleIdFromRequest = this.config.doEncrypt('' + this.successResponseArray[0]['roleId']);
              localStorage.setItem('roleId', this.roleIdFromRequest);
              localStorage.setItem('role', this.successResponseArray[0]['roleId']);
              localStorage.setItem('token', this.tokenFromRequest);
              localStorage.setItem('userId', this.userIdFromRequest);
              localStorage.setItem('name', this.successResponseArray[0]['name']);
              localStorage.setItem('username', this.successResponseArray[0]['username']);
              localStorage.setItem('user', userName.value);
              localStorage.setItem('deviceid' + this.successResponseArray[0]['userId'], this.successResponseArray[0]['singleloginhash']);
              localStorage.setItem('cver',this.successResponseArray[0]['version']);
              localStorage.setItem('lver',this.successResponseArray[0]['version']);
              
             if (this.successResponseArray[0]['roleId']=='1') {
                this.router.navigateByUrl('/mapreport');
              }
              else
                this.router.navigateByUrl('/newsurvey');
              
            }
            else {
              //this.config.showErrorToaster('Authentication Failed..!');
              this.config.showErrorToaster(this.successResponseArray[0]['Feedback']);

            }
          },
            (error) => {

              var errorData = Object.keys(error['error']).map(key => ({ keyname: key, value: error['error'][key] }));
              this.config.showErrorToaster('Invalid Username or Password');        
            }
          );
      } else {
        this.doOfflineLogin(userName.value, password.value)
      }
    }
    else {
      console.log(this.errorResponseArray);
      this.config.showErrorToaster(this.config.validationError);
    }
  }
  doOfflineLogin(uname, password) { 
    var username = uname;
    let encryptedStoredPassword = localStorage.getItem(username + '-password');
    if (encryptedStoredPassword != null && encryptedStoredPassword != '' && encryptedStoredPassword != undefined) {
      let stroredPassword = this.config.doDecrypt(encryptedStoredPassword);
      if (stroredPassword == password) {
        let encryptedUserData = localStorage.getItem(username + '-data');
        let userData = this.config.doDecrypt(encryptedUserData);
        let userDataObj = JSON.parse(userData);
        this.successResponseArray.push(userDataObj);
        this.tokenFromRequest = this.config.doEncrypt(this.successResponseArray[0]['Token']);
        this.userIdFromRequest = this.config.doEncrypt('' + this.successResponseArray[0]['userId']);
        this.roleIdFromRequest = this.config.doEncrypt('' + this.successResponseArray[0]['roleId']);
        localStorage.setItem('role', this.successResponseArray[0]['roleId']);
        localStorage.setItem('roleId', this.roleIdFromRequest);
        localStorage.setItem('token', this.tokenFromRequest);
        localStorage.setItem('userId', this.userIdFromRequest);
        localStorage.setItem('username', this.successResponseArray[0]['username']);
        localStorage.setItem('user', uname);
        localStorage.setItem('deviceid' + this.successResponseArray[0]['userId'], this.successResponseArray[0]['singleloginhash']);

        if (this.successResponseArray[0]['role']=='1') {
                this.router.navigateByUrl('/mapreport');
        }
        else
          this.router.navigateByUrl('/newsurvey');

      } else {
        this.config.showErrorToaster('Authentication Failed..!');
      }

    } else {
      this.config.showErrorToaster('Authentication Failed..!');
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

  getSettings(){
    var formData: any = new FormData();
      formData.append('userid', localStorage.getItem('userId'));
      formData.append('API_KEY', this.config.apiKey);
      formData.append('service', "settings");
      this.http.post(this.config.apiUrl, formData)
        .subscribe((response) => {
          if (response['status'] == this.config.OTYES) {
            localStorage.setItem('offlineGp' , JSON.stringify( response['gp'] ));
            localStorage.setItem('offlineAsssembly' , JSON.stringify( response['asssembly'] ));
            localStorage.setItem('offlineDistrict' , JSON.stringify( response['district'] ));
            
          } 

        },
          (error) => {
            
          }
        );
    
  }

}
