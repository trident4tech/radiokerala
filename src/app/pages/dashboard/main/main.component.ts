import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	public bookDetails: any[]=[];
	public successResponseArray   : any[]=[];

  
  	constructor(public config:ConfigService,public http: HttpClient) {
  	}
	ngOnInit(): void {            
            
        

	   this.loadData();
  }
    loadData () {
        var dest = '';
        if (localStorage.getItem('maindest')!='Select All')
            dest = localStorage.getItem('maindest');
    this.http.post(this.config.apiUrl+'v1/summary/UPjBZmJPf3QOeNfYw9NhJysivIydIV8vFGO311nPLedVym4dM4ExQcw3F2ZoyI3o',{
    user : this.config.doDecrypt(localStorage.getItem('userId')),
    dest: dest
    })
    .subscribe(
      (response) => {
  this.config.checkStatus(response['Status'],response['version']);
    this.successResponseArray.push(response); 
        this.bookDetails=[];
        this.bookDetails=this.successResponseArray[0];

      },
      (error)=>{
        console.log(error);
      }
    );
    }

}
