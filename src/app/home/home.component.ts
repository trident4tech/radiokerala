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
      let userId = this.config.doDecrypt(localStorage.getItem('userId'));
      if (this.role == localStorage.getItem('counterstaffRole'))
        if (window.innerWidth < 415)
          this.router.navigateByUrl('/pages/mob');
        else
          this.router.navigateByUrl('/pages/newbooking');
      else
        this.router.navigateByUrl('/dashboard');
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

      var formData: any = new FormData();
      formData.append('username', userName.value);
      formData.append('password', password.value);
      formData.append('API_KEY', this.config.apiKey);
      formData.append('service', "login");
      this.http.post(this.config.apiUrl, formData)
        .subscribe((response) => {
          if (response['status'] == this.config.OTYES) {
            localStorage.setItem('userId', response['data'].userid);
            localStorage.setItem('userid', response['data'].userid);
            localStorage.setItem('uname', response['data'].uname);
            localStorage.setItem('roleId', response['data'].roleid);
            this.config.showSuccessToaster(response['feedback'])
            this.router.navigateByUrl('/pages/newsurvey');
            this.config.doSync();
            this.getSettings();
          } else {
            this.config.showErrorToaster(response['feedback'])
          }

        },
          (error) => {
            this.config.showErrorToaster('Network Error occured..');
          }
        );

    }
    else {
      console.log(this.errorResponseArray);
      this.config.showErrorToaster(this.config.validationError);
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
