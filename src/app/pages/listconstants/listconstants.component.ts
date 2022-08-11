import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../config.service';
import { HttpClient } from '@angular/common/http';
import { map,startWith } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { Observable, of , Observer, fromEvent, merge} from 'rxjs';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common'
import * as Leaflet from 'leaflet';
import { DomSanitizer } from '@angular/platform-browser';

imports: [CommonModule, MatTooltipModule]
declare var $: any;
import * as RecordRTC from 'recordrtc';



@Component({
  selector: 'ngx-listconstants',
  templateUrl: './listconstants.component.html',
  styleUrls: ['./listconstants.component.scss']
})

export class ListconstantsComponent implements OnInit {
  isConnected :boolean;  
  map: Leaflet.Map;
  audioblob : any;
  public marker: any = '';
  ticketDetails:any = []; 
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
  lat : any=7.52;
  lng :any=8.56;
  url:string='';
  error;
  public errorResponseArray:any=[];
  gpsTrack:boolean = false;
  public name:any='';
  public types:any='';
  public quality:any='';
  public mob:any='';
  public feedback:any ='';
  public accuracy:any='';
  public noError:boolean=true;
  constructor(private router: Router,public http: HttpClient,public config: ConfigService,private domSanitizer: DomSanitizer) {}
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
    let roleid = localStorage.getItem('role');
    if (roleid=='1') {
      this.router.navigateByUrl('pages/mapreport');
    }
    this.name = localStorage.getItem('tname');
    this.mob = localStorage.getItem('mob');
    this.isConnected = true;  
    this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
    this.errorResponseArray['name'] = '';
    this.errorResponseArray['mob'] = '';
    this.errorResponseArray['gps'] = '';
    this.errorResponseArray['type'] = '';
    this.errorResponseArray['quality'] = '';
    this.errorResponseArray['url'] = '';    
    this.getLocation();
   }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.gpsTrack = true;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.accuracy = position.coords.accuracy;
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
  async dosubmit() { 
    localStorage.setItem('tname',this.name);
    localStorage.setItem('mob',this.mob);
    this.errorResponseArray['name'] = '';
    this.errorResponseArray['mob'] = '';
    this.errorResponseArray['gps'] = '';
    this.errorResponseArray['type'] = '';
    this.errorResponseArray['quality'] = '';
    this.errorResponseArray['url'] = '';
    this.noError = true;
    if ( this.lng == null || this.lng == '' || this.lng === undefined ){
      this.errorResponseArray['gps'] = 'Please select Location';
       this.noError = false;
    }

    if (this.name == '') {  
       this.errorResponseArray['name'] = 'Please enter the Name';
       this.noError = false;
    }
    if (this.quality == '') {  
       this.errorResponseArray['quality'] = 'Please select the Audio Quality';
       this.noError = false;
    }
    if (this.types == '') {  
       this.errorResponseArray['type'] = 'Please select the Source Type';
       this.noError = false;
    }
    if (this.mob == '') {  
       this.errorResponseArray['mob'] = 'Please enter the Mobile No.';
       this.noError = false;
    }
    else {
    const pattern = /^\d+(\.\d{10})?$/ ; // without ., for integer only
      let inputChar = this.mob;
      if (!pattern.test(this.mob)) {
      this.errorResponseArray['mob'] = 'Invalid Mobile No.';
      this.noError=false;   
    }   
  }
     if (this.url == '') {  
       this.errorResponseArray['url'] = 'Please add the audio';
       this.noError = false;
    }
 

    if ( this.noError ) {        
        let userId=this.config.doDecrypt(localStorage.getItem('userId'));
        var date = new Date(); 
        if (this.isConnected) {
          const formData = new FormData();
          formData.append("name[]", this.name);
          formData.append("mob[]", this.mob);
          formData.append("type[]", this.types);
          formData.append("quality[]", this.quality);
          formData.append("lat[]", this.lat);
          formData.append("lng[]", this.lng);
          formData.append("feedback[]", this.feedback);
          formData.append("acc[]", this.accuracy);
          formData.append("usr[]", userId);
          formData.append("file[]", this.audioblob); 
          formData.append("offline[]", this.config.OTNO+'');
          formData.append("dbdate[]" , date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate());
          formData.append("date[]" , date.getFullYear()+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear());
          formData.append("time[]" ,date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()  );
          
            
           this.http.post(this.config.apiUrl+'v1/survey/add',formData)
          .subscribe(
            (response) => {
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
        const arrayBuffer = await new Response(this.audioblob).arrayBuffer();
        let file = this.arrayBufferToBase64(arrayBuffer);
        this.ticketDetails = JSON.parse(localStorage.getItem('ticketDetails'));
        let data = {};
        data['name'] =  this.name;
        data['mob'] =  this.mob;
        data['type'] =  this.types;
        data['quality'] =  this.quality;
        data['lat'] =   this.lat;
        data['lng'] =  this.lng;
        data['feedback'] =   this.feedback;
        data['acc'] =   this.accuracy;
        data['usr'] =   userId;
        data['file'] =   file;  
        data['offline'] =   this.config.OTYES+'';
        data['url'] =   this.url;
        data['date'] = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
        data['time'] = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()  ;
        data['dbdate'] = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
               
        this.ticketDetails.push(data);
        let json = JSON.stringify(this.ticketDetails);
        console.log(this.ticketDetails);
        localStorage.setItem('ticketDetails',json);  
       this.config.showSuccessToaster('The survey has been successfuly added in offline'); 
      }
      this.clearData();
    }
    else {
     // console.log(this.errorResponseArray);
      this.config.showErrorToaster(this.config.validationError);
    }
  }  
  arrayBufferToBase64(Arraybuffer) {
        let binary = '';
        const bytes = new Uint8Array(Arraybuffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const file = window.btoa(binary);
        return file;
  }
  clearData() {
    this.url = '';
    this.audioblob = '';
    this.feedback = '';
  }
  getSelectTypeValue(val) {
    this.types = val;
  }
   getSelectValue(val: any): void {
    this.quality = val;
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

}

