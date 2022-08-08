import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';



import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { NbDialogRef } from '@nebular/theme';


import { ChangeDetectionStrategy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Observable, of, Observer, fromEvent, merge } from 'rxjs';


import { FormControl } from '@angular/forms';

import { NbSidebarService } from '@nebular/theme';

import { ConnectionService } from 'ng-connection-service';

import { LayoutService } from '../../../@core/utils';


imports: [ngFormsModule]

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public map: any;
  latitude: number = 18.5204;
  longitude: number = 73.8567;
  public successResponseArray: any[] = [];
  public errorResponseArray: any[] = [];
  public destinations: any = [];
  public alerts: any = [];
  public viewaction: any;
  public isFirst: boolean = true;
  public checkArray: any[] = [];
  public curStatus: boolean;
  public remark: any = '';
  public destination: any = '';
  public lat: any = '';
  public lng: any = '';
  public counters:any=[];
  public defaultCheckArray : any = [];
  constructor(
    protected ref: NbDialogRef<EditComponent>,
    private dialogService: NbDialogService,
    private router: Router,
    public config: ConfigService,
    public http: HttpClient,
    private menuService: NbMenuService,

    private layoutService: LayoutService, private sidebarService: NbSidebarService
  ) {  
    this.errorResponseArray['dest'] = '';
    this.errorResponseArray['remark'] = '';
    this.errorResponseArray['alerts'] = '';
    this.counters = JSON.parse(localStorage.getItem('allItem'));  console.log(this.counters);
    

    this.destination = this.counters.dest_id;
    this.loadData();
    
  }


  ngOnInit(): void {    
    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([7.0785, 51.4614]),
        zoom: 5
      })
      
    });
    

    this.map.on('click', function (args) {
      console.log(args.coordinate);
      localStorage.setItem("mapLat" , args.coordinate[0] );
      localStorage.setItem("maplng" , args.coordinate[1] );
      
    });



  }


  loadData() {  
    var data = {};
    this.http.post(this.config.apiUrl + 'v1/getUgrpData', data)
      .subscribe(
        (response) => {
          this.doWithData();
          this.destinations = response['destinations'];
          this.alerts = response['alert'];
          this.alerts.forEach((value) => {
            this.checkArray[value['alertId']] = false;
          });
          this.loadData1();

        },
        (error) => {
          console.log(error);
        }
      );
  }

  doUserCreate(form) { }
  cancel() {
    this.ref.close();
  }
  dismiss() {
    this.ref.close();
  }


  public checkBoxClicked(key) {
    
    this.curStatus = this.checkArray[key];
    this.curStatus = !this.curStatus;
    this.checkArray[key] = this.curStatus;
  }
  dosubmit() { 
    //this.lng = localStorage.getItem("maplng");
    //this.lat = localStorage.getItem("mapLat");
    this.errorResponseArray['dest'] = '';
    this.errorResponseArray['remark'] = '';
    this.errorResponseArray['alerts'] = '';
    let noError = 2;
    if (this.destination == '') {  
      this.errorResponseArray['dest'] = 'Please select Destination';
      noError = 1;
    }
    if (this.remark == '') {  
      this.errorResponseArray['remark'] = 'Please select Remark';
      noError = 1;
    }
    if ( this.lat == '') { 
      this.errorResponseArray['lat'] = 'Please select Latitude';
      noError = 1;
    }
    let selected = 0;
    this.alerts.forEach((value) => {
      if (this.checkArray[value['alertId']] == true) {
        selected = 1;
      }
    });

    if (selected == 0) { 
      this.errorResponseArray['alerts'] = 'Please select at least one alert';
      noError = 1;
    }

    if ( noError == 2 ) {
      let userId = this.config.doDecrypt(localStorage.getItem('userId'));
      this.http.post(this.config.apiUrl + 'v1/alert/add', {
        destid: this.destination,
        remark: this.remark,
        alert: JSON.stringify(this.checkArray),
        lat: this.lat,
        lng: this.lng,
        token: this.config.doDecrypt(localStorage.getItem('token')),
        roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
        userid: userId,
        isEdit : 2,
        alertId : localStorage.getItem('viewId'),
        
      })
        .subscribe(
          (response) => {
            //this.config.checkStatus(response['Status'], response['version']);
            this.config.showSuccessToaster('The ticket has been successfuly added ');
            this.ref.close();
            this.config.delay(100);
          },
          (error) => {
            console.log(error);
            this.config.showErrorToaster('The ticket insertion failed');
          }
        );
    }
    else {
      console.log(this.errorResponseArray);
      this.config.showErrorToaster(this.config.validationError);
    }
  }

  doWithData(  ){
    this.destination = this.counters.da_dest_id;
    this.remark = this.counters.da_description;
    this.lat = this.counters.da_lat;
    this.lng = this.counters.da_lng;
  }

  async loadData1 () {   
  	this.config.targeturl = this.config.apiUrl + 'v1/alert/viewalert';
    this.config.postdata = {
      token: this.config.doDecrypt(localStorage.getItem('token')),
      roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
      alertId :  localStorage.getItem('viewId'),
    };
    this.http.post(this.config.targeturl, this.config.postdata)
    .subscribe(
      (response) => {
      	 var successResponseArray=[];
        successResponseArray.push(response);
  if (successResponseArray[0]['Status']==this.config.OTYES) {   
    this.defaultCheckArray = successResponseArray[0]['alert']; 
    Object.keys(this.defaultCheckArray).map(index => {
      let dta = this.defaultCheckArray[ index ];
      if ( dta == 1 ){
        this.checkArray [ index ] = true;
      }
      
  });

    }
    else {
    	console.log(successResponseArray[0]['Feedback']);
    }
      },
      (error)=>{console.log(error)});
  }

  
}
