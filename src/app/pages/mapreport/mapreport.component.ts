import { Component, OnInit,ViewChild } from '@angular/core';
import * as Leaflet from 'leaflet';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '../../config.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NbDateService } from '@nebular/theme';



@Component({
  selector: 'ngx-mapreport',
  templateUrl: './mapreport.component.html',
  styleUrls: ['./mapreport.component.scss']
})
export class MapreportComponent implements OnInit {
    public items :any[] = [];
    public successResponseArray: any[] = [];
    public errorResponseArray: any[] = [];
    public searchTerm: string = '';
    public viewaction: any;
    qual:any[];
    map: Leaflet.Map;
    public marker: any = '';
    public fromdate:any;
    public todate:any;
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
   public blueIcon = Leaflet.icon({
    iconUrl: '../../../../assets/icons/marker-blue.png',
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
     @ViewChild('item', { static: true }) accordion;
    constructor(protected dateService: NbDateService<Date>,private router: Router,
    public http: HttpClient,private domSanitizer: DomSanitizer,public config: ConfigService) {}
    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
  toggle() {
    this.accordion.toggle();
  }
   ngOnInit(): void {   
    let roleid = localStorage.getItem('role');
    if (roleid!='1') {
      this.router.navigateByUrl('pages/newsurvey');
    }
    this.items = [];
    if (this.config.map == this.config.OTYES) 
        this.refresh();
    this.loadData();
   }
   loadData() {
      this.config.targeturl = this.config.apiUrl+'v1/survey/list';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
       userid:userId,
      token: this.config.doDecrypt(localStorage.getItem('token'))
    };   
    this.http.post(this.config.targeturl,this.config.postdata).subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);
        this.successResponseArray=[];
        this.successResponseArray.push(response);
        this.items=response['Data']; 
        this.createMap(); 
      },
      (error)=>{
        console.log(error);
      }
    );
}

   refresh(): void {
    window.location.reload();
  }
    ngOnDestroy(): void {
    this.map.remove();
  }
   leafletMap(): void { 
    let type='';
    let quality='';
   this.items.forEach(ticket => {
    this.mark = this.greenIcon;
    if (ticket.sr_quality==1)
        quality = 'Very Good';
    else if (ticket.sr_quality==2) {
        quality = 'Good';
        this.mark = this.yellowIcon;
    }
    else {
        quality ='Poor';
        this.mark = this.redIcon;
    }
    if (ticket.sr_type==1)
        type = 'Car Radio';
    else
        type ='Normal Radio';
    let str = '';
    if (ticket.sr_feedback!='')
      str = '<br/><i>'+ticket.sr_feedback+'</i>';
    let distance = this.calcCrow(25.717071358032623,55.8113002355822,ticket.sr_lat,ticket.sr_lng).toFixed(1);
    Leaflet.marker([ticket.sr_lat,  ticket.sr_lng], { draggable: false, icon: this.mark }).addTo(this.map)
    .bindPopup('<b>'+ticket.sr_name+'('+ticket.sr_mob+')</b><br/>'+type+str+'<br/><b>Distance from station:</b>'+distance+'km<br/><audio controls>  <source src='+this.config.fileurl+ticket.file_name+' type="audio/wav"> </audio>');
    Leaflet.marker([25.717071358032623,  55.8113002355822], { draggable: false, icon: this.blueIcon }).addTo(this.map);
    });

   //  Leaflet.marker([this.lat,  this.lng], { draggable: false, icon: this.greenIcon }).addTo(this.map)
   //  .bindPopup('<b>Ram</b><audio controls>  <source src="horse.ogg" type="audio/ogg">  <source src="horse.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>');
   //   Leaflet.marker([11.8745,  75.3704], { draggable: false, icon: this.greenIcon }).addTo(this.map)
   //  .bindPopup('<b>Jay</b><audio controls>  <source src="horse.ogg" type="audio/ogg">  <source src="horse.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>');
   //  Leaflet.marker([9.5916,  76.5222], { draggable: false, icon: this.redIcon }).addTo(this.map)
   //  .bindPopup('<b>Thomas</b><audio controls>  <source src="horse.ogg" type="audio/ogg">  <source src="horse.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>');
  }
  createMap() {
    this.map = new Leaflet.Map('mapId2').setView([this.lat, this.lng], 6);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en', {
      attribution: 'Kerala Radio',
    }).addTo(this.map);
    this.leafletMap();
   }
   async doSearch() {
    var date = new Date();    
    var enddate = new Date();    
    if (this.fromdate!='undefined' && this.fromdate!=undefined)
        date = this.fromdate;
    if (this.todate!='undefined' && this.todate!=undefined)
        enddate = this.todate;
    var fdate = date.getFullYear()+'-'+ ('0' + (date.getMonth()+1)).slice(-2) + '-'
             +('0' + date.getDate()).slice(-2) ;
    var tdate = enddate.getFullYear()+'-'+ ('0' + (enddate.getMonth()+1)).slice(-2) + '-'
             +('0' + enddate.getDate()).slice(-2) ;
       
     this.config.targeturl = this.config.apiUrl+'v1/survey/list';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
       date : fdate,
       tdate : tdate,
       userid:userId,
      token: this.config.doDecrypt(localStorage.getItem('token'))
    };   
    this.http.post(this.config.targeturl,this.config.postdata).subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);
        this.successResponseArray=[];
        this.successResponseArray.push(response);
        this.items=response['Data'];
        this.map.remove(); 
        this.createMap(); 
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  reset() {
    this.fromdate = '';
    this.todate = '';
    this.map.remove();
    this.loadData();
  }
  



    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var lat3 = this.toRad(lat1);
      var lat4 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat3) * Math.cos(lat4); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

}
