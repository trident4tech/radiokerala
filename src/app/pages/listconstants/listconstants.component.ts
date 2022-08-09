import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../config.service';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { AddconstantsComponent } from '../../addconstants/addconstants.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScheduledconstantsComponent } from '../scheduledconstants/scheduledconstants.component';
import { ConfirmComponent } from '../../pages/tickets/confirm/confirm.component';
import { DatePipe } from '@angular/common'
import * as Leaflet from 'leaflet';


imports: [CommonModule, MatTooltipModule]
declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'ngx-listconstants',
  templateUrl: './listconstants.component.html',
  styleUrls: ['./listconstants.component.scss']
})

export class ListconstantsComponent implements OnInit {
  map: Leaflet.Map;
  audioblob : any;
  public marker: any = '';
  public greenIcon = Leaflet.icon({
    iconUrl: '../../../../assets/icons/marker-icon.png',
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
  url:string='';
  error;
  gpsTrack:boolean = false;
  constructor(public http: HttpClient,public config: ConfigService,private domSanitizer: DomSanitizer) {}
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }/**
* Start recording.
*/initiateRecording() {
  this.recording = true; 
  this.rectime=100;
  this.url = '';
  let mediaConstraints = {
  video: false,
  audio: true
  };
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  let i = 0;
  this.interval = setInterval(() => {
      i++;
      this.rectime = this.maxrecord-i;
      if (this.rectime==0) {
        this.stopRecording() ;
      }      
    },1800);
}/**
* Will be called automatically.
*/successCallback(stream) {
var options = {
mimeType: "audio/wav",
numberOfAudioChannels: 1,
sampleRate: 55000,
};//Start Actuall Recording
var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
this.record = new StereoAudioRecorder(stream, options);
this.record.record();
}/**
* Stop recording.
*/stopRecording() {
  clearInterval(this.interval);
this.recording = false;
this.record.stop(this.processRecording.bind(this));
}/**
* processRecording Do what ever you want with blob
* @param  {any} blob Blog
*/processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    this.audioblob = blob;
    console.log("blob", blob);
    console.log("url", this.url);
  }/**
* Process Error.
*/errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }
  ngOnInit() {
    this.config.map = this.config.OTYES;
    this.getLocation();
   }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.gpsTrack = true;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.createMap();
        }
      },
        (error: PositionError) => console.log(error),{ 
            enableHighAccuracy: true, 
            timeout: 15000, 
            maximumAge: 0 
        } );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
 positionError( error ) { 
    
        switch ( error.code ) { 
            case error.PERMISSION_DENIED: 
                
                console.error( "User denied the request for Geolocation." ); 
                break; 
    
            case error.POSITION_UNAVAILABLE: 
    
                console.error( "Location information is unavailable." ); 
                break; 
    
            case error.TIMEOUT: 
    
                console.error( "The request to get user location timed out." ); 
                break; 
    
            case error.UNKNOWN_ERROR: 
    
                console.error( "An unknown error occurred." ); 
                break; 
        }
    }

 showPosition(position) {
   var location = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude,
    accuracy:position.coords.accuracy
   }
  }
  leafletMap(): void {  
    this.marker = Leaflet.marker([this.lat,  this.lng], { draggable: false, icon: this.greenIcon }).addTo(this.map);
  }
  createMap() {
    this.map = new Leaflet.Map('mapId2').setView([this.lat, this.lng], 15);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Kerala Radio'
    }).addTo(this.map);
    this.leafletMap();
   }
   ngOnDestroy(): void {
    this.map.remove();
  }
  dosubmit() { 
    // this.errorResponseArray['des'] = '';
    // this.errorResponseArray['lat'] = '';
    // this.errorResponseArray['img'] = '';
     let noError = true;

    // if ( this.lng == null || this.lng == '' || this.lng === undefined ){
    //   this.errorResponseArray['lat'] = 'Please select Location';
    //   noError = false;
    // }

    // if (this.html == '') {  
    //   this.errorResponseArray['des'] = 'Please enter the Details';
    //   noError = false;
    // }
    // if ( this.lat == '') { 
    //   this.errorResponseArray['lat'] = 'Please select the location';
    //   noError = false;
    // }
         
    //  if ( this.fileCount==0 && this.detail.length==0) { 
    //   this.errorResponseArray['img'] = 'Please select the image';
    //   noError = false;
    // }
 

    if ( noError ) {
        let userId=this.config.doDecrypt(localStorage.getItem('userId'));
        const formData = new FormData();
        formData.append("file[]", this.audioblob);
        
          
        this.http.post(this.config.apiUrl+'v1/hotel/addaudio',formData)
        .subscribe(
          (response) => {
        console.log(response);
           this.config.checkStatus(response['Status'],response['version']);
            this.config.showSuccessToaster('The survey has been successfuly added ');           
          },
          (error)=>{
            console.log(error);
            this.config.showErrorToaster('The survey insertion has been failed');
          }
        );
    }
    else {
     // console.log(this.errorResponseArray);
      this.config.showErrorToaster(this.config.validationError);
    }
  }

}

