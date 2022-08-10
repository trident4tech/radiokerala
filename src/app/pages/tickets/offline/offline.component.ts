import { Component, OnInit,ViewChild,HostListener } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of , Observer, fromEvent, merge} from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { ViewsurveyComponent } from '../../viewsurvey/viewsurvey.component';
import { NbDialogService } from '@nebular/theme';

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
     public viewaction: any;



  constructor(private dialogService: NbDialogService,public config:ConfigService,
  	public http: HttpClient) {
    //this.config.checkAccesswith404('pages/offline'); 
     }

  ngOnInit(): void {
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
 
 	sync() {
	    this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
      //insert ticket info when online
      if (this.isConnected) {
      	let ticketDetails = JSON.parse(localStorage.getItem('ticketDetails'));
      	let json = localStorage.getItem('ticketDetails');//JSON.stringify(this.ticketDetails);
      	if (json.length>0) {
          this.config.doSync();
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
  view(detail) {
    this.viewaction = this.dialogService.open(ViewsurveyComponent, { context: { detail } })
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
      });
    //this.viewaction.componentInstance.user = detail;
  }

}
