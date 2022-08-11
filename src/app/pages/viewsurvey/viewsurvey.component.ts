import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config.service';
import * as Leaflet from 'leaflet';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-viewsurvey',
  templateUrl: './viewsurvey.component.html',
  styleUrls: ['./viewsurvey.component.scss']
})
export class ViewsurveyComponent implements OnInit {
  map: Leaflet.Map;
  public src:any='';
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
  public file='';
  constructor(private domSanitizer: DomSanitizer,protected ref: NbDialogRef<ViewsurveyComponent>,public config:ConfigService,public http: HttpClient) { 
   // this.config.checkAccesswith404('viewuser');
  }

  ngOnInit(): void {
    this.mark = this.greenIcon;
    if (this.detail.quality==1)
        this.quality = 'Very Good';
    else if (this.detail.quality==2) {
        this.quality = 'Good';
        this.mark = this.yellowIcon;
    }
    else {
        this.quality ='Poor';
        this.mark = this.redIcon;
    }
    if (this.detail.type==1)
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
    Leaflet.marker([this.detail.lat,  this.detail.lng], { draggable: false, icon: this.mark }).addTo(this.map)
    .bindPopup('<b>'+this.detail.name+'('+this.detail.mob+')</b><br/>'+this.type+'<br/><i>'+this.detail.feedback+'</i><br/><audio controls>  <source src='+this.file+' type="audio/wav"> </audio>');    
    this.src= this.sanitize(this.url);
   }
  createMap() {
    this.arrayBase64toBlob();
    this.map = new Leaflet.Map('mapId2').setView([this.detail.lat, this.detail.lng], 6);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Kerala Radio',
    }).addTo(this.map);
    this.leafletMap();
   }
   sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  arrayBase64toBlob() {
    let binaryString = window.atob(this.detail.file);
    let binaryLength = binaryString.length;
    let bytesa = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
        let ascii = binaryString.charCodeAt(i);
        bytesa[i] = ascii;
    }
    const blob = new Blob([bytesa]);
    this.file = URL.createObjectURL(blob);
    //this.src = "<audio controls>  <source src='"+this.sanitize(this.file)+"' type='audio/wav'> </audio>";
  }

}
