import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config.service';
import * as Leaflet from 'leaflet';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-viewsur',
  templateUrl: './viewsur.component.html',
  styleUrls: ['./viewsur.component.scss']
})
export class ViewsurComponent implements OnInit {
  map: Leaflet.Map;
  audioblob : any;
  public marker: any = '';
  public greenIcon = Leaflet.icon({
    iconUrl: '../../../../assets/icons/marker-green.png',
    /*shadowUrl: 'leaf-shadow.png'*/
  });
  public mark = Leaflet.icon({
    iconUrl: '../../../../assets/icons/marker-green.png',
    /*shadowUrl: 'leaf-shadow.png'*/
  });
   public redIcon = Leaflet.icon({
    iconUrl: '../../../../assets/icons/marker-red.png',
    /*shadowUrl: 'leaf-shadow.png'*/
    });
   public yellowIcon = Leaflet.icon({
    iconUrl: '../../../../assets/icons/marker-yellow.png',
    /*shadowUrl: 'leaf-shadow.png'*/
    });
   //Lets declare Record OBJ
  record;//Will use this flag for toggeling recording
  recording = false;//URL of Blob
  rectime:number=100;
  maxrecord : number = 100;
  interval:any;
  lat : any=7.52;
  lng :any=8.56;
  url:string='';
  public detail:any;
  public type:any='';
  public quality:any='';
  constructor(private domSanitizer: DomSanitizer,protected ref: NbDialogRef<ViewsurComponent>,public config:ConfigService,public http: HttpClient) { 
   // this.config.checkAccesswith404('viewuser');
  }

  ngOnInit(): void {
    this.mark = this.greenIcon;
    if (this.detail.sr_quality==1)
        this.quality = 'Very Good';
    else if (this.detail.sr_quality==2) {
        this.quality = 'Good';
        this.mark = this.yellowIcon;
    }
    else {
        this.quality ='Poor';
        this.mark = this.redIcon;
    }
    if (this.detail.sr_type==1)
        this.type = 'Car Radio';
    else
        this.type ='Normal Radio';
    this.createMap();
  }
  dismiss() {
    this.map.remove();
    this.ref.close();
  }
   ngOnDestroy(): void {
    //this.map.remove();
  }
   leafletMap(): void {     
    Leaflet.marker([this.detail.sr_lat,  this.detail.sr_lng], { draggable: false, icon: this.mark }).addTo(this.map)
    .bindPopup('<b>'+this.detail.sr_name+'('+this.detail.sr_mob+')</b><br/>'+this.type+'<br/><i>'+this.detail.sr_feedback+'</i><br/><audio controls>  <source src='+this.config.fileurl+this.detail.file_name+' type="audio/wav"> </audio>');
   }
  createMap() {
    this.map = new Leaflet.Map('mapId2').setView([this.detail.sr_lat, this.detail.sr_lng], 6);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Kerala Radio',
    }).addTo(this.map);
    this.leafletMap();
   }
   sanitize(url: string) {
    //  let aurl = URL.createObjectURL(this.detail.file);
     return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

}
