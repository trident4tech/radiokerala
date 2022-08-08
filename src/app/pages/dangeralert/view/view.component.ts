import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';
import { ConfirmComponent } from '../../../pages/tickets/confirm/confirm.component';
import { NbDialogService } from '@nebular/theme';


import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';


@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public detail:any;
	public counters:any=[];
	public isCounterStaff : boolean = false;
  public rec : string ='No';
  public alertStr : any = "";
  public map : any = "";
  public action :any;
  constructor(
    protected ref: NbDialogRef<ViewComponent>,public config:ConfigService,public http: HttpClient,public dialogService: NbDialogService,
    
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.counters = JSON.parse(localStorage.getItem('allItem'));  console.log(this.counters);
    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([this.counters.da_lng , this.counters.da_lat]),
        zoom: 5
      })
    });
    
  }

  dismiss() {
    this.ref.close();
  }

  async loadData () {
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
    this.alertStr = successResponseArray[0]['Data'];
    }
    else {
    	console.log(successResponseArray[0]['Feedback']);
    }
      },
      (error)=>{console.log(error)});
  }

  deleteAlert(){
    let title = "Arye you sure..!";
    this.action = this.dialogService.open(ConfirmComponent,{context:{title}})
      .onClose.subscribe((status) => {
        if ( status == this.config.OTYES ) {

          

          let userId = this.config.doDecrypt(localStorage.getItem('userId'));
      this.http.post(this.config.apiUrl + 'v1/alert/add', {
        token: this.config.doDecrypt(localStorage.getItem('token')),
        roleid: this.config.doDecrypt(localStorage.getItem('roleId')),
        userid: userId,
        isEdit : 2,
        alertId : localStorage.getItem('viewId'),
      }).subscribe(
          (response) => {
            this.ref.close();
          });



          
        }
        
      });
  }
}
