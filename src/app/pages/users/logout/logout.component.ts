import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public http: HttpClient, public config: ConfigService, private router: Router) { 
 
    
    
  }

  ngOnInit(): void {
     //console.log(localStorage.getItem('userId'));
     this.config.logoutUser();
 

  }
  
  async changeCounterStatus(counter, status) {

    this.http.post(this.config.apiUrl + 'v1/ticketing/changecounterstatus', {
      id: this.config.doDecrypt(localStorage.getItem('userId')),
      counter: counter,
      status: status,
    })
      .subscribe(
        (response) => {
          
          var successResponseArray = [];
          successResponseArray.push(response);
          if (successResponseArray[0]['Status'] == this.config.OTYES) {
            this.config.showSuccessToaster(successResponseArray[0]['Feedback']);
             localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    localStorage.removeItem('menu');
    localStorage.removeItem('username');
    localStorage.removeItem('setUser');
    localStorage.removeItem('roleId');
    this.router.navigateByUrl('/home');
          }
          else {
            console.log(successResponseArray[0]['Feedback']);
          }
        },
        (error) => { console.log(error) });
  }

}
