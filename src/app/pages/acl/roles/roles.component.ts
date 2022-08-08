import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
	public aclArray                   :any[]=[];
	public successResponseArray   : any[]=[];
	public errorResponseArray     : any[]=[];
  
  constructor(private router: Router,
  	public config:ConfigService,
  	public http: HttpClient) { 
      this.config.checkAccesswith404("Access Control");
  }


  ngOnInit(): void {   
    this.loadData(); 
  }
   gotoNextPage (page, pkeyData) {
	localStorage.setItem("roleName" , page);
   	this.router.navigate(['/pages/aclcategories/'+encodeURIComponent(pkeyData)]);
  }


  loadData() {
    var formData: any = new FormData();
    formData.append('API_KEY', this.config.apiKey);
    formData.append('service', "masterlist");
    formData.append('type', "role");
    this.http.post(this.config.apiUrl, formData)
      .subscribe((response) => {
        if (response['status'] == this.config.OTYES) {
          this.successResponseArray.push(response);
          this.aclArray = response['data'];
        } else {

        }

      },
        (error) => {
          this.config.showErrorToaster('Network Error occured..');
        }
      );
  }

}
