import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-mapreport',
  templateUrl: './mapreport.component.html',
  styleUrls: ['./mapreport.component.scss']
})
export class MapreportComponent implements OnInit {
    map: Leaflet.Map;
    public marker: any = '';
    public greenIcon = Leaflet.icon({
    iconUrl: '../../../../assets/icons/marker-icon.png',
    /*shadowUrl: 'leaf-shadow.png'*/
    });
    public redIcon = Leaflet.icon({
    iconUrl: '../../../../assets/icons/marker-red.png',
    /*shadowUrl: 'leaf-shadow.png'*/
    });
     //Lets declare Record OBJ
    record;//Will use this flag for toggeling recording
    recording = false;//URL of Blob
    rectime:number=100;
    maxrecord : number = 100;
    interval:any;
    lat : any='8.5241';
    lng :any='76.9366';
    url:string='';error;
    constructor(private domSanitizer: DomSanitizer) {}
    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }

   ngOnInit(): void {
    this.createMap();
   }
   leafletMap(): void {  
    Leaflet.marker([this.lat,  this.lng], { draggable: false, icon: this.greenIcon }).addTo(this.map)
    .bindPopup('<b>Ram</b><audio controls>  <source src="horse.ogg" type="audio/ogg">  <source src="horse.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>');
     Leaflet.marker([11.8745,  75.3704], { draggable: false, icon: this.greenIcon }).addTo(this.map)
    .bindPopup('<b>Jay</b><audio controls>  <source src="horse.ogg" type="audio/ogg">  <source src="horse.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>');
    Leaflet.marker([9.5916,  76.5222], { draggable: false, icon: this.redIcon }).addTo(this.map)
    .bindPopup('<b>Thomas</b><audio controls>  <source src="horse.ogg" type="audio/ogg">  <source src="horse.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>');
  }
  createMap() {
    this.map = new Leaflet.Map('mapId2').setView([this.lat, this.lng], 6);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Kerala Radio',
    }).addTo(this.map);
    this.leafletMap();
   }

}
