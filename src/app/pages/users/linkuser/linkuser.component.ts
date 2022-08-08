import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-linkuser',
  templateUrl: './linkuser.component.html',
  styleUrls: ['./linkuser.component.scss']
})
export class LinkuserComponent implements OnInit {
	  name = 'slideToggle';
	  id = 'materialSlideToggle';
	  checked = false;
	  disabled = false;
	  label = 'Toggle On/Off';
	  labelledby = 'Some Other Text';
	  public counterId : any;
	public responseData   : any[]=[];
	public users   : any[]=[];
	public attractions   : any[]=[];
	public counter : string;
	public destId : number;
	sub;
	 
	  onChange(value: boolean) {
	    /* Your business logic goes here. */
	  }
	  constructor( private router: Router,
    public config:ConfigService,
    public http: HttpClient,
    private activerouter: ActivatedRoute) {
    this.config.checkAccesswith404('linkuser'); 
	  	this.sub=this.activerouter.paramMap.subscribe(params => { 
          this.counterId = params.get('id');
    	  this.loadData();      
  		});	  	 
   }
   ngOnInit(): void {
   }
	ngOnDestroy() {
     this.sub.unsubscribe();
   }
    async loadData () {
  	await this.http.post(this.config.apiUrl+'v1/counter/getdata',{
       'counterId':this.counterId,
        token:this.config.doDecrypt(localStorage.getItem('token')),
       roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
      })
          .subscribe(
            (response) => {this.config.checkStatus(response['Status'],response['version']);
         var responseDetails=[];
		  responseDetails.push(response);
		  if (responseDetails[0]['Status']==this.config.OTYES) {
		        this.attractions = responseDetails[0]['Data']['attrData'];
				this.users = responseDetails[0]['Data']['userData'];
				this.counter =  responseDetails[0]['Data']['counter'];
				this.destId =  responseDetails[0]['Data']['destId'];
        }
        else {
          console.log(responseDetails[0]['Feedback']);
          this.config.showErrorToaster('Loading failed.');
        }            
       },
            (error)=>{
             console.log(error);
             this.config.showErrorToaster('Loading failed.');
  });

  }
  changeUserStatus(userdata){
	  	var data = {};
	  	data['status'] = userdata.status;
	  	data['userid'] = userdata.userId;
	  	data['counterid'] = this.counterId;
      data['token'] =  this.config.doDecrypt(localStorage.getItem('token'));
      data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
	  	this.http.post(this.config.apiUrl+'v1/ticketing/data/link_counter',data)
          .subscribe(
            (response) => {this.config.checkStatus(response['Status'],response['version']);
         var responseDetails=[];
		  responseDetails.push(response);
		  if (responseDetails[0]['Status']==this.config.OTYES) {
		  	this.config.showSuccessToaster('Status has been changed.');
        }
        else {
          console.log(responseDetails[0]['Feedback']);
          this.config.showErrorToaster('Status changing failed.');
        }            
       },
            (error)=>{
             console.log(error);
             this.config.showErrorToaster('Status changing failed.');
 		 });
	}
	async changeAttrStatus(attrdata){
	  	var data = {};
	  	data['status'] = attrdata.status;
	  	data['attrid'] = attrdata.attrId;
	  	data['counterid'] = this.counterId;
      data['token'] =  this.config.doDecrypt(localStorage.getItem('token'));
      data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
	  	this.http.post(this.config.apiUrl+'v1/ticketing/data/ca/create',data)
          .subscribe(
            (response) => {this.config.checkStatus(response['Status'],response['version']);
         var responseDetails=[];
		  responseDetails.push(response);
		  if (responseDetails[0]['Status']==this.config.OTYES) {
		  	this.config.showSuccessToaster('Status has been changed.');
        }
        else {
          console.log(responseDetails[0]['Feedback']);
          this.config.showErrorToaster('Status changing failed.');
        }            
       },
            (error)=>{
             console.log(error);
             this.config.showErrorToaster('Status changing failed.');
 		 });
	}
}
